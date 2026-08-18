import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum BlogStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
}

@Entity('blog_articles')
export class BlogArticle extends CommonEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'read_time', default: '5 min read' })
  readTime: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.PUBLISHED,
  })
  status: BlogStatus;

  @Column({ name: 'published_date', nullable: true })
  publishedDate: string;

  @Column({ name: 'views', type: 'int', default: 0 })
  views: number;

  @Column({ name: 'excerpt', type: 'text', nullable: true })
  excerpt: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({ name: 'cover_media_id', nullable: true })
  coverMediaId?: string;

  image?: string;

  @Column({ name: 'meta_title', type: 'text', nullable: true })
  metaTitle?: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription?: string;

  @Column({ name: 'keywords', type: 'text', nullable: true })
  keywords?: string;
}
