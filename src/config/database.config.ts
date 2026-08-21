import { DataSource } from 'typeorm';
import { DotenvConfig } from './env.config';

const isSslEnabled =
  DotenvConfig.DB_SSL ||
  Boolean(
    DotenvConfig.DATABASE_URL?.includes('sslmode=require') ||
    DotenvConfig.DATABASE_URL?.includes('ssl=true'),
  );

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: DotenvConfig.DATABASE_URL,
  entities: [`${__dirname}/../entities/**/*.entity.{ts,js}`],
  synchronize: true,
  // dropSchema: true ,
  ssl: isSslEnabled ? { rejectUnauthorized: false } : false,
});
