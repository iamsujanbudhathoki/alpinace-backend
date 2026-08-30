import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Admin } from '../../entities/admin/Admin.entity';
import { AdminAuthSchema } from '../../schemas/admin-auth.schema';
import { AdminLoginResponse } from '../../interfaces/admin.interface';
import BcryptService from '../../utils/bcrypt.util';
import { JwtUtil } from '../../utils/jwt.util';
import { AppError } from '../../utils/appError.util';
import { AuditLogService } from '../audit-log/audit-log.service';

@autoInjectable()
export class AdminAuthService {
  private adminRepo = AppDataSource.getRepository(Admin);

  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

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
      await this.auditLogService.logLoginFailed(
        data.email,
        'Invalid email address',
      );
      throw AppError.unAuthorized('Invalid email or password');
    }

    if (!admin.isActive) {
      await this.auditLogService.logLoginFailed(
        data.email,
        'Account is disabled',
        { userId: admin.id },
      );
      throw AppError.forbidden('Account is disabled');
    }

    const isValidPassword = await BcryptService.compare(
      data.password,
      admin.password,
    );
    if (!isValidPassword) {
      await this.auditLogService.logLoginFailed(
        data.email,
        'Invalid password',
        { userId: admin.id },
      );
      throw AppError.unAuthorized('Invalid email or password');
    }

    const token = JwtUtil.generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    // Log successful login
    await this.auditLogService.logLogin(admin.id, {
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
