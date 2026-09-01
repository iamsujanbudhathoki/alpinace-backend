import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum CategoryType {
  TREKKING = 'trekking',
  TOURS = 'tours',
  EXPEDITIONS = 'expeditions',
  BLOGS = 'blogs',
  MEDIA = 'media',
}

export enum CategoryStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
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

  @Column({ name: 'show_in_menu', type: 'boolean', default: true })
  showInMenu: boolean;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'menu_order', type: 'int', default: 0 })
  menuOrder: number;

  image?: string | null;

  @Column({ name: 'media_id', type: 'varchar', nullable: true })
  mediaId?: string | null;

  @Column({ name: 'parent_id', type: 'varchar', nullable: true })
  parentId?: string | null;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent?: Category | null;

  @OneToMany(() => Category, (cat) => cat.parent)
  children?: Category[];
}
