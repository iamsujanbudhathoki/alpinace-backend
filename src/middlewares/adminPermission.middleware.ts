import express from 'express';
import { expressAuthentication } from './auth.middleware';

const verifyAdminPermissions = (permission?: string) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      await expressAuthentication(
        req,
        'jwt',
        permission ? [permission] : undefined,
      );
      return next();
    } catch (err: any) {
      return next(err);
    }
  };
};

export default verifyAdminPermissions;

