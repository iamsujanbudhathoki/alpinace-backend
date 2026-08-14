import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.util';

function extractValidationErrors(errors: ValidationError[]): string[] {
  const rawErrors: string[] = [];
  for (const errorItem of errors) {
    if (errorItem.constraints) {
      rawErrors.push(...Object.values(errorItem.constraints));
    }
    if (errorItem.children && errorItem.children.length > 0) {
      rawErrors.push(...extractValidationErrors(errorItem.children));
    }
  }
  return rawErrors;
}

export class RequestValidator {
  static validate = (classInstance: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body, {
        enableImplicitConversion: true,
      });

      if (Array.isArray(convertedObject)) {
        const allErrors: ValidationError[] = [];
        for (const item of convertedObject) {
          const itemErrors = await validate(item as object, {
            whitelist: true,
            forbidNonWhitelisted: false,
          });
          allErrors.push(...itemErrors);
        }
        if (allErrors.length > 0) {
          const rawErrors = extractValidationErrors(allErrors);
          const errorMessage =
            rawErrors.length > 0 ? rawErrors.join(', ') : 'Validation failed';

          return res.status(400).json({
            success: false,
            message: errorMessage,
            errors: rawErrors,
            data: null,
          });
        }
        req.body = convertedObject;
        return next();
      }

      const errors: ValidationError[] = await validate(
        convertedObject as object,
        {
          whitelist: true,
          forbidNonWhitelisted: true,
        },
      );

      if (errors.length > 0) {
        const rawErrors = extractValidationErrors(errors);
        const errorMessage =
          rawErrors.length > 0 ? rawErrors.join(', ') : 'Validation failed';

        return res.status(400).json({
          success: false,
          message: errorMessage,
          errors: rawErrors,
          data: null,
        });
      }

      req.body = convertedObject;
      next();
    };
  };

  static validateQuery = (classInstance: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.query, {
        enableImplicitConversion: true,
      });

      const errors: ValidationError[] = await validate(
        convertedObject as object,
        {
          whitelist: true,
          forbidNonWhitelisted: true,
        },
      );

      if (errors.length > 0) {
        const rawErrors = extractValidationErrors(errors);
        const errorMessage =
          rawErrors.length > 0 ? rawErrors.join(', ') : 'Validation failed';

        return res.status(400).json({
          success: false,
          message: errorMessage,
          errors: rawErrors,
          data: null,
        });
      }

      req.query = convertedObject as any;
      next();
    };
  };
}

export function createValidatorMiddleware(schema: any) {
  class ValidatorMiddleware {
    public use(req: Request, res: Response, next: NextFunction) {
      return RequestValidator.validate(schema)(req, res, next);
    }
  }
  return ValidatorMiddleware;
}
