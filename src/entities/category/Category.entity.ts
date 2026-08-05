import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum CategoryType {
  TREKKING = 'Trekking',
  TOURS = 'Tours',
  EXPEDITIONS = 'Expeditions',
  BLOGS = 'Blogs',
  MEDIA = 'Media',
}

export enum CategoryStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
}

@Entity('categories')
export class Category extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'type' })
  type: CategoryType;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'item_count', default: 0 })
  itemCount: number;

  @Column({ name: 'status', default: CategoryStatus.ACTIVE })
  status: CategoryStatus;
}
