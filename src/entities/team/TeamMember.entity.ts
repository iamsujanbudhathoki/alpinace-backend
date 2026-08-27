import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum TeamMemberStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('team_members')
export class TeamMember extends CommonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar?: string;

  @Column({ name: 'experience', nullable: true })
  experience?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TeamMemberStatus,
    default: TeamMemberStatus.ACTIVE,
  })
  status: TeamMemberStatus;

  @Column({ name: 'order', type: 'int', default: 0 })
  order: number;
}
