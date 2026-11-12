import { NextFunction, Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry';
import { AppError } from '../utils/appError';

export async function createInquiry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inquiry = await Inquiry.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email || '',
      subject: req.body.subject || 'General Legal Consultation Inquiry',
      message: req.body.message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. Our chamber desk will respond shortly.',
      data: {
        id: inquiry._id,
        name: inquiry.name,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminInquiries(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateInquiryStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return next(new AppError('Inquiry not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated.',
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteInquiry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return next(new AppError('Inquiry not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}
