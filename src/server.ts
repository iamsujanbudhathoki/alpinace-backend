import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database.config';
import { DotenvConfig } from './config/env.config';
import { configMiddleware } from './middlewares';
import { PathUtils } from './utils/path.util';
import removeTempMediaCron from './crons/removeTempMedia.cron';
import dbBackupCron from './crons/dbBackup.cron';
// import { RedisUtil } from './utils/redis.util';

class Server {
  constructor() {
    this.bootstrap();
  }

  async bootstrap() {
    await this.initializePath();
    console.log('Connecting to MySQL database...');
    AppDataSource.initialize()
      .then(async () => {
        console.log('Data Source has been initialized!');

        const app = express();
        configMiddleware(app);

        // Activate background cron tasks
        removeTempMediaCron.start();
        dbBackupCron.start();
        console.log('[Cron Service] Daily database backup & cleanup cron jobs active.');

        const port = DotenvConfig.PORT;
        app.listen(port, () => {
          console.log(
            `Alpine Ace Backend TCP server established on port ${port}`,
          );
        });
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }

  async initializePath() {
    // Cloudflare R2 is the primary cloud storage.
    // Local directory is only ensured as a fallback if R2 credentials are not configured.
    if (!DotenvConfig.R2_BUCKET_NAME) {
      await PathUtils.ensureDir('uploads');
    }
  }
}

new Server();
