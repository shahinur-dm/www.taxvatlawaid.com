import { NextFunction, Request, Response } from 'express';
import { Article } from '../models/Article';
import { AppError } from '../utils/appError';

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getPublicArticles(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filter: Record<string, unknown> = { isPublished: true };
    if (typeof req.query.category === 'string' && req.query.category.trim()) {
      filter.category = req.query.category.trim();
    }

    const articles = await Article.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPublicArticleBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!article) {
      return next(new AppError('Article not found.', 404));
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminArticles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (err) {
    next(err);
  }
}

export async function createArticle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const payload = { ...req.body };
    if (!payload.slug) {
      payload.slug = `${toSlug(payload.title)}-${Date.now().toString(36).slice(-4)}`;
    }
    if (payload.isPublished && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }

    const article = await Article.create(payload);
    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: article,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const payload = { ...req.body };
    if (payload.isPublished === true && !payload.publishedAt) {
      const existing = await Article.findById(req.params.id).select('publishedAt');
      if (existing && !existing.publishedAt) {
        payload.publishedAt = new Date();
      }
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!article) {
      return next(new AppError('Article not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      data: article,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteArticle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return next(new AppError('Article not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}
