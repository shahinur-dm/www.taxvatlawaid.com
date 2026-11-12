import { NextFunction, Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { getNowInTimezone, getOrCreateSettings } from '../services/slotService';
import { AppError } from '../utils/appError';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function listAppointments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || '10'), 10) || 10));
    const search = String(req.query.search || '').trim();
    const date = String(req.query.date || '').trim();
    const service = String(req.query.service || '').trim();
    const status = String(req.query.status || '').trim();

    const filter: Record<string, unknown> = {};

    if (search) {
      const safe = new RegExp(escapeRegex(search), 'i');
      filter.$or = [
        { customerName: safe },
        { phone: safe },
        { bookingReference: safe },
        { email: safe },
      ];
    }

    if (date) {
      filter.appointmentDateStr = date;
    }

    if (service && service !== 'All') {
      filter.serviceCategory = service;
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    const [items, total] = await Promise.all([
      Appointment.find(filter)
        .sort({ appointmentDateStr: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Appointment.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAppointmentById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    if (!appointment) {
      return next(new AppError('Appointment not found.', 404));
    }
    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAppointmentStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { status } = req.body as { status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' };
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return next(new AppError('Appointment not found.', 404));
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}.`,
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAppointmentNotes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { adminNotes } = req.body as { adminNotes: string };
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: { adminNotes } },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return next(new AppError('Appointment not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Internal notes updated.',
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAppointment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(new AppError('Appointment not found.', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getDashboardStats(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await getOrCreateSettings();
    const { dateStr: todayStr } = getNowInTimezone(settings.timezone || 'Asia/Dhaka');

    const [
      totalCount,
      todayCount,
      statusGroups,
      categoryGroups,
      dailyTrend,
      upcomingAppointments,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ appointmentDateStr: todayStr }),
      Appointment.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Appointment.aggregate([
        { $group: { _id: '$serviceCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Appointment.aggregate([
        {
          $group: {
            _id: '$appointmentDateStr',
            total: { $sum: 1 },
            confirmed: {
              $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
            },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 14 },
      ]),
      Appointment.find({
        appointmentDateStr: { $gte: todayStr },
        status: { $in: ['Pending', 'Confirmed'] },
      })
        .sort({ appointmentDateStr: 1, appointmentTime: 1 })
        .limit(6)
        .lean(),
    ]);

    const statusMap: Record<string, number> = {
      Pending: 0,
      Confirmed: 0,
      Completed: 0,
      Cancelled: 0,
    };
    for (const g of statusGroups) {
      if (g._id && g._id in statusMap) {
        statusMap[g._id] = g.count;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        todayDate: todayStr,
        counts: {
          total: totalCount,
          today: todayCount,
          pending: statusMap.Pending,
          confirmed: statusMap.Confirmed,
          completed: statusMap.Completed,
          cancelled: statusMap.Cancelled,
        },
        serviceCategoryStats: categoryGroups.map((item) => ({
          category: item._id,
          count: item.count,
        })),
        dailyAnalytics: dailyTrend.map((item) => ({
          date: item._id,
          total: item.total,
          confirmed: item.confirmed,
          pending: item.pending,
          completed: item.completed,
        })),
        upcomingAppointments,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getRecentAppointments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const limit = Math.min(30, Math.max(1, parseInt(String(req.query.limit || '8'), 10) || 8));
    const items = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

