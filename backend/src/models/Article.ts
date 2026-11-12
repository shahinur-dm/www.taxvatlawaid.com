import mongoose, { Document, Schema } from 'mongoose';

export const ARTICLE_CATEGORIES = [
  'Tax Updates',
  'VAT Updates',
  'Customs Regulations',
  'Corporate Law',
  'RJSC Compliance',
  'Legal Guidelines',
  'Business Compliance',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface IArticle extends Document {
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  statutoryReference: string;
  authorName: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ARTICLE_CATEGORIES,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25000,
    },
    statutoryReference: {
      type: String,
      trim: true,
      default: '',
      maxlength: 400,
    },
    authorName: {
      type: String,
      trim: true,
      default: 'Hossain Ahmed (Khan)',
      maxlength: 120,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ isPublished: 1, publishedAt: -1 });

export const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', articleSchema);
