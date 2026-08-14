import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum GuideRole {
  LEAD_EXPEDITION_LEADER = 'Lead Expedition Leader',
  SENIOR_TREKKING_GUIDE = 'Senior Trekking Guide',
  HIGH_ALTITUDE_SHERPA = 'High Altitude Sherpa',
  CULTURAL_TOUR_GUIDE = 'Cultural Tour Guide',
}

export enum GuideStatus {
  AVAILABLE = 'Available',
  ON_MOUNTAIN = 'On Mountain',
  ON_LEAVE = 'On Leave',
}

@Entity('guides')
export class Guide extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: GuideRole,
    default: GuideRole.LEAD_EXPEDITION_LEADER,
  })
  role: GuideRole;

  @Column({ name: 'summit_stats', nullable: true })
  summitStats: string;

  @Column({ name: 'certifications', type: 'simple-array', default: [] })
  certifications: string[];

  @Column({
    name: 'status',
    type: 'enum',
    enum: GuideStatus,
    default: GuideStatus.AVAILABLE,
  })
  status: GuideStatus;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'current_assignment', nullable: true })
  currentAssignment: string;

  @Column({ name: 'avatar_url', type: 'text' })
  avatarUrl: string;
}
