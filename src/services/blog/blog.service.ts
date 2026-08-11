import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import {
  CreateBlogArticleDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class BlogService {
  private repo = AppDataSource.getRepository(BlogArticle);

  async getAll(): Promise<BlogArticle[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getByIdOrSlug(idOrSlug: string): Promise<BlogArticle> {
    const item = await this.repo.findOne({
      where: [{ id: idOrSlug }, { slug: idOrSlug }],
    });
    if (!item) throw AppError.notFound(`Blog article ${idOrSlug} not found`);
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
    });

    return this.repo.save(blog);
  }

  async update(id: string, dto: UpdateBlogArticleDto): Promise<BlogArticle> {
    const article = await this.getByIdOrSlug(id);

    // Update slug only when title changes
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
    if (dto.views !== undefined) article.views = dto.views;

    return this.repo.save(article);
  }

  async getPublished(): Promise<BlogArticle[]> {
    return this.repo.find({
      where: { status: BlogStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string): Promise<boolean> {
    const article = await this.getByIdOrSlug(id);
    await this.repo.remove(article);
    return true;
  }
}
