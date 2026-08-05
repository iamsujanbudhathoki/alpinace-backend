import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { BlogArticle } from '../../entities/blog/BlogArticle.entity';
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
      author: dto.author,
      authorRole: dto.authorRole || 'Expedition Specialist',
      authorAvatar:
        dto.authorAvatar ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      readTime: dto.readTime || '5 min read',
      status: dto.status || 'Published',
      publishedDate:
        dto.publishedDate || new Date().toISOString().split('T')[0],
      views: 0,
      excerpt: dto.excerpt || '',
      content: dto.content || '',
      image:
        dto.image ||
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    });

    return this.repo.save(blog);
  }

  async update(id: string, dto: UpdateBlogArticleDto): Promise<BlogArticle> {
    const article = await this.getByIdOrSlug(id);

    if (dto.title && dto.title !== article.title) {
      article.title = dto.title;
      article.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    Object.assign(article, dto);
    return this.repo.save(article);
  }

  async delete(id: string): Promise<boolean> {
    const article = await this.getByIdOrSlug(id);
    await this.repo.remove(article);
    return true;
  }
}
