import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('settings')
export class Setting extends CommonEntity {
  @Column({ name: 'key', unique: true })
  key: string;

  @Column({ name: 'value', type: 'text' })
  value: string;
}
