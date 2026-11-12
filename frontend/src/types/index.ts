export type ServiceCategory =
  | 'Income Tax'
  | 'VAT & Tax'
  | 'Company Taxation'
  | 'Tax Return'
  | 'VAT Registration'
  | 'Legal Consultancy'
  | 'Business Compliance'
  | 'Other';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Income Tax',
  'VAT & Tax',
  'Company Taxation',
  'Tax Return',
  'VAT Registration',
  'Legal Consultancy',
  'Business Compliance',
  'Other',
];

export type ConsultationMode = 'Chamber Visit' | 'Video Call' | 'Phone Call';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface SlotItem {
  time24: string;
  label: string;
  available: boolean;
  reason?: 'booked' | 'past';
}

export interface AvailableSlotsResponse {
  date: string;
  timezone: string;
  dayName: string;
  isAvailableDay: boolean;
  isPastDate: boolean;
  isTooFarAhead: boolean;
  message?: string;
  slotDurationMinutes: number;
  slots: SlotItem[];
}

export interface AppointmentRecord {
  _id: string;
  bookingReference: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceCategory: ServiceCategory;
  consultationMode: ConsultationMode;
  problemDescription?: string;
  appointmentDate: string;
  appointmentDateStr: string;
  appointmentTime: string;
  status: AppointmentStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingConfirmation {
  bookingReference: string;
  customerName: string;
  phone?: string;
  email?: string;
  serviceCategory: ServiceCategory;
  consultationMode: ConsultationMode;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface ServiceItem {
  _id: string;
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
}

export interface PublicSettings {
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
}

export interface SixStepItem {
  step: string;
  title: string;
  description: string;
  accent: 'red' | 'green' | 'navy';
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WebsiteContentData {
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
  sixStepProcess: SixStepItem[];
  whyChooseUs: WhyChooseItem[];
  industries: string[];
  faqs: FaqItem[];
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
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
}

export interface DashboardStats {
  todayDate: string;
  counts: {
    total: number;
    today: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  serviceCategoryStats: Array<{ category: string; count: number }>;
  dailyAnalytics: Array<{
    date: string;
    total: number;
    confirmed: number;
    pending: number;
    completed: number;
  }>;
  upcomingAppointments: AppointmentRecord[];
}

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

export interface ArticleItem {
  _id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  statutoryReference: string;
  authorName: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'New' | 'Reviewed' | 'Responded';
  createdAt: string;
}


