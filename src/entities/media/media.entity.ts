import { BeforeRemove, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { MediaType } from '../../constants/appConstant';
import { Category } from '../category/Category.entity';

@Entity()
export class Media extends CommonEntity {
  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'file_name' })
  name: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: string;

  @ManyToOne(() => Category, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'alt_text', nullable: true })
  altText: string;

  @Column({ name: 'file_size' })
  fileSize: string;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.BLOG_THUMBNAIL,
  })
  mediaType: MediaType;

  @Column({ name: 'file_path' })
  path: string;
}
