import { Controller, Post, Route, Security, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { BackupResult, DbBackupService } from '../../services/backup/db-backup.service';

@Route('admin/backup')
@Tags('Admin System Management')
@Security('jwt', ['admin'])
export class AdminBackupController extends Controller {
  constructor(
    private backupService: DbBackupService = new DbBackupService(),
  ) {
    super();
  }

  /**
   * Manually trigger daily database schema & values backup to Cloudflare R2 on demand.
   */
  @Post('trigger')
  async triggerBackup(): Promise<ApiResponse<BackupResult>> {
    const data = await this.backupService.runBackup();
    return {
      data,
      message: data.message,
      success: data.success,
    };
  }
}
