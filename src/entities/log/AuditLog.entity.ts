import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audit_log')
@Index(['userId'])
@Index(['action'])
@Index(['entityType'])
@Index(['entityId'])
@Index(['requestId'])
@Index(['createdAt'])
@Index(['entityType', 'entityId'])
export class AuditLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  action: string;

  @Column({ type: 'varchar', length: 100 })
  entityType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  entityId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userId: string | null;

  @Column({ type: 'boolean', default: true })
  success: boolean;

  @Column({ type: 'json', nullable: true })
  oldData: any | null;

  @Column({ type: 'json', nullable: true })
  newData: any | null;

  @Column({ type: 'json', nullable: true })
  metadata: any | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ipAddress: string | null;

  @Column({ type: 'text', nullable: true })
  userAgent: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  requestId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
