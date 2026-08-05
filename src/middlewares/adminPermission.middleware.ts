import express from 'express';

const verifyAdminPermissions = (permission?: string) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        success: false,
      });
    }
    return next();
  };
};

export default verifyAdminPermissions;
