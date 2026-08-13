import { DataSource } from 'typeorm';
import { DotenvConfig } from './env.config';



const isSslEnabled =
  DotenvConfig.DB_SSL ||
  Boolean(
    DotenvConfig.DATABASE_URL?.includes('supabase.co') ||
      DotenvConfig.DATABASE_URL?.includes('supabase.com') ||
      DotenvConfig.DATABASE_URL?.includes('sslmode=require'),
  );

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DotenvConfig.DATABASE_URL,
  entities: [`${__dirname}/../entities/**/*.entity.{ts,js}`],
  synchronize: DotenvConfig.NODE_ENV === 'DEVELOPMENT',
  ssl: isSslEnabled ? { rejectUnauthorized: false } : false,
});