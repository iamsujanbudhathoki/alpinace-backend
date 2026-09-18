import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { DotenvConfig, Environment } from '../config/env.config';

// Ensure log directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const isProduction = DotenvConfig.NODE_ENV === Environment.PRODUCTION;
const logLevel = DotenvConfig.LOG_LEVEL || (isProduction ? 'info' : 'debug');

// Custom format for dev console output
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}${info.stack ? `\n${info.stack}` : ''}`,
  ),
);

// Custom format for production JSON log files / cloud stdout
const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: logLevel,
  format: isProduction ? prodFormat : devFormat,
  defaultMeta: { service: 'alpineace-backend' },
  transports: [
    new winston.transports.Console({
      format: isProduction ? prodFormat : devFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: prodFormat,
      maxsize: 10 * 1024 * 1024, // 10MB limit per file
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: prodFormat,
      maxsize: 10 * 1024 * 1024, // 10MB limit per file
      maxFiles: 5,
    }),
  ],
});

export default logger;
