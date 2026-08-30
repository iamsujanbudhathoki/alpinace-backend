import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import BcryptService from '../../utils/bcrypt.util';

@Entity({
  name: 'admin',
})
export class Admin extends CommonEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    select: false,
  })
  password: string;

  @Column({
    name: 'role',
    default: 'Expedition Director',
  })
  role: string;

  @Column({
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    name: 'phone_number',
    nullable: true,
  })
  phoneNumber: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'failed_login_attempts', type: 'int', default: 0 })
  failedLoginAttempts: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (
      this.password &&
      !this.password.startsWith('$2a$') &&
      !this.password.startsWith('$2b$')
    ) {
      this.password = await BcryptService.hash(this.password);
    }
  }
}
