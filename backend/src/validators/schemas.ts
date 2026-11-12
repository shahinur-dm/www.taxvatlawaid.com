import { z } from 'zod';
import {
  APPOINTMENT_STATUSES,
  CONSULTATION_MODES,
  SERVICE_CATEGORIES,
} from '../models/Appointment';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
});

export const availableSlotsQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const createAppointmentSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name cannot exceed 120 characters'),
  phone: z
    .string()
    .regex(/^[+\d][\d\s-]{5,24}$/, 'Please enter a valid phone number'),
  email: z
    .union([z.string().email('Please enter a valid email address'), z.literal('')])
    .optional()
    .default(''),
  serviceCategory: z.enum(SERVICE_CATEGORIES, {
    errorMap: () => ({ message: 'Please select a valid service category' }),
  }),
  consultationMode: z.enum(CONSULTATION_MODES).optional().default('Chamber Visit'),
  problemDescription: z
    .string()
    .max(2000, 'Problem description cannot exceed 2000 characters')
    .optional()
    .default(''),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Appointment date must be in YYYY-MM-DD format'),
  appointmentTime: z
    .string()
    .min(4, 'Please select an available time slot')
    .max(20, 'Invalid time slot'),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(APPOINTMENT_STATUSES, {
    errorMap: () => ({ message: 'Invalid appointment status' }),
  }),
});

export const updateAppointmentNotesSchema = z.object({
  adminNotes: z
    .string()
    .max(3000, 'Admin notes cannot exceed 3000 characters'),
});

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required').max(140),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  categoryTag: z.string().min(2, 'Category tag is required').max(60),
  divisionBadge: z.string().max(60).optional().default(''),
  shortDescription: z.string().min(10, 'Short description is required').max(500),
  detailedServices: z.array(z.string().min(1)).default([]),
  documentChecklist: z.array(z.string().min(1)).default([]),
  legalFramework: z.string().max(1000).optional().default(''),
  iconName: z.string().max(40).optional().default('Scale'),
  accentColor: z.enum(['red', 'green', 'navy']).optional().default('navy'),
  displayOrder: z.number().int().min(0).max(999).optional().default(0),
  isFeatured: z.boolean().optional().default(true),
  isActive: z.boolean().optional().default(true),
});

export const updateServiceSchema = serviceSchema.partial();

export const updateSettingsSchema = z.object({
  announcementEnabled: z.boolean().optional(),
  announcementText: z.string().min(1).max(400).optional(),
  bookingSlotDurationMinutes: z.number().int().min(15).max(120).optional(),
  bookingStartTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Start time must be HH:mm')
    .optional(),
  bookingEndTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'End time must be HH:mm')
    .optional(),
  availableDays: z
    .array(z.number().int().min(0).max(6))
    .min(1, 'Select at least one available day')
    .optional(),
  timezone: z.string().min(3).max(60).optional(),
  maxAdvanceBookingDays: z.number().int().min(1).max(365).optional(),
  officeHoursText: z.string().min(3).max(200).optional(),
  siteTitle: z.string().min(3).max(200).optional(),
  seoDescription: z.string().min(10).max(400).optional(),
  whatsappDispatchEnabled: z.boolean().optional(),
});

export const updateContentSchema = z.object({
  brandName: z.string().min(2).max(120).optional(),
  brandTagline: z.string().min(2).max(250).optional(),
  associatedPractice: z.string().max(150).optional(),
  heroBadge: z.string().max(150).optional(),
  heroHeading: z.string().min(5).max(300).optional(),
  heroDescription: z.string().min(10).max(800).optional(),
  heroPrimaryCta: z.string().min(2).max(80).optional(),
  heroSecondaryCta: z.string().min(2).max(80).optional(),
  leadCounselName: z.string().min(2).max(120).optional(),
  leadCounselCredentials: z.string().max(200).optional(),
  leadCounselTitle: z.string().max(150).optional(),
  leadCounselPracticeLine: z.string().max(300).optional(),
  aboutBadge: z.string().max(100).optional(),
  aboutHeading: z.string().min(5).max(250).optional(),
  aboutDescription: z.string().min(10).max(1500).optional(),
  aboutVision: z.string().max(1000).optional(),
  aboutMission: z.array(z.string()).optional(),
  coreValues: z.array(z.string()).optional(),
  sixStepProcess: z
    .array(
      z.object({
        step: z.string(),
        title: z.string(),
        description: z.string(),
        accent: z.enum(['red', 'green', 'navy']).default('navy'),
      })
    )
    .optional(),
  whyChooseUs: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  industries: z.array(z.string()).optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(3),
        answer: z.string().min(3),
      })
    )
    .optional(),
  contactPhone: z.string().min(6).max(40).optional(),
  contactWhatsapp: z.string().min(6).max(40).optional(),
  contactEmail: z.string().email().optional(),
  officeAddress: z.string().min(5).max(300).optional(),
  websiteUrl: z.string().max(150).optional(),
  footerDescription: z.string().max(600).optional(),
  footerDisclaimer: z.string().max(500).optional(),
  copyrightText: z.string().max(200).optional(),
  socialLinks: z
    .object({
      facebook: z.string().max(300).optional(),
      linkedin: z.string().max(300).optional(),
      youtube: z.string().max(300).optional(),
      whatsapp: z.string().max(300).optional(),
    })
    .optional(),
});

