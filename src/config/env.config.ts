import dotenv from 'dotenv';
import path from 'path';

export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

class DotenvConfig {
  // APP
  static PORT = process.env.PORT || 5000;
  static NODE_ENV = process.env.NODE_ENV;

  // DB
  static DATABASE_URL =
    process.env.DATABASE_URL?.trim() ||
    'postgresql://postgres.kqebaxbdkioqiejrvuve:eDi4h6iZIW42Ql7z@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres';
  static DB_SSL =
    process.env.DB_SSL === 'true' ||
    Boolean(
      (process.env.DATABASE_URL || 'supabase.co').includes('supabase.co') ||
        (process.env.DATABASE_URL || 'pooler.supabase.com').includes('pooler.supabase.com') ||
        (process.env.DATABASE_URL || '').includes('sslmode=require'),
    );

  // JWT
  static JWT_SECRET =
    process.env.JWT_SECRET || 'alpineace_super_secret_jwt_key_2026';
  // MAIL
  static MAIL_HOST = process.env.MAIL_HOST;
  static MAIL_PORT = Number(process.env.MAIL_PORT);
  static MAIL_USER = process.env.MAIL_USER;
  static MAIL_PASSWORD = process.env.MAIL_PASSWORD;
  static ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.MAIL_USER || '';

  // LOG
  static LOG_LEVEL = process.env.LOG_LEVEL;

  // URL
  static FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
  static BASE_URL = process.env.BASE_URL;
  static PUBLIC_URL =
    process.env.PUBLIC_URL ||
    process.env.BASE_URL ||
    `http://localhost:${process.env.PORT || 5000}`;

  // MEDIA
  static MEDIA_TEMP_PATH = process.env.MEDIA_TEMP_PATH || 'temp';
  static MEDIA_UPLOAD_PATH = process.env.MEDIA_UPLOAD_PATH || 'uploads';
  static TEMP_FOLDER_PATH = process.env.TEMP_FOLDER_PATH || 'temp';
}

export { DotenvConfig };
