import {
  Controller,
  Get,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AuditLog } from '../../entities/log/AuditLog.entity';
import { AuditLogService } from '../../services/audit-log/audit-log.service';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/audit-logs')
@Tags('Admin Audit Logs')
@Security('jwt', ['admin'])
export class AdminAuditLogController extends Controller {
  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {
    super();
  }

  /**
   * Protected Admin-only endpoint for querying historical activity & security audit logs.
   * Logs are strictly immutable and cannot be updated or deleted.
   */
  @Get('')
  async getAuditLogs(
    @Query() action?: string,
    @Query() entityType?: string,
    @Query() entityId?: string,
    @Query() userId?: string,
    @Query() search?: string,
    @Query() startDate?: string,
    @Query() endDate?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<AuditLog[]>> {
    const dataTotalCount = await this.auditLogService.getAuditLogs({
      action,
      entityType,
      entityId,
      userId,
      search,
      startDate,
      endDate,
      limit,
      page,
    });

    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);

    return {
      data,
      pagination,
      message: 'Audit logs retrieved successfully',
      success: true,
    };
  }
}
