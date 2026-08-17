import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database.config';
import { DotenvConfig } from './config/env.config';
import { configMiddleware } from './middlewares';
import { PathUtils } from './utils/path.util';
import { seedDatabase } from './seeder/seed';
// import { RedisUtil } from './utils/redis.util';

class Server {
  constructor() {
    this.bootstrap();
  }

  async bootstrap() {
    await this.initializePath();
    console.log('Connecting to PostgreSQL database...');
    AppDataSource.initialize()
      .then(async () => {
        console.log('Data Source has been initialized!');
        try {
          await seedDatabase();
        } catch (seedErr) {
          console.warn(
            'Seeding skipped or encountered non-fatal error:',
            seedErr,
          );
        }

        const app = express();
        configMiddleware(app);

        // try {
        //   new RedisUtil().initialize();
        // } catch (redisErr) {
        //   console.warn('Redis initialization skipped:', redisErr);
        // }

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
