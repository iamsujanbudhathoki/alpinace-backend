import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum AssociateStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

@Entity('associates')
export class Associate extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role', nullable: true })
  role: string;

  @Column({ name: 'company', nullable: true })
  company: string;

  @Column({ name: 'image', type: 'text', nullable: true })
  image: string;

  @Column({ name: 'website_url', nullable: true })
  websiteUrl: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'category', default: 'Partner' })
  category: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AssociateStatus,
    default: AssociateStatus.ACTIVE,
  })
  status: AssociateStatus;

  @Column({ name: 'order', type: 'int', default: 0 })
  order: number;
}
