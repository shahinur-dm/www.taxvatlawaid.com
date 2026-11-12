import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new AppError('Requested API endpoint was not found.', 404));
}

export function errorHandler(
  err: Error & { code?: number; statusCode?: number; details?: unknown },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = err instanceof AppError ? err.statusCode : err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err instanceof AppError ? err.details : undefined;

  // Mongoose duplicate key error (including atomic booking slot conflicts)
  if (err.code === 11000) {
    statusCode = 409;
    if (message.includes('unique_active_appointment_slot') || message.includes('appointmentDateStr')) {
      message = 'This time slot has just been booked. Please select another available slot.';
    } else {
      message = 'A record with this unique value already exists.';
    }
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = errors[0]?.message || 'Validation failed';
    details = errors;
  }

  // Invalid MongoDB ObjectId
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid resource identifier.';
  }

  if (statusCode >= 500 && env.nodeEnv === 'production') {
    message = 'An unexpected server error occurred. Please try again later.';
    details = undefined;
  }

  if (env.nodeEnv !== 'test') {
    console.error(`[ERROR] ${statusCode} - ${err.message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { errors: details } : {}),
  });
}

