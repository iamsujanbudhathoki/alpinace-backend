import { DataSource } from 'typeorm';
import { DotenvConfig } from './env.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DotenvConfig.DB_HOST!,
  port: +DotenvConfig.DB_PORT!,
  username: DotenvConfig.DB_USERNAME!,
  password: DotenvConfig.DB_PASSWORD!,
  database: DotenvConfig.DB_NAME!,
  entities: [`${__dirname}/../entities/**/*.entity.ts`],
  synchronize: true,
  ssl: DotenvConfig.DB_SSL ? { rejectUnauthorized: false } : false,
});
