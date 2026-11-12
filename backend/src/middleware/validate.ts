import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/appError';

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return next(
        new AppError(
          formattedErrors[0]?.message || 'Validation failed',
          400,
          formattedErrors
        )
      );
    }
    req.body = parsed.data;
    next();
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      const formattedErrors = parsed.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return next(
        new AppError(
          formattedErrors[0]?.message || 'Invalid query parameters',
          400,
          formattedErrors
        )
      );
    }
    req.query = parsed.data as Request['query'];
    next();
  };
}

