import mongoose, { Document, Schema } from 'mongoose';

export const SERVICE_CATEGORIES = [
  'eTIN/eBIN Registration',
  'TAX/VAT Return & Services',
  'TDA/VDS Return & Services',
  'TAX/VAT Compliance',
  'Audit-Accounting Services',
  'Company Taxation',
  'RJSC Company Registration',
  'Partnership, OPCRegistration',
  'Society-Foundation Registration',
  'Club Ltd. Registration',
  'Trade Association Registration',
  'RJSC Legal Compliance',
  'IRC, ERC, BIDA Registration',
  'IP>Trademark, Patent, Design',
  'TAX/VAT Appeal, Tribunal',
  'High Court & Writ Petition',
  'Corporate Legal Consultant',
  'Corporate Business Compliance',
  'Licences',
  'Others',
] as const;

export const CONSULTATION_MODES = ['Chamber Visit', 'Video Call', 'Phone Call'] as const;

export const APPOINTMENT_STATUSES = [
  'Pending',
  'Confirmed',
  'Completed',
  'Cancelled',
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type ConsultationMode = (typeof CONSULTATION_MODES)[number];
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface IAppointment extends Document {
  bookingReference: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceCategory: ServiceCategory;
  consultationMode: ConsultationMode;
  problemDescription?: string;
  appointmentDate: Date;
  appointmentDateStr: string;
  appointmentTime: string;
  status: AppointmentStatus;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [120, 'Full name cannot exceed 120 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [6, 'Phone number must be at least 6 digits'],
      maxlength: [30, 'Phone number is too long'],
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [150, 'Email cannot exceed 150 characters'],
      default: '',
    },
    serviceCategory: {
      type: String,
      required: [true, 'Service category is required'],
      trim: true,
      index: true,
    },
    consultationMode: {
      type: String,
      enum: CONSULTATION_MODES,
      default: 'Chamber Visit',
    },
    problemDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Problem description cannot exceed 2000 characters'],
      default: '',
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
      index: true,
    },
    appointmentDateStr: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'],
      index: true,
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time slot is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: APPOINTMENT_STATUSES,
      default: 'Pending',
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [3000, 'Admin notes cannot exceed 3000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Atomic slot locking: prevents two active bookings for the same date+time slot.
// Cancelled appointments free up the slot automatically.
appointmentSchema.index(
  { appointmentDateStr: 1, appointmentTime: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ['Pending', 'Confirmed', 'Completed'] },
    },
    name: 'unique_active_appointment_slot',
  }
);

appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ customerName: 'text', phone: 'text', bookingReference: 'text' });

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

