import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum FaqStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

@Entity('faqs')
export class Faq extends CommonEntity {
  @Column({ name: 'question', type: 'text' })
  question: string;

  @Column({ name: 'answer', type: 'text' })
  answer: string;

  @Column({ name: 'category', default: 'General' })
  category: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: FaqStatus,
    default: FaqStatus.ACTIVE,
  })
  status: FaqStatus;

  @Column({ name: 'order', type: 'int', default: 0 })
  order: number;
}
