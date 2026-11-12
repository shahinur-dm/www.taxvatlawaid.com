import { NextFunction, Request, Response } from 'express';
import { Service } from '../models/Service';
import { AppError } from '../utils/appError';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getPublicServices(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminServices(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const services = await Service.find()
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    next(err);
  }
}

export async function createService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body;
    const slug = body.slug || slugify(body.title);
    const service = await Service.create({
      ...body,
      slug,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!service) {
      return next(new AppError('Service not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(new AppError('Service not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}

