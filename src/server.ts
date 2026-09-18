import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database.config';
import { DotenvConfig } from './config/env.config';
import { configMiddleware } from './middlewares';
import { PathUtils } from './utils/path.util';
import removeTempMediaCron from './crons/removeTempMedia.cron';
import dbBackupCron from './crons/dbBackup.cron';
import logger from './utils/logger.util';

// Register global crash handlers to ensure unhandled errors are logged before exit
process.on('uncaughtException', (error) => {
  logger.error('CRITICAL: Uncaught Exception detected', {
    error: error.message,
    stack: error.stack,
  });
});

process.on('unhandledRejection', (reason: any) => {
  logger.error('CRITICAL: Unhandled Promise Rejection detected', {
    reason: reason?.message || reason,
    stack: reason?.stack,
  });
});

class Server {
  constructor() {
    this.bootstrap();
  }

  async bootstrap() {
    await this.initializePath();
    logger.info('Connecting to MySQL database...');
    AppDataSource.initialize()
      .then(async () => {
        logger.info('Data Source has been successfully initialized!');

        const app = express();
        configMiddleware(app);

        // Activate background cron tasks
        removeTempMediaCron.start();
        dbBackupCron.start();
        logger.info('[Cron Service] Daily database backup & cleanup cron jobs active.');

        const port = DotenvConfig.PORT;
        app.listen(port, () => {
          logger.info(
            `Alpine Ace Backend TCP server established on port ${port}`,
          );
        });
      })
      .catch((err) => {
        logger.error('Error during Data Source initialization', { error: err });
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

