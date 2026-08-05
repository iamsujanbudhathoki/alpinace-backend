import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('blog_articles')
export class BlogArticle extends CommonEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'author_role', nullable: true })
  authorRole: string;

  @Column({ name: 'author_avatar', nullable: true })
  authorAvatar: string;

  @Column({ name: 'read_time', default: '5 min read' })
  readTime: string;

  @Column({ name: 'status', default: 'Published' })
  status: 'Published' | 'Draft' | 'Archived';

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
