import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { RequestContext, RequestStore } from '../utils/request-context.util';

export const requestContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const existingRequestId = req.headers['x-request-id'];
  const requestId =
    typeof existingRequestId === 'string' && existingRequestId.trim().length > 0
      ? existingRequestId.trim()
      : crypto.randomUUID();

  const rawIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    req.ip ||
    '127.0.0.1';
  const ipAddress = rawIp.replace(/^::ffff:/, '');

  const userAgent = (req.headers['user-agent'] as string) || 'Unknown User-Agent';

  res.setHeader('X-Request-Id', requestId);
  (req as any).requestId = requestId;

  const store: RequestStore = {
    requestId,
    ipAddress,
    userAgent,
    user: (req as any).user || null,
  };

  RequestContext.run(store, () => {
    next();
  });
};
