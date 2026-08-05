import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Admin } from '../../entities/admin/Admin.entity';
import { AdminAuthSchema } from '../../schemas/admin-auth.schema';
import { AdminLoginResponse } from '../../interfaces/admin.interface';
import BcryptService from '../../utils/bcrypt.util';
import { JwtUtil } from '../../utils/jwt.util';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class AdminAuthService {
  private adminRepo = AppDataSource.getRepository(Admin);

  async login(data: AdminAuthSchema): Promise<AdminLoginResponse> {
    const admin = await this.adminRepo.findOne({
      where: { email: data.email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'avatarUrl',
        'isActive',
      ],
    });

    if (!admin) {
      throw AppError.unAuthorized('Invalid email or password');
    }

    if (!admin.isActive) {
      throw AppError.forbidden('Account is disabled');
    }

    const isValidPassword = await BcryptService.compare(
      data.password,
      admin.password,
    );
    if (!isValidPassword) {
      throw AppError.unAuthorized('Invalid email or password');
    }

    const token = JwtUtil.generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      avatarUrl: admin.avatarUrl || undefined,
      token,
    };
  }

  async getById(id: string): Promise<Admin | null> {
    return this.adminRepo.findOne({ where: { id } });
  }
}
