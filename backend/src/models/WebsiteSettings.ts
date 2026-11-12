import mongoose, { Document, Schema } from 'mongoose';

export interface IWebsiteSettings extends Document {
  key: string;
  announcementEnabled: boolean;
  announcementText: string;
  bookingSlotDurationMinutes: number;
  bookingStartTime: string;
  bookingEndTime: string;
  availableDays: number[];
  timezone: string;
  maxAdvanceBookingDays: number;
  officeHoursText: string;
  siteTitle: string;
  seoDescription: string;
  whatsappDispatchEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const websiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    key: {
      type: String,
      default: 'default',
      unique: true,
    },
    announcementEnabled: {
      type: Boolean,
      default: true,
    },
    announcementText: {
      type: String,
      trim: true,
      maxlength: 400,
      default:
        'ON PROGRESS – Our website is currently being updated. Thank you for your patience.',
    },
    bookingSlotDurationMinutes: {
      type: Number,
      default: 30,
      min: 15,
      max: 120,
    },
    bookingStartTime: {
      type: String,
      default: '15:00',
      match: [/^\d{2}:\d{2}$/, 'Start time must be HH:mm'],
    },
    bookingEndTime: {
      type: String,
      default: '20:00',
      match: [/^\d{2}:\d{2}$/, 'End time must be HH:mm'],
    },
    availableDays: {
      type: [Number],
      default: [0, 1, 2, 3, 4], // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4
    },
    timezone: {
      type: String,
      default: 'Asia/Dhaka',
    },
    maxAdvanceBookingDays: {
      type: Number,
      default: 60,
      min: 1,
      max: 365,
    },
    officeHoursText: {
      type: String,
      trim: true,
      default: 'Sunday – Thursday: 3:00 PM – 8:00 PM (Closed Friday & Saturday)',
    },
    siteTitle: {
      type: String,
      trim: true,
      default: 'TaxVat LawAid | Tax, VAT, Customs & Corporate Legal Solutions in Bangladesh',
    },
    seoDescription: {
      type: String,
      trim: true,
      default:
        'TaxVat LawAid provides integrated legal, income tax, VAT, customs, RJSC company registration, intellectual property, and litigation support in Bangladesh.',
    },
    whatsappDispatchEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WebsiteSettings = mongoose.model<IWebsiteSettings>(
  'WebsiteSettings',
  websiteSettingsSchema
);

