import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.util';
import { RequestContext } from '../utils/request-context.util';

export const httpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const durationMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2);

    const store = RequestContext.get();
    const statusCode = res.statusCode;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const ip = store?.ipAddress || (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
    const requestId = store?.requestId || (req as any).requestId || '-';

    const logMessage = `${method} ${url} ${statusCode} - ${durationMs}ms [IP: ${ip}] [ReqID: ${requestId}]`;

    if (statusCode >= 500) {
      logger.error(logMessage, {
        method,
        url,
        statusCode,
        durationMs: Number(durationMs),
        ip,
        requestId,
      });
    } else if (statusCode >= 400) {
      logger.warn(logMessage, {
        method,
        url,
        statusCode,
        durationMs: Number(durationMs),
        ip,
        requestId,
      });
    } else {
      logger.info(logMessage, {
        method,
        url,
        statusCode,
        durationMs: Number(durationMs),
        ip,
        requestId,
      });
    }
  });

  next();
};
