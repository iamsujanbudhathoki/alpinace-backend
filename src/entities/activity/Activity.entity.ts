import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum ActivityStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

@Entity('activities')
export class Activity extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'status', default: ActivityStatus.ACTIVE })
  status: ActivityStatus;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'menu_order', type: 'int', default: 0 })
  menuOrder: number;

  image?: string | null;

  @Column({ name: 'media_id', type: 'varchar', nullable: true })
  mediaId?: string | null;
}
