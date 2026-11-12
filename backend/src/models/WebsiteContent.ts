import mongoose, { Document, Schema } from 'mongoose';

export interface ISixStepItem {
  step: string;
  title: string;
  description: string;
  accent: 'red' | 'green' | 'navy';
}

export interface IWhyChooseItem {
  title: string;
  description: string;
}

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IWebsiteContent extends Document {
  key: string;
  brandName: string;
  brandTagline: string;
  associatedPractice: string;
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  leadCounselName: string;
  leadCounselCredentials: string;
  leadCounselTitle: string;
  leadCounselPracticeLine: string;
  aboutBadge: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutVision: string;
  aboutMission: string[];
  coreValues: string[];
  sixStepProcess: ISixStepItem[];
  whyChooseUs: IWhyChooseItem[];
  industries: string[];
  faqs: IFaqItem[];
  contactPhone: string;
  contactWhatsapp: string;
  contactEmail: string;
  officeAddress: string;
  websiteUrl: string;
  footerDescription: string;
  footerDisclaimer: string;
  copyrightText: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const websiteContentSchema = new Schema<IWebsiteContent>(
  {
    key: {
      type: String,
      default: 'default',
      unique: true,
    },
    brandName: { type: String, trim: true, default: 'TaxVat LawAid' },
    brandTagline: {
      type: String,
      trim: true,
      default: 'Your Trusted Partner in Tax, VAT, Customs & Corporate Legal Solutions',
    },
    associatedPractice: {
      type: String,
      trim: true,
      default: 'TaxAid',
    },
    heroBadge: {
      type: String,
      trim: true,
      default: 'Bangladesh • 2026 Edition Legal & Compliance Practice',
    },
    heroHeading: {
      type: String,
      trim: true,
      default:
        'Integrated Legal, Taxation, Regulatory & Business Compliance Services in Bangladesh',
    },
    heroDescription: {
      type: String,
      trim: true,
      default:
        'Clear advice, careful preparation, professional representation, and dependable legal support across Income Tax, VAT, Customs, RJSC Company Law, Intellectual Property, and Litigation.',
    },
    heroPrimaryCta: { type: String, trim: true, default: 'Book an Appointment' },
    heroSecondaryCta: { type: String, trim: true, default: 'Explore Practice Areas' },
    leadCounselName: { type: String, trim: true, default: 'Hossain Ahmed (Khan)' },
    leadCounselCredentials: {
      type: String,
      trim: true,
      default: "B.A, (Hon's) M.A, LL.B, LL.M.",
    },
    leadCounselTitle: {
      type: String,
      trim: true,
      default: 'Advocate & Tax Consultant',
    },
    leadCounselPracticeLine: {
      type: String,
      trim: true,
      default:
        'TAX-VAT, RJSC-Company Legal Compliance • Appeal, Tribunal, High Court & Writ Petition',
    },
    aboutBadge: { type: String, trim: true, default: 'ABOUT TAXVAT LAWAID' },
    aboutHeading: {
      type: String,
      trim: true,
      default: 'A Complete Legal Partner for Every Stage of Business',
    },
    aboutDescription: {
      type: String,
      trim: true,
      default:
        'We recognise that legal and regulatory matters are interconnected. A company may need incorporation, trade licensing, tax & VAT registration, import/export approvals, annual statutory filings, and dispute resolution. Our integrated model helps clients manage these obligations in an organised manner.',
    },
    aboutVision: {
      type: String,
      trim: true,
      default:
        'To be a trusted and respected legal and corporate compliance partner in Bangladesh, known for professional integrity, practical legal solutions and client-focused service.',
    },
    aboutMission: {
      type: [String],
      default: [],
    },
    coreValues: {
      type: [String],
      default: [
        'Integrity',
        'Professional Competence',
        'Confidentiality',
        'Transparency',
        'Accountability',
        'Rule of Law',
      ],
    },
    sixStepProcess: {
      type: [
        {
          step: String,
          title: String,
          description: String,
          accent: { type: String, enum: ['red', 'green', 'navy'], default: 'navy' },
        },
      ],
      default: [],
    },
    whyChooseUs: {
      type: [
        {
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    industries: {
      type: [String],
      default: [],
    },
    faqs: {
      type: [
        {
          question: String,
          answer: String,
        },
      ],
      default: [],
    },
    contactPhone: { type: String, trim: true, default: '01614446444 / 01343226633' },
    contactWhatsapp: { type: String, trim: true, default: '01614446444' },
    contactEmail: { type: String, trim: true, default: 'taxvatlawaid@gmail.com' },
    officeAddress: {
      type: String,
      trim: true,
      default: '14/7, Eastern Mansion, Lift-14, 67/9, Pioneer Road, Ramna, Dhaka',
    },
    websiteUrl: { type: String, trim: true, default: 'www.taxvatlawaid.com' },
    footerDescription: {
      type: String,
      trim: true,
      default:
        'Advocate & Tax Consultant — TAX-VAT, RJSC-Company Legal Compliance, Appeal, Tribunal, High Court & Writ Petition.',
    },
    footerDisclaimer: {
      type: String,
      trim: true,
      default:
        'Disclaimer: General statutory information only; verify current Finance Act, SROs & rules prior to filing.',
    },
    copyrightText: {
      type: String,
      trim: true,
      default: '© 2026 TaxVat LawAid. All rights reserved. Dhaka, Bangladesh.',
    },
    socialLinks: {
      facebook: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
      youtube: { type: String, trim: true, default: '' },
      whatsapp: { type: String, trim: true, default: 'https://wa.me/8801614446444' },
    },
  },
  {
    timestamps: true,
  }
);

export const WebsiteContent = mongoose.model<IWebsiteContent>(
  'WebsiteContent',
  websiteContentSchema
);

