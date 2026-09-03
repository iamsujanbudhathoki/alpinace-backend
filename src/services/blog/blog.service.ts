import { autoInjectable } from 'tsyringe';
import { isUUID } from 'class-validator';
import { AppDataSource } from '../../config/database.config';
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import { Category } from '../../entities/category/Category.entity';
import {
  CreateBlogArticleDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { AppError } from '../../utils/appError.util';

import { MediaService } from '../media/media.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class BlogService {
  private repo = AppDataSource.getRepository(BlogArticle);
  private categoryRepo = AppDataSource.getRepository(Category);

  constructor(
    private mediaService: MediaService = new MediaService(),
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getPublicAll(
    status?: BlogStatus,
    categoryId?: string,
    category?: string,
    search?: string,
    limit?: number,
    page?: number,
  ): Promise<[BlogArticle[], number]> {
    return this.getAll(
      status || BlogStatus.PUBLISHED,
      categoryId,
      category,
      search,
      limit,
      page,
      true,
    );
  }

  async getAdminAll(
    status?: BlogStatus,
    categoryId?: string,
    category?: string,
    search?: string,
    limit?: number,
    page?: number,
  ): Promise<[BlogArticle[], number]> {
    return this.getAll(status, categoryId, category, search, limit, page, false);
  }

  async getAll(
    status?: BlogStatus,
    categoryId?: string,
    category?: string,
    search?: string,
    limit?: number,
    page?: number,
    isPublic?: boolean,
  ): Promise<[BlogArticle[], number]> {
    const qb = this.repo.createQueryBuilder('blog');

    if (isPublic) {
      qb.andWhere('blog.status = :status', {
        status: status || BlogStatus.PUBLISHED,
      });
    } else if (status) {
      qb.andWhere('blog.status = :status', { status });
    }

    const catParam = categoryId !== 'All' ? categoryId : category !== 'All' ? category : undefined;
    if (catParam) {
      const isUuid = isUUID(catParam);
      let catEntity: Category | null = null;
      if (isUuid) {
        catEntity = await this.categoryRepo.findOne({ where: { id: catParam } });
      }
      if (!catEntity) {
        catEntity = await this.categoryRepo.findOne({ where: { slug: catParam } });
      }

      if (catEntity) {
        qb.andWhere('(blog.category = :catName OR LOWER(blog.category) = LOWER(:catSlug))', {
          catName: catEntity.name,
          catSlug: catEntity.slug,
        });
      } else {
        qb.andWhere('blog.category = :catParam', { catParam });
      }
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(blog.title) LIKE :term OR LOWER(blog.excerpt) LIKE :term OR LOWER(blog.category) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('blog.createdAt', 'DESC');

    if (limit) {
      qb.take(limit);
      if (page && page > 1) {
        qb.skip((page - 1) * limit);
      }
    }

    const [items, count] = await qb.getManyAndCount();
    const resolved = await Promise.all(
      items.map((i) => this.mediaService.resolveItemMedia(i)),
    );
    return [resolved, count];
  }

  async getByIdOrSlug(idOrSlug: string): Promise<BlogArticle> {
    const isUuid = isUUID(idOrSlug);

    let item: BlogArticle | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item) throw AppError.notFound(`Blog article ${idOrSlug} not found`);
    return this.mediaService.resolveItemMedia(item);
  }

  async getPublicByIdOrSlug(idOrSlug: string): Promise<BlogArticle> {
    const item = await this.getByIdOrSlug(idOrSlug);
    if (item.status !== BlogStatus.PUBLISHED) {
      throw AppError.notFound(`Blog article ${idOrSlug} not found`);
    }

    // Atomically increment views count in DB to avoid race conditions
    await this.repo
      .createQueryBuilder()
      .update(BlogArticle)
      .set({ views: () => 'COALESCE(views, 0) + 1' })
      .where('id = :id', { id: item.id })
      .execute();

    item.views = (Number(item.views) || 0) + 1;
    return item;
  }

  async create(dto: CreateBlogArticleDto): Promise<BlogArticle> {
    if (dto.coverMediaId) {
      await this.mediaService.validateMediaExists(dto.coverMediaId);
    }

    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const blog = this.repo.create({
      title: dto.title,
      slug,
      category: dto.category,
      readTime: dto.readTime || '5 min read',
      status: dto.status || BlogStatus.PUBLISHED,
      publishedDate:
        dto.publishedDate || new Date().toISOString().split('T')[0],
      views: 0,
      excerpt: dto.excerpt || '',
      content: dto.content || '',
      coverMediaId: dto.coverMediaId,
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
    });

    const saved = await this.repo.save(blog);
    await this.auditLogService.logCreate(AuditEntityType.BLOG, saved.id, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateBlogArticleDto): Promise<BlogArticle> {
    if (dto.coverMediaId) {
      await this.mediaService.validateMediaExists(dto.coverMediaId);
    }

    const article = await this.getByIdOrSlug(id);
    const oldState = { ...article };

    if (dto.title && dto.title !== article.title) {
      article.title = dto.title;
      article.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (dto.category !== undefined) article.category = dto.category;
    if (dto.readTime !== undefined) article.readTime = dto.readTime;
    if (dto.status !== undefined) article.status = dto.status;
    if (dto.publishedDate !== undefined) article.publishedDate = dto.publishedDate;
    if (dto.excerpt !== undefined) article.excerpt = dto.excerpt;
    if (dto.content !== undefined) article.content = dto.content;
    if (dto.coverMediaId !== undefined) article.coverMediaId = dto.coverMediaId;
    if (dto.views !== undefined) article.views = dto.views;
    if (dto.metaTitle !== undefined) article.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined) article.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) article.keywords = dto.keywords;

    const saved = await this.repo.save(article);
    await this.auditLogService.logUpdate(AuditEntityType.BLOG, saved.id, oldState, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async getPublished(): Promise<BlogArticle[]> {
    const items = await this.repo.find({
      where: { status: BlogStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
    return Promise.all(items.map((i) => this.mediaService.resolveItemMedia(i)));
  }

  async delete(id: string): Promise<boolean> {
    const article = await this.getByIdOrSlug(id);
    const oldState = { ...article };
    await this.repo.remove(article);
    await this.auditLogService.logDelete(AuditEntityType.BLOG, id, oldState);
    return true;
  }
}
