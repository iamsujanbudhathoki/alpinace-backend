import express, { urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import errorHandler from '../middlewares/errorhandler.middleware';
import { DotenvConfig, Environment } from '../config/env.config';
import cors from 'cors';
import swaggerDocument from '../../public/swagger.json';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

export const configMiddleware = (app: express.Application) => {
  app.use(express.json(), cors({ origin: '*' }), compression());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });
  app.use(limiter);
  app.use(cors());
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
  app.use(express.static(uploadPath));

  RegisterRoutes(app);
  app.use(errorHandler);
};
