import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'Reviewed' | 'Responded';
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Legal Consultation Inquiry',
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    status: {
      type: String,
      enum: ['New', 'Reviewed', 'Responded'],
      default: 'New',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({ createdAt: -1 });

export const Inquiry =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', inquirySchema);
