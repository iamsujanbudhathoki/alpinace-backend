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
  static PORT = process.env.PORT || 5001;
  static NODE_ENV = process.env.NODE_ENV;

  // DB
  static DATABASE_URL = process.env.DATABASE_URL?.trim() || '';
  static DB_SSL =
  process.env.DB_SSL === 'true' ||
    Boolean(
      (process.env.DATABASE_URL || '').includes('sslmode=require') ||
      (process.env.DATABASE_URL || '').includes('ssl=true'),
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
    static PUBLIC_URL = process.env.R2_PUBLIC_DOMAIN

  // CLOUDFLARE R2 STORAGE
  static R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '';
  static R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '';
  static R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '';
  static R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || '';
  static R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || '';

  // CLOUDFLARE TURNSTILE
  static TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
  static TURNSTILE_ENABLED = process.env.TURNSTILE_ENABLED !== 'false';
}

export { DotenvConfig };
