import {
  Body,
  Controller,
  Get,
  Header,
  Middlewares,
  Post,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AdminAuthSchema } from '../../schemas/admin-auth.schema';
import { AdminAuthService } from '../../services/admin/auth.service';
import { AdminLoginResponse } from '../../interfaces/admin.interface';
import { JwtUtil } from '../../utils/jwt.util';
import { AppError } from '../../utils/appError.util';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('admin/auth')
@Tags('Admin Auth System')
export class AdminAuthController extends Controller {
  constructor(
    private adminAuthService: AdminAuthService = new AdminAuthService(),
  ) {
    super();
  }

  @Post('login')
  @Middlewares(RequestValidator.validate(AdminAuthSchema))
  async login(
    @Body() body: AdminAuthSchema,
  ): Promise<ApiResponse<AdminLoginResponse>> {
    const data = await this.adminAuthService.login(body);

    return {
      data,
      message: 'Login successful',
      success: true,
    };
  }

  @Get('me')
  async getCurrentUser(
    @Header('Authorization') authHeader?: string,
  ): Promise<ApiResponse<AdminLoginResponse>> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw AppError.unAuthorized('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    const payload = JwtUtil.verifyToken(token);
    const admin = await this.adminAuthService.getById(payload.id);
    if (!admin) throw AppError.notFound('User not found');

    return {
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatarUrl: admin.avatarUrl || undefined,
        token,
      },
      message: 'Current user retrieved',
      success: true,
    };
  }

  @Post('logout')
  async logout(): Promise<ApiResponse<null>> {
    return {
      data: null,
      message: 'Logged out successfully',
      success: true,
    };
  }
}
