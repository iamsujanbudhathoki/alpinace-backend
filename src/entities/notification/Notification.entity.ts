import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export type NotificationType = 'inquiry' | 'booking' | 'quote' | 'system';

@Entity('notifications')
export class Notification extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar', length: 30, default: 'system' })
  type: NotificationType;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @Column({ name: 'ref_id', nullable: true })
  refId: string;
}
