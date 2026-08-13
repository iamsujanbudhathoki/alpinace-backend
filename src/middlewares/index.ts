import express, { urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import errorHandler from '../middlewares/errorhandler.middleware';
import { DotenvConfig, Environment } from '../config/env.config';
import { AppDataSource } from '../config/database.config';
import cors from 'cors';
import swaggerDocument from '../../public/swagger.json';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

export const configMiddleware = (app: express.Application) => {
  const allowedOrigins = [
    'https://alpineace.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000',
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

  app.use(cors(corsOptions));
  app.use(express.json(), compression());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });
  app.use(limiter);

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
  const uploadPath = DotenvConfig.MEDIA_UPLOAD_PATH || 'uploads';
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
      environment: DotenvConfig.NODE_ENV || 'DEVELOPMENT',
      allowedCorsOrigins: allowedOrigins,
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
