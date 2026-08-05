import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Media } from '../../entities/media/media.entity';
import { MediaType } from '../../constants/appConstant';
import { DotenvConfig } from '../../config/env.config';
import { AppError } from '../../utils/appError.util';
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

  private buildPublicUrl(filename: string): string {
    const baseUrl = DotenvConfig.PUBLIC_URL;
    return `${baseUrl}/uploads/${filename}`;
  }

  private writeToDisk(file: Express.Multer.File, targetPath: string): void {
    if (file.buffer) {
      fs.writeFileSync(targetPath, file.buffer);
    } else if (
      file.path &&
      file.path !== targetPath &&
      fs.existsSync(file.path)
    ) {
      fs.copyFileSync(file.path, targetPath);
    }
  }

  async saveUploadedFile(
    file: Express.Multer.File,
  ): Promise<MediaUploadResult> {
    const uploadDir = this.getUploadDirectory();
    const ext = file.originalname ? path.extname(file.originalname) : '';
    const filename = file.filename || `${Date.now()}-${file.originalname}`;
    const targetPath = path.join(uploadDir, filename);

    this.writeToDisk(file, targetPath);

    const media = new Media();
    media.name = filename;
    media.title = file.originalname
      ? file.originalname.replace(/\.[^/.]+$/, '')
      : filename;
    media.category = '';
    media.description = '';
    media.altText = media.title;
    media.mimeType = file.mimetype;
    media.fileSize = String(file.size);
    media.mediaType = MediaType.BLOG_THUMBNAIL;
    media.path = `/uploads/${filename}`;

    const saved = await this.mediaRepo.save(media);

    return {
      id: saved.id,
      name: saved.name,
      title: saved.title,
      category: saved.category,
      description: saved.description,
      altText: saved.altText,
      url: this.buildPublicUrl(filename),
      mimeType: saved.mimeType,
      fileSize: saved.fileSize,
      createdAt: saved.createdAt,
    };
  }

  async getAll(): Promise<MediaUploadResult[]> {
    const baseUrl = DotenvConfig.PUBLIC_URL;
    const records = await this.mediaRepo.find({ order: { createdAt: 'DESC' } });

    return records.map((m) => ({
      id: m.id,
      name: m.name,
      title: m.title,
      category: m.category,
      description: m.description,
      altText: m.altText,
      url: `${baseUrl}${m.path.startsWith('/') ? m.path : '/' + m.path}`,
      mimeType: m.mimeType,
      fileSize: m.fileSize,
      createdAt: m.createdAt,
    }));
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
    const baseUrl = DotenvConfig.PUBLIC_URL;

    return {
      id: saved.id,
      name: saved.name,
      title: saved.title,
      category: saved.category,
      description: saved.description,
      altText: saved.altText,
      url: `${baseUrl}${saved.path.startsWith('/') ? saved.path : '/' + saved.path}`,
      mimeType: saved.mimeType,
      fileSize: saved.fileSize,
      createdAt: saved.createdAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) return false;

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
