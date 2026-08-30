import { autoInjectable } from 'tsyringe';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../../config/database.config';
import { AuditLog } from '../../entities/log/AuditLog.entity';
import { AuditAction, AuditEntityType } from '../../constants/audit.constants';
import { RequestContext } from '../../utils/request-context.util';
import { AuditSanitizer } from '../../utils/audit-sanitizer.util';

export interface AuditLogOptions {
  action: AuditAction | string;
  entityType: AuditEntityType | string;
  entityId?: string | number | null;
  userId?: string | null;
  success?: boolean;
  oldData?: any;
  newData?: any;
  metadata?: Record<string, any> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
  entityManager?: EntityManager;
}

export interface LogMethodOptions {
  userId?: string;
  metadata?: Record<string, any>;
  entityManager?: EntityManager;
  actionOverride?: AuditAction | string;
}

export interface AuditLogQueryOptions {
  action?: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

@autoInjectable()
export class AuditLogService {
  /**
   * Main audit logging method. Persists an immutable AuditLog record to database.
   */
  async log(options: AuditLogOptions): Promise<AuditLog | null> {
    try {
      if (!AppDataSource.isInitialized) {
        return null;
      }

      const reqStore = RequestContext.get();

      const actorUserId =
        options.userId !== undefined
          ? options.userId
          : reqStore?.user?.id || null;

      const ipAddress =
        options.ipAddress !== undefined
          ? options.ipAddress
          : reqStore?.ipAddress || null;

      const userAgent =
        options.userAgent !== undefined
          ? options.userAgent
          : reqStore?.userAgent || null;

      const requestId =
        options.requestId !== undefined
          ? options.requestId
          : reqStore?.requestId || null;

      const sanitizedOld = options.oldData
        ? AuditSanitizer.sanitize(options.oldData)
        : null;
      const sanitizedNew = options.newData
        ? AuditSanitizer.sanitize(options.newData)
        : null;

      let computedMetadata = options.metadata ? { ...options.metadata } : {};

      if (options.oldData && options.newData && options.action === AuditAction.UPDATE) {
        const { changedKeys, diff } = AuditSanitizer.calculateDiff(
          options.oldData,
          options.newData,
        );
        computedMetadata.changedKeys = changedKeys;
        computedMetadata.diff = diff;
      }

      const repository = options.entityManager
        ? options.entityManager.getRepository(AuditLog)
        : AppDataSource.getRepository(AuditLog);

      const auditLog = repository.create({
        action: options.action,
        entityType: options.entityType,
        entityId: options.entityId ? String(options.entityId) : null,
        userId: actorUserId ? String(actorUserId) : null,
        success: options.success !== undefined ? options.success : true,
        oldData: sanitizedOld,
        newData: sanitizedNew,
        metadata: Object.keys(computedMetadata).length > 0 ? computedMetadata : null,
        ipAddress,
        userAgent,
        requestId,
      });

      return await repository.save(auditLog);
    } catch (error) {
      // Audit log failures must never crash the primary application flow,
      // but should be logged to standard application error stream.
      console.error('[AuditLogService Error] Failed to write audit log:', error);
      return null;
    }
  }

  async logLogin(userId: string, metadata?: Record<string, any>): Promise<AuditLog | null> {
    return this.log({
      action: AuditAction.LOGIN,
      entityType: AuditEntityType.AUTH,
      userId,
      success: true,
      metadata,
    });
  }

  async logLoginFailed(
    identifier: string,
    reason?: string,
    metadata?: Record<string, any>,
  ): Promise<AuditLog | null> {
    return this.log({
      action: AuditAction.LOGIN_FAILED,
      entityType: AuditEntityType.AUTH,
      userId: null,
      success: false,
      metadata: {
        attemptedIdentifier: identifier,
        failureReason: reason || 'Invalid credentials',
        ...metadata,
      },
    });
  }

  async logLogout(userId: string, metadata?: Record<string, any>): Promise<AuditLog | null> {
    return this.log({
      action: AuditAction.LOGOUT,
      entityType: AuditEntityType.AUTH,
      userId,
      success: true,
      metadata,
    });
  }

  async logCreate(
    entityType: AuditEntityType | string,
    entityId: string | number,
    newData: any,
    options?: LogMethodOptions,
  ): Promise<AuditLog | null> {
    return this.log({
      action: options?.actionOverride || AuditAction.CREATE,
      entityType,
      entityId,
      userId: options?.userId,
      newData,
      metadata: options?.metadata,
      entityManager: options?.entityManager,
    });
  }

  async logUpdate(
    entityType: AuditEntityType | string,
    entityId: string | number,
    oldData: any,
    newData: any,
    options?: LogMethodOptions,
  ): Promise<AuditLog | null> {
    // Detect special state actions if applicable
    let action: AuditAction | string = options?.actionOverride || AuditAction.UPDATE;

    if (!options?.actionOverride && oldData && newData) {
      if (
        oldData.showOnMenu !== undefined &&
        newData.showOnMenu !== undefined &&
        oldData.showOnMenu !== newData.showOnMenu
      ) {
        action = AuditAction.MENU_VISIBILITY_CHANGED;
      } else if (
        oldData.status !== undefined &&
        newData.status !== undefined &&
        oldData.status !== newData.status
      ) {
        action = AuditAction.STATUS_CHANGED;
      }
    }

    return this.log({
      action,
      entityType,
      entityId,
      userId: options?.userId,
      oldData,
      newData,
      metadata: options?.metadata,
      entityManager: options?.entityManager,
    });
  }

  async logDelete(
    entityType: AuditEntityType | string,
    entityId: string | number,
    oldData: any,
    options?: LogMethodOptions,
  ): Promise<AuditLog | null> {
    return this.log({
      action: options?.actionOverride || AuditAction.DELETE,
      entityType,
      entityId,
      userId: options?.userId,
      oldData,
      metadata: options?.metadata,
      entityManager: options?.entityManager,
    });
  }

  async logOrdering(
    entityType: AuditEntityType | string,
    itemsCount: number,
    oldData?: any,
    newData?: any,
    options?: LogMethodOptions,
  ): Promise<AuditLog | null> {
    return this.log({
      action: AuditAction.ORDERING_CHANGED,
      entityType,
      userId: options?.userId,
      oldData,
      newData,
      metadata: { itemsCount, ...options?.metadata },
      entityManager: options?.entityManager,
    });
  }

  /**
   * Paginated retrieval of audit logs for admin inspection.
   */
  async getAuditLogs(queryOptions: AuditLogQueryOptions): Promise<[AuditLog[], number]> {
    const page = Number(queryOptions.page) || 1;
    const limit = Math.min(Number(queryOptions.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const qb = AppDataSource.getRepository(AuditLog).createQueryBuilder('audit');

    if (queryOptions.action) {
      qb.andWhere('audit.action = :action', { action: queryOptions.action });
    }

    if (queryOptions.entityType) {
      qb.andWhere('audit.entityType = :entityType', {
        entityType: queryOptions.entityType,
      });
    }

    if (queryOptions.entityId) {
      qb.andWhere('audit.entityId = :entityId', {
        entityId: queryOptions.entityId,
      });
    }

    if (queryOptions.userId) {
      qb.andWhere('audit.userId = :userId', { userId: queryOptions.userId });
    }

    if (queryOptions.startDate) {
      qb.andWhere('audit.createdAt >= :startDate', {
        startDate: new Date(queryOptions.startDate),
      });
    }

    if (queryOptions.endDate) {
      qb.andWhere('audit.createdAt <= :endDate', {
        endDate: new Date(queryOptions.endDate),
      });
    }

    if (queryOptions.search) {
      const search = `%${queryOptions.search.trim()}%`;
      qb.andWhere(
        '(audit.action LIKE :search OR audit.entityType LIKE :search OR audit.entityId LIKE :search OR audit.userId LIKE :search OR audit.ipAddress LIKE :search OR audit.requestId LIKE :search)',
        { search },
      );
    }

    qb.orderBy('audit.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    return await qb.getManyAndCount();
  }
}
