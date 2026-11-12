import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Admin } from '../models/Admin';
import { ADMIN_COOKIE_NAME } from '../middleware/auth';
import { AppError } from '../utils/appError';

function signAdminToken(admin: { id: string; email: string; role: 'super_admin' | 'admin' }): string {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] }
  );
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!admin || !admin.isActive) {
      return next(new AppError('Invalid email or password.', 401));
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid email or password.', 401));
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signAdminToken({
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    res.cookie(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

export function logout(_req: Request, res: Response): void {
  res.clearCookie(ADMIN_COOKIE_NAME, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

export function getMe(req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
}

