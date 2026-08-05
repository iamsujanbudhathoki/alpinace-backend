import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Admin } from '../admin/Admin.entity';

@Entity('log')
export class Log extends CommonEntity {
  @Column()
  action: string;

  @ManyToOne(() => Admin, { nullable: true })
  actionBy: Admin;
}
