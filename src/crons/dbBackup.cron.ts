import crons from 'node-cron';
import { DbBackupService } from '../services/backup/db-backup.service';

const backupService = new DbBackupService();

// Cron job scheduled every day at 12:00 AM (midnight)
export default crons.schedule('0 0 * * *', async () => {
  console.log('[Cron] Executing scheduled daily database backup to Cloudflare R2...');
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
