import crons from 'node-cron';
import { DbBackupService } from '../services/backup/db-backup.service';

const backupService = new DbBackupService();

// Cron job scheduled every 10 seconds for testing
export default crons.schedule('*/10 * * * * *', async () => {
  console.log('[Cron] Executing test 10-second database backup to Cloudflare R2...');
  try {
    const res = await backupService.runBackup();
    if (res.success) {
      console.log('[Cron] Daily database backup completed successfully.');
    } else {
      console.error('[Cron] Daily database backup failed:', res.message);
    }
  } catch (err) {
    console.error('[Cron] Unhandled error during scheduled DB backup:', err);
  }
});
