import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.util';
import { ValidateError } from 'tsoa';
import multer from 'multer';
import messages from '../constants/messages.constants';

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(+error?.statusCode || 400).json({
      success: false,
      message: error?.message ?? 'Internal server error',
      data: null,
    });
  }
  if (error instanceof ValidateError) {
    const fields = error?.fields || {};
    const fieldMessages: string[] = [];

    for (const [fieldKey, fieldVal] of Object.entries(fields)) {
      const msg = (fieldVal as any)?.message;
      const val = (fieldVal as any)?.value;
      const cleanField = fieldKey
        .replace(/^body\./, '')
        .replace(/^body$/, 'Request body');

      if (msg === 'invalid object') {
        if (Array.isArray(val)) {
          fieldMessages.push(
            `${cleanField} must be a JSON object, but received an Array`,
          );
        } else {
          fieldMessages.push(`${cleanField} must be a valid JSON object`);
        }
      } else if (msg === 'invalid array') {
        fieldMessages.push(`${cleanField} must be an Array`);
      } else if (
        msg === 'invalid float' ||
        msg === 'invalid integer' ||
        msg === 'invalid number'
      ) {
        fieldMessages.push(`${cleanField} must be a valid number`);
      } else if (msg === 'invalid string') {
        fieldMessages.push(`${cleanField} must be a string`);
      } else if (msg === 'invalid boolean') {
        fieldMessages.push(`${cleanField} must be a boolean`);
      } else if (typeof msg === 'string') {
        fieldMessages.push(
          msg.includes(cleanField) || cleanField === 'Request body'
            ? msg
            : `${cleanField}: ${msg}`,
        );
      } else {
        fieldMessages.push(`Invalid input for ${cleanField}`);
      }
    }

    const exactMessage =
      fieldMessages.length > 0 ? fieldMessages.join(', ') : 'Validation Failed';
    return res.status(400).json({
      success: false,
      message: exactMessage,
      errors: fieldMessages,
      details: error?.fields,
      data: null,
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: 'File Size Exceeded. Please upload within 8MB',
      details: error.message,
    });
  }

  console.log('Error', error);
  return res.status(500).json({
    success: false,
    message: messages.serverError,
    data: null,
  });
};
export default errorHandler;
