import { In } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Media } from '../../entities/media/media.entity';
import { MediaType } from '../../constants/appConstant';
import { DotenvConfig } from '../../config/env.config';
import { AppError } from '../../utils/appError.util';
import { R2Util } from '../../utils/r2.util';
import path from 'path';
import fs from 'fs';
import { Category } from '../../entities/category/Category.entity';

export interface MediaUploadResult {
  id: string;
  name: string;
  title: string;
  categoryId?: string;
  categoryName?: string;
  category?: Category;
  description: string;
  altText: string;
  url: string;
  mimeType: string;
  fileSize: string;
  createdAt?: Date;
}

@autoInjectable()
export class MediaService {
  private mediaRepo = AppDataSource.getRepository(Media);

  private getUploadDirectory(): string {
    const uploadDir =
      DotenvConfig.MEDIA_UPLOAD_PATH || path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    return uploadDir;
  }

  private buildUrl(mediaPath: string): string {
    if (mediaPath.startsWith('http://') || mediaPath.startsWith('https://')) {
      return mediaPath;
    }
    const baseUrl = DotenvConfig.PUBLIC_URL;
    return `${baseUrl}${mediaPath.startsWith('/') ? mediaPath : '/' + mediaPath}`;
  }

  private getFileBuffer(file: Express.Multer.File): Buffer {
    if (file.buffer) {
      return file.buffer;
    }
    if (file.path && fs.existsSync(file.path)) {
      return fs.readFileSync(file.path);
    }
    throw AppError.badRequest('Uploaded file content could not be read');
  }

  async saveUploadedFile(
    file: Express.Multer.File,
    categoryId?: string,
  ): Promise<MediaUploadResult> {
    const sanitizedOriginalName = (file.originalname || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${Date.now()}-${sanitizedOriginalName}`;
    const mimeType = file.mimetype || 'application/octet-stream';
    const fileSize = String(file.size || 0);
    let finalPath = '';

    // 1. Upload to Cloudflare R2 if configured
    if (R2Util.isConfigured()) {
      try {
        const fileBuffer = this.getFileBuffer(file);
        const r2Key = `uploads/${filename}`;
        const publicUrl = await R2Util.upload(r2Key, fileBuffer, mimeType);
        finalPath = publicUrl;

        // Clean up temporary local file if created by multer
        if (file.path && fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch {}
        }
      } catch (r2Error) {
        console.error('[Cloudflare R2] Upload failed, falling back to disk:', r2Error);
      }
    }

    // 2. Fallback to Local Disk Storage if R2 is not configured or failed
    if (!finalPath) {
      const uploadDir = this.getUploadDirectory();
      const targetPath = path.join(uploadDir, filename);

      if (file.buffer) {
        fs.writeFileSync(targetPath, file.buffer);
      } else if (file.path && file.path !== targetPath && fs.existsSync(file.path)) {
        fs.copyFileSync(file.path, targetPath);
        try {
          fs.unlinkSync(file.path);
        } catch {}
      }
      finalPath = `/uploads/${filename}`;
    }

    const media = new Media();
    media.name = filename;
    media.title = file.originalname
      ? file.originalname.replace(/\.[^/.]+$/, '')
      : filename;
    if (categoryId) media.categoryId = categoryId;
    media.description = '';
    media.altText = media.title;
    media.mimeType = mimeType;
    media.fileSize = fileSize;
    media.mediaType = MediaType.BLOG_THUMBNAIL;
    media.path = finalPath;

    const saved = await this.mediaRepo.save(media);
    const reloaded = await this.mediaRepo.findOne({
      where: { id: saved.id },
      relations: ['category'],
    });
    const target = reloaded || saved;

    return {
      id: target.id,
      name: target.name,
      title: target.title,
      categoryId: target.categoryId,
      categoryName: target.category?.name || '',
      category: target.category,
      description: target.description,
      altText: target.altText,
      url: this.buildUrl(target.path),
      mimeType: target.mimeType,
      fileSize: target.fileSize,
      createdAt: target.createdAt,
    };
  }

  async getAll(params?: {
    categoryId?: string;
    category?: string;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<[MediaUploadResult[], number]> {
    const qb = this.mediaRepo
      .createQueryBuilder('media')
      .leftJoinAndSelect('media.category', 'category');

    if (params?.categoryId && params.categoryId !== 'All') {
      qb.andWhere('media.categoryId = :categoryId', { categoryId: params.categoryId });
    } else if (params?.category && params.category !== 'All') {
      qb.andWhere('(category.name = :category OR media.categoryId = :category)', {
        category: params.category,
      });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(media.name) LIKE :term OR LOWER(media.title) LIKE :term OR LOWER(category.name) LIKE :term OR LOWER(media.description) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('media.createdAt', 'DESC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    const [records, total] = await qb.getManyAndCount();

    const items = records.map((m) => ({
      id: m.id,
      name: m.name,
      title: m.title,
      categoryId: m.categoryId,
      categoryName: m.category?.name || '',
      category: m.category,
      description: m.description,
      altText: m.altText,
      url: this.buildUrl(m.path),
      mimeType: m.mimeType,
      fileSize: m.fileSize,
      createdAt: m.createdAt,
    }));

    return [items, total];
  }

  async update(
    id: string,
    data: {
      title?: string;
      categoryId?: string;
      description?: string;
      altText?: string;
    },
  ): Promise<MediaUploadResult> {
    const media = await this.mediaRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!media) {
      throw AppError.notFound('Media asset not found');
    }

    if (data.title !== undefined) media.title = data.title;
    if (data.categoryId !== undefined) media.categoryId = data.categoryId;
    if (data.description !== undefined) media.description = data.description;
    if (data.altText !== undefined) media.altText = data.altText;

    const saved = await this.mediaRepo.save(media);
    const reloaded = await this.mediaRepo.findOne({
      where: { id: saved.id },
      relations: ['category'],
    });
    const target = reloaded || saved;

    return {
      id: target.id,
      name: target.name,
      title: target.title,
      categoryId: target.categoryId,
      categoryName: target.category?.name || '',
      category: target.category,
      description: target.description,
      altText: target.altText,
      url: this.buildUrl(target.path),
      mimeType: target.mimeType,
      fileSize: target.fileSize,
      createdAt: target.createdAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) return false;

    // Delete from Cloudflare R2 if it was stored there
    if (media.path.startsWith('http')) {
      await R2Util.delete(media.path);
    }

    // Also attempt local disk cleanup
    const uploadDir = this.getUploadDirectory();
    const filePath = path.join(uploadDir, media.name);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('Warning: Could not remove disk file:', filePath, e);
      }
    }

    await this.mediaRepo.remove(media);
    return true;
  }

  async resolveMediaById(id: string): Promise<MediaUploadResult | null> {
    if (!id) return null;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    let media: Media | null = null;
    if (isUuid) {
      media = await this.mediaRepo.findOne({ where: { id }, relations: ['category'] });
    } else {
      media = await this.mediaRepo.findOne({ where: { path: id }, relations: ['category'] });
    }
    if (!media) return null;
    return {
      id: media.id,
      name: media.name,
      title: media.title,
      categoryId: media.categoryId,
      categoryName: media.category?.name || '',
      category: media.category,
      description: media.description,
      altText: media.altText,
      url: this.buildUrl(media.path),
      mimeType: media.mimeType,
      fileSize: media.fileSize,
      createdAt: media.createdAt,
    };
  }

  async resolveMediaByIds(ids: string[]): Promise<Map<string, MediaUploadResult>> {
    const map = new Map<string, MediaUploadResult>();
    if (!ids || ids.length === 0) return map;

    const validIds = ids.filter(Boolean);
    if (validIds.length === 0) return map;

    const uuids = validIds.filter((id) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
    );
    if (uuids.length > 0) {
      const records = await this.mediaRepo.find({ where: { id: In(uuids) }, relations: ['category'] });
      for (const m of records) {
        map.set(m.id, {
          id: m.id,
          name: m.name,
          title: m.title,
          categoryId: m.categoryId,
          categoryName: m.category?.name || '',
          category: m.category,
          description: m.description,
          altText: m.altText,
          url: this.buildUrl(m.path),
          mimeType: m.mimeType,
          fileSize: m.fileSize,
          createdAt: m.createdAt,
        });
      }
    }
    return map;
  }

  async resolveItemMedia(item: any): Promise<any> {
    if (!item) return item;

    const mediaIdsToFetch: string[] = [];

    if (item.coverMediaId) mediaIdsToFetch.push(item.coverMediaId);
    if (item.mapMediaId) mediaIdsToFetch.push(item.mapMediaId);

    if (Array.isArray(item.galleryMediaIds)) {
      item.galleryMediaIds.forEach((id: string) => {
        if (id) mediaIdsToFetch.push(id);
      });
    }

    if (Array.isArray(item.packageFiles)) {
      item.packageFiles.forEach((pf: any) => {
        if (pf?.mediaId) mediaIdsToFetch.push(pf.mediaId);
      });
    }

    if (mediaIdsToFetch.length === 0) return item;

    const mediaMap = await this.resolveMediaByIds(mediaIdsToFetch);

    // Resolve Cover Image
    if (item.coverMediaId && mediaMap.has(item.coverMediaId)) {
      item.image = mediaMap.get(item.coverMediaId)!.url;
    }

    // Resolve Trek Map
    if (item.mapMediaId && mediaMap.has(item.mapMediaId)) {
      item.mapImage = mediaMap.get(item.mapMediaId)!.url;
    }

    // Resolve Gallery Images
    if (Array.isArray(item.galleryMediaIds) && item.galleryMediaIds.length > 0) {
      item.galleryImages = item.galleryMediaIds.map((id: string) =>
        mediaMap.has(id) ? mediaMap.get(id)!.url : id,
      );
    }

    // Resolve Package Files
    if (Array.isArray(item.packageFiles)) {
      item.packageFiles = item.packageFiles.map((pf: any) => {
        if (pf?.mediaId && mediaMap.has(pf.mediaId)) {
          const media = mediaMap.get(pf.mediaId)!;
          const ext = media.name.split('.').pop()?.toLowerCase() || 'pdf';
          return {
            ...pf,
            mediaId: pf.mediaId,
            fileUrl: media.url,
            fileName: media.name,
            fileSize: media.fileSize ? `${(Number(media.fileSize) / (1024 * 1024)).toFixed(1)} MB` : 'File',
            fileType: ext,
          };
        }
        return pf;
      });
    }

    return item;
  }
}

