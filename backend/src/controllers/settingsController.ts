import { NextFunction, Request, Response } from 'express';
import { WebsiteSettings } from '../models/WebsiteSettings';
import { getOrCreateSettings } from '../services/slotService';

export async function getPublicSettings(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({
      success: true,
      data: {
        announcementEnabled: settings.announcementEnabled,
        announcementText: settings.announcementText,
        bookingSlotDurationMinutes: settings.bookingSlotDurationMinutes,
        bookingStartTime: settings.bookingStartTime,
        bookingEndTime: settings.bookingEndTime,
        availableDays: settings.availableDays,
        timezone: settings.timezone,
        maxAdvanceBookingDays: settings.maxAdvanceBookingDays,
        officeHoursText: settings.officeHoursText,
        siteTitle: settings.siteTitle,
        seoDescription: settings.seoDescription,
        whatsappDispatchEnabled: settings.whatsappDispatchEnabled,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminSettings(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await WebsiteSettings.findOneAndUpdate(
      { key: 'default' },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Website settings updated successfully.',
      data: settings,
    });
  } catch (err) {
    next(err);
  }
}

