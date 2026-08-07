import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database.config';
import { DotenvConfig } from './config/env.config';
import { configMiddleware } from './middlewares';
import { PathUtils } from './utils/path.util';
import { RedisUtil } from './utils/redis.util';
import { seedDatabase } from './seeder/seed';

class Server {
  constructor() {
    this.bootstrap();
  }

  async bootstrap() {
    await this.initializePath();
    AppDataSource.initialize()
      .then(async () => {
        console.log('Data Source has been initialized!');
        try {
          // await seedDatabase();
        } catch (seedErr) {
          console.warn(
            'Seeding skipped or encountered non-fatal error:',
            seedErr,
          );
        }

        const app = express();
        configMiddleware(app);

        try {
          new RedisUtil().initialize();
        } catch (redisErr) {
          console.warn('Redis initialization skipped:', redisErr);
        }

        const port = DotenvConfig.PORT || 5000;
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
    if (DotenvConfig.TEMP_FOLDER_PATH)
      await PathUtils.ensureDir(DotenvConfig.TEMP_FOLDER_PATH);
    if (DotenvConfig.MEDIA_TEMP_PATH)
      await PathUtils.ensureDir(DotenvConfig.MEDIA_TEMP_PATH);
    if (DotenvConfig.MEDIA_UPLOAD_PATH)
      await PathUtils.ensureDir(DotenvConfig.MEDIA_UPLOAD_PATH);
  }
}

new Server();
