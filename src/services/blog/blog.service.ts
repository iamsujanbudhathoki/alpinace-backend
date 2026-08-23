import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import { Category } from '../../entities/category/Category.entity';
import {
  CreateBlogArticleDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { AppError } from '../../utils/appError.util';

import { MediaService } from '../media/media.service';

@autoInjectable()
export class BlogService {
  private repo = AppDataSource.getRepository(BlogArticle);
  private categoryRepo = AppDataSource.getRepository(Category);

  constructor(private mediaService: MediaService = new MediaService()) {}

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

    if (categoryId && categoryId !== 'All') {
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          categoryId,
        );
      if (isUuid) {
        const catEntity = await this.categoryRepo.findOne({
          where: { id: categoryId },
        });
        if (catEntity) {
          qb.andWhere('blog.category = :categoryName', {
            categoryName: catEntity.name,
          });
        }
      }
    } else if (category && category !== 'All') {
      qb.andWhere('blog.category = :category', { category });
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
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

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
    return item;
  }

  async create(dto: CreateBlogArticleDto): Promise<BlogArticle> {
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
      image: dto.image || '',
      coverMediaId: dto.coverMediaId,
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
    });

    const saved = await this.repo.save(blog);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateBlogArticleDto): Promise<BlogArticle> {
    const article = await this.getByIdOrSlug(id);

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
    if (dto.image !== undefined) article.image = dto.image;
    if (dto.coverMediaId !== undefined) article.coverMediaId = dto.coverMediaId;
    if (dto.views !== undefined) article.views = dto.views;
    if (dto.metaTitle !== undefined) article.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined) article.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) article.keywords = dto.keywords;

    const saved = await this.repo.save(article);
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
    await this.repo.remove(article);
    return true;
  }
}
