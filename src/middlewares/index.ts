import express, { urlencoded } from 'express';
import path from 'path';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { RegisterRoutes } from '../routes/routes';
import errorHandler from './errorhandler.middleware';
import { DotenvConfig, Environment } from '../config/env.config';
import { AppDataSource } from '../config/database.config';
import cors from 'cors';
import swaggerDocument from '../../public/swagger.json';
import compression from 'compression';
import { authLimiter, generalLimiter, inquiryLimiter } from './rate-limiter.middleware';
import { requestContextMiddleware } from './request-context.middleware';

export const configMiddleware = (app: express.Application) => {
  // Global Request Context & Correlation ID Middleware
  app.use(requestContextMiddleware);

  // Trust proxy for rate limiting behind reverse proxies (Vercel, Render, Nginx, Cloudflare)
  app.set('trust proxy', 1);

  // 1. Helmet HTTP Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false, // Managed by frontend or disabled for pure API
    }),
  );

  const allowedOrigins = [
    'https://alpineacetreks.com',
    'https://www.alpineacetreks.com',
    'http://alpineacetreks.com',
    'http://www.alpineacetreks.com',
    'https://alpineace.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5001',
  ];
  if (DotenvConfig.FRONTEND_BASE_URL) {
    allowedOrigins.push(DotenvConfig.FRONTEND_BASE_URL.replace(/\/$/, ''));
  }

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        cleanOrigin.endsWith('alpineacetreks.com') ||
        cleanOrigin.includes('localhost')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  };

  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(express.json(), compression());

  // 2. Global Rate Limiter
  app.use(generalLimiter);

  // 3. Sensitive Endpoint Rate Limiters
  app.use('/admin/auth/login', authLimiter);
  app.use('/inquiries', inquiryLimiter);

  app.use(
    urlencoded({
      extended: true,
    }),
  );

  if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/swagger-json', (req, res) => res.send(swaggerUi));
  }

  // Static file serving for local image uploads
  const uploadPath = path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadPath));

  // Root and Health Check routes (showing DB connection status)
  app.get('/', async (req, res) => {
    let dbStatus = 'disconnected';
    if (AppDataSource.isInitialized) {
      try {
        await AppDataSource.query('SELECT 1');
        dbStatus = 'connected';
      } catch {
        dbStatus = 'error';
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Alpine Ace Backend API is initialized and running!',
      database: {
        status: dbStatus,
        isInitialized: AppDataSource.isInitialized,
      },
      environment: DotenvConfig.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/health', async (req, res) => {
    const isDbReady = AppDataSource.isInitialized;
    res.status(isDbReady ? 200 : 503).json({
      status: isDbReady ? 'healthy' : 'unhealthy',
      database: isDbReady ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    });
  });

  RegisterRoutes(app);
  app.use(errorHandler);
};
