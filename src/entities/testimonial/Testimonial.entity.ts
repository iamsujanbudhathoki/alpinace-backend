import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum TestimonialStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('testimonials')
export class Testimonial extends CommonEntity {
  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'role', nullable: true })
  role?: string;

  @Column({ name: 'country', nullable: true })
  country?: string;

  @Column({ name: 'trip_name', nullable: true })
  tripName?: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  avatar?: string;

  @Column({ name: 'avatar_media_id', nullable: true })
  avatarMediaId?: string;

  @Column({ name: 'rating', type: 'int', default: 5 })
  rating: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TestimonialStatus,
    default: TestimonialStatus.ACTIVE,
  })
  status: TestimonialStatus;

  @Column({ name: 'order', type: 'int', default: 0 })
  order: number;
}
