import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum BlogStatus {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  ARCHIVED = 'Archived',
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

  @Column({ name: 'image', type: 'text', nullable: true })
  image: string;
}
