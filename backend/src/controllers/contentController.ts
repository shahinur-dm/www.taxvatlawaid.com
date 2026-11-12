import { NextFunction, Request, Response } from 'express';
import { WebsiteContent } from '../models/WebsiteContent';

export async function getOrCreateContent() {
  let content = await WebsiteContent.findOne({ key: 'default' });
  if (!content) {
    content = await WebsiteContent.create({ key: 'default' });
  }
  return content;
}

export async function getPublicContent(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const content = await getOrCreateContent();
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateContent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const content = await WebsiteContent.findOneAndUpdate(
      { key: 'default' },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Website content updated successfully.',
      data: content,
    });
  } catch (err) {
    next(err);
  }
}

