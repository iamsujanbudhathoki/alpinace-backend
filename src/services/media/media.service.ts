import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Media } from '../../entities/media/media.entity';
import { MediaType } from '../../constants/appConstant';
import { DotenvConfig } from '../../config/env.config';
import { AppError } from '../../utils/appError.util';
import { R2Util } from '../../utils/r2.util';
import path from 'path';
import fs from 'fs';

export interface MediaUploadResult {
  id: string;
  name: string;
  title: string;
  category: string;
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
    media.category = '';
    media.description = '';
    media.altText = media.title;
    media.mimeType = mimeType;
    media.fileSize = fileSize;
    media.mediaType = MediaType.BLOG_THUMBNAIL;
    media.path = finalPath;

    const saved = await this.mediaRepo.save(media);

    return {
      id: saved.id,
      name: saved.name,
      title: saved.title,
      category: saved.category,
      description: saved.description,
      altText: saved.altText,
      url: this.buildUrl(saved.path),
      mimeType: saved.mimeType,
      fileSize: saved.fileSize,
      createdAt: saved.createdAt,
    };
  }

  async getAll(params?: {
    category?: string;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<[MediaUploadResult[], number]> {
    const qb = this.mediaRepo.createQueryBuilder('media');

    if (params?.category && params.category !== 'All') {
      qb.andWhere('media.category = :category', { category: params.category });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(media.name) LIKE :term OR LOWER(media.title) LIKE :term OR LOWER(media.category) LIKE :term OR LOWER(media.description) LIKE :term)',
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
      category?: string;
      description?: string;
      altText?: string;
    },
  ): Promise<MediaUploadResult> {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) {
      throw AppError.notFound('Media asset not found');
    }

    if (data.title !== undefined) media.title = data.title;
    if (data.category !== undefined) media.category = data.category;
    if (data.description !== undefined) media.description = data.description;
    if (data.altText !== undefined) media.altText = data.altText;

    const saved = await this.mediaRepo.save(media);

    return {
      id: saved.id,
      name: saved.name,
      title: saved.title,
      category: saved.category,
      description: saved.description,
      altText: saved.altText,
      url: this.buildUrl(saved.path),
      mimeType: saved.mimeType,
      fileSize: saved.fileSize,
      createdAt: saved.createdAt,
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
}

