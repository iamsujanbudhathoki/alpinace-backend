import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('guides')
export class Guide extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role' })
  role:
    | 'Lead Expedition Leader'
    | 'Senior Trekking Guide'
    | 'High Altitude Sherpa'
    | 'Cultural Tour Guide';

  @Column({ name: 'summit_stats', nullable: true })
  summitStats: string;

  @Column({ name: 'certifications', type: 'simple-array', default: [] })
  certifications: string[];

  @Column({ name: 'status', default: 'Available' })
  status: 'Available' | 'On Mountain' | 'On Leave';

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'current_assignment', nullable: true })
  currentAssignment: string;

  @Column({ name: 'avatar_url', type: 'text' })
  avatarUrl: string;
}
