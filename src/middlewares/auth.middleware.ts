import * as express from 'express';
import { JwtUtil, JwtPayload } from '../utils/jwt.util';
import { AppDataSource } from '../config/database.config';
import { Admin } from '../entities/admin/Admin.entity';
import { AppError } from '../utils/appError.util';
import { RequestContext } from '../utils/request-context.util';


export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<JwtPayload> {
  if (securityName === 'jwt') {
    let token: string | undefined = request.cookies?.auth_token || request.cookies?.token;

    if (!token && request.headers.cookie) {
      const match = request.headers.cookie.match(/(?:^|;\s*)(?:auth_token|token)=([^;]+)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }

    if (!token && request.headers.authorization) {
      const rawHeader = request.headers.authorization.trim();
      token = rawHeader.startsWith('Bearer ') ? rawHeader.slice(7).trim() : rawHeader;
    }

    if (!token) {
      throw AppError.unAuthorized('Authentication token required');
    }

    let payload: JwtPayload;
    try {
      payload = JwtUtil.verifyToken(token);
    } catch (err: any) {
      throw AppError.unAuthorized(
        err?.message ? `Authentication failed: ${err.message}` : 'Invalid or expired token',
      );
    }

    if (!payload || !payload.id) {
      throw AppError.unAuthorized('Invalid token payload');
    }

    // Verify user exists and is active in the database
    if (AppDataSource.isInitialized) {
      const adminRepo = AppDataSource.getRepository(Admin);
      const user = await adminRepo.findOne({ where: { id: payload.id } });
      if (!user) {
        throw AppError.unAuthorized('Authenticated user no longer exists');
      }
      if (!user.isActive) {
        throw AppError.forbidden('Account is disabled');
      }

      // Check role/permissions if scopes are specified
      if (scopes && scopes.length > 0) {
        const userRole = (user.role || '').toLowerCase();
        const hasScope = scopes.some(
          (scope) => scope.toLowerCase() === userRole || scope.toLowerCase() === 'admin',
        );
        if (!hasScope) {
          throw AppError.forbidden('Forbidden: Insufficient permissions for this action');
        }
      }

      const authUser: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      (request as any).user = authUser;
      RequestContext.setUser(authUser);
      return authUser;
    }

    (request as any).user = payload;
    if (payload && payload.id) {
      RequestContext.setUser({ id: payload.id, email: payload.email, role: payload.role });
    }
    return payload;
  }

  throw AppError.unAuthorized('Unsupported security scheme');
}
