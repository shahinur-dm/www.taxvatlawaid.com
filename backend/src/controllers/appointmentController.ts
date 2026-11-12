import { NextFunction, Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import {
  dateStrToUtcDate,
  getAvailableSlotsForDate,
} from '../services/slotService';
import { AppError } from '../utils/appError';
import { generateBookingReference } from '../utils/referenceGenerator';

export async function getAvailableSlots(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { date } = req.query as { date: string };
    const result = await getAvailableSlotsForDate(date);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function createAppointment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      customerName,
      phone,
      email,
      serviceCategory,
      consultationMode,
      problemDescription,
      appointmentDate,
      appointmentTime,
    } = req.body as {
      customerName: string;
      phone: string;
      email?: string;
      serviceCategory: string;
      consultationMode?: string;
      problemDescription?: string;
      appointmentDate: string;
      appointmentTime: string;
    };

    // Backend-enforced availability validation (never trust client alone)
    const availability = await getAvailableSlotsForDate(appointmentDate);

    if (availability.isPastDate) {
      return next(new AppError('Past dates cannot be booked.', 400));
    }

    if (!availability.isAvailableDay) {
      return next(
        new AppError(
          availability.message ||
            'Consultations are only available Sunday through Thursday.',
          400
        )
      );
    }

    if (availability.isTooFarAhead) {
      return next(
        new AppError(
          availability.message || 'Selected date is too far in the future.',
          400
        )
      );
    }

    const matchedSlot = availability.slots.find(
      (s) => s.label === appointmentTime || s.time24 === appointmentTime
    );

    if (!matchedSlot) {
      return next(
        new AppError(
          'Selected time slot is invalid or outside booking hours (3:00 PM – 8:00 PM).',
          400
        )
      );
    }

    if (!matchedSlot.available) {
      if (matchedSlot.reason === 'past') {
        return next(new AppError('Past time slots are unavailable for booking.', 400));
      }
      return next(
        new AppError(
          'This time slot is already booked. Please select another available slot.',
          409
        )
      );
    }

    const bookingReference = generateBookingReference(appointmentDate);

    const created = await Appointment.create({
      bookingReference,
      customerName,
      phone,
      email: email || '',
      serviceCategory,
      consultationMode: consultationMode || 'Chamber Visit',
      problemDescription: problemDescription || '',
      appointmentDate: dateStrToUtcDate(appointmentDate),
      appointmentDateStr: appointmentDate,
      appointmentTime: matchedSlot.label,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Your appointment request has been submitted successfully!',
      appointment: {
        bookingReference: created.bookingReference,
        customerName: created.customerName,
        phone: created.phone,
        email: created.email,
        serviceCategory: created.serviceCategory,
        consultationMode: created.consultationMode,
        appointmentDate: created.appointmentDateStr,
        appointmentTime: created.appointmentTime,
        status: created.status,
        createdAt: created.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAppointmentByReference(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reference = String(req.params.reference || '').trim().toUpperCase();
    if (!reference) {
      return next(new AppError('Booking reference is required.', 400));
    }

    const appointment = await Appointment.findOne({ bookingReference: reference })
      .select(
        'bookingReference customerName serviceCategory consultationMode appointmentDateStr appointmentTime status createdAt'
      )
      .lean();

    if (!appointment) {
      return next(new AppError('No appointment found with that booking reference.', 404));
    }

    res.status(200).json({
      success: true,
      appointment: {
        bookingReference: appointment.bookingReference,
        customerName: appointment.customerName,
        serviceCategory: appointment.serviceCategory,
        consultationMode: appointment.consultationMode,
        appointmentDate: appointment.appointmentDateStr,
        appointmentTime: appointment.appointmentTime,
        status: appointment.status,
        createdAt: appointment.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

