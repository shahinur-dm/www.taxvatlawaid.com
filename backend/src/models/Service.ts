import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  categoryTag: string;
  divisionBadge: string;
  shortDescription: string;
  detailedServices: string[];
  documentChecklist: string[];
  legalFramework: string;
  iconName: string;
  accentColor: 'red' | 'green' | 'navy';
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: [true, 'Service slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    categoryTag: {
      type: String,
      required: [true, 'Category tag is required'],
      trim: true,
      maxlength: 60,
    },
    divisionBadge: {
      type: String,
      trim: true,
      maxlength: 60,
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: 500,
    },
    detailedServices: {
      type: [String],
      default: [],
    },
    documentChecklist: {
      type: [String],
      default: [],
    },
    legalFramework: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    iconName: {
      type: String,
      trim: true,
      default: 'Scale',
    },
    accentColor: {
      type: String,
      enum: ['red', 'green', 'navy'],
      default: 'navy',
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', serviceSchema);

