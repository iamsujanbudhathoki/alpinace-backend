import {
  Body,
  Controller,
  Get,
  Header,
  Middlewares,
  NoSecurity,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import express from 'express';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AdminAuthSchema } from '../../schemas/admin-auth.schema';
import { AdminAuthService } from '../../services/admin/auth.service';
import { AdminLoginResponse } from '../../interfaces/admin.interface';
import { JwtUtil } from '../../utils/jwt.util';
import { AppError } from '../../utils/appError.util';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationType } from '../../entities/notification/Notification.entity';
import EmailUtil from '../../utils/email.util';
import { DotenvConfig, Environment } from '../../config/env.config';
import { AuditLogService } from '../../services/audit-log/audit-log.service';

async function resolveLocation(ip: string): Promise<string> {
  if (
    !ip ||
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.')
  ) {
    return 'Localhost / Private Network';
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,city,regionName`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);
    if (res.ok) {
      const geo: any = await res.json();
      if (geo?.status === 'success') {
        const parts = [geo.city || geo.regionName, geo.country].filter(Boolean);
        return parts.join(', ') || 'Unknown Location';
      }
    }
  } catch {
    // Ignore and fallback gracefully
  }
  return 'Location Unavailable';
}

@Route('admin/auth')
@Tags('Admin Auth System')
@Security('jwt')
export class AdminAuthController extends Controller {
  constructor(
    private adminAuthService: AdminAuthService = new AdminAuthService(),
    private notificationService: NotificationService = new NotificationService(),
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {
    super();
  }

  @Post('login')
  @NoSecurity()
  @Middlewares(RequestValidator.validate(AdminAuthSchema))
  async login(
    @Body() body: AdminAuthSchema,
    @Request() req: express.Request,
  ): Promise<ApiResponse<AdminLoginResponse>> {
    const data = await this.adminAuthService.login(body);

    const isProd = DotenvConfig.NODE_ENV === Environment.PRODUCTION;
    if (req.res) {
      req.res.cookie('auth_token', data.token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    // Extract IP address
    const rawIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      req.ip ||
      '127.0.0.1';
    const cleanIp = rawIp.replace(/^::ffff:/, '');
    const userAgent = (req.headers['user-agent'] as string) || 'Unknown Browser/Device';
    const now = new Date();
    const timestamp = `${now.toUTCString()} / ${now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })} (NPT)`;

    // Asynchronously resolve location, send security email, and generate in-app notification
    resolveLocation(cleanIp)
      .then(async (location) => {
        // 1. Send Security Email Alert
        await EmailUtil.sendLoginAlertEmail({
          adminName: data.name,
          adminEmail: data.email,
          ip: cleanIp,
          userAgent,
          location,
          timestamp,
        });

        // 2. Generate In-App System Notification
        await this.notificationService.create({
          title: 'Admin Login Detected',
          body: `${data.name} (${data.email}) logged in from ${location} (IP: ${cleanIp}) using ${userAgent.slice(0, 60)}.`,
          type: NotificationType.SYSTEM,
        });
      })
      .catch((err) =>
        console.error('[Auth Alert] Background notification/email dispatch error:', err),
      );

    return {
      data,
      message: 'Login successful',
      success: true,
    };
  }

  @Get('me')
  async getCurrentUser(
    @Request() req: express.Request,
  ): Promise<ApiResponse<AdminLoginResponse>> {
    const authUser = (req as any).user;
    if (!authUser || !authUser.id) {
      throw AppError.unAuthorized('Unauthorized');
    }
    const admin = await this.adminAuthService.getById(authUser.id);
    if (!admin) throw AppError.notFound('User not found');

    const cookies = req.cookies || {};
    let token = cookies.auth_token || cookies.token || '';
    if (!token && req.headers.authorization) {
      const header = req.headers.authorization.trim();
      token = header.startsWith('Bearer ') ? header.slice(7).trim() : header;
    }

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
  async logout(@Request() req: express.Request): Promise<ApiResponse<null>> {
    const authUser = (req as any).user;
    if (authUser && authUser.id) {
      await this.auditLogService.logLogout(authUser.id);
    }

    const isProd = DotenvConfig.NODE_ENV === Environment.PRODUCTION;
    if (req.res) {
      req.res.clearCookie('auth_token', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });
      req.res.clearCookie('token', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });
    }

    return {
      data: null,
      message: 'Logged out successfully',
      success: true,
    };
  }
}
