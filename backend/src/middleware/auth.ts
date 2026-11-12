import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Admin } from '../models/Admin';
import { AppError } from '../utils/appError';

export const ADMIN_COOKIE_NAME = 'tvla_admin_token';

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: 'super_admin' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        name: string;
        email: string;
        role: 'super_admin' | 'admin';
      };
    }
  }
}

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined = req.cookies?.[ADMIN_COOKIE_NAME];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Authentication required. Please log in.', 401));
    }

    const decoded = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
    const admin = await Admin.findById(decoded.id).lean();

    if (!admin || !admin.isActive) {
      return next(new AppError('Invalid or inactive administrator account.', 401));
    }

    req.admin = {
      id: String(admin._id),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch {
    next(new AppError('Session expired or invalid token. Please log in again.', 401));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.admin || !['admin', 'super_admin'].includes(req.admin.role)) {
    return next(new AppError('Forbidden: Administrator access required.', 403));
  }
  next();
}

