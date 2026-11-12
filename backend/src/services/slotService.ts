import { Appointment } from '../models/Appointment';
import { IWebsiteSettings, WebsiteSettings } from '../models/WebsiteSettings';

export interface SlotItem {
  time24: string;
  label: string;
  available: boolean;
  reason?: 'booked' | 'past';
}

export interface AvailableSlotsResult {
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

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function getNowInTimezone(timezone = 'Asia/Dhaka'): {
  dateStr: string;
  minutesSinceMidnight: number;
  dayOfWeek: number;
} {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '00';
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  let hour = parseInt(getPart('hour'), 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(getPart('minute'), 10);

  const dateStr = `${year}-${month}-${day}`;
  const dayOfWeek = getDayOfWeekFromDateStr(dateStr);

  return {
    dateStr,
    minutesSinceMidnight: hour * 60 + minute,
    dayOfWeek,
  };
}

export function getDayOfWeekFromDateStr(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function dateStrToUtcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
}

export function diffDays(fromDateStr: string, toDateStr: string): number {
  const from = dateStrToUtcDate(fromDateStr).getTime();
  const to = dateStrToUtcDate(toDateStr).getTime();
  return Math.round((to - from) / (1000 * 60 * 60 * 24));
}

export function time24ToMinutes(time24: string): number {
  const [h, m] = time24.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime24(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatMinutesTo12Hour(totalMinutes: number): string {
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

export async function getOrCreateSettings(): Promise<IWebsiteSettings> {
  let settings = await WebsiteSettings.findOne({ key: 'default' });
  if (!settings) {
    settings = await WebsiteSettings.create({ key: 'default' });
  }
  return settings;
}

export function generateConfiguredSlots(settings: IWebsiteSettings): Array<{
  time24: string;
  label: string;
  startMinutes: number;
}> {
  const startMinutes = time24ToMinutes(settings.bookingStartTime || '15:00');
  const endMinutes = time24ToMinutes(settings.bookingEndTime || '20:00');
  const duration = Math.max(15, settings.bookingSlotDurationMinutes || 30);

  const list: Array<{ time24: string; label: string; startMinutes: number }> = [];
  for (let current = startMinutes; current + duration <= endMinutes; current += duration) {
    list.push({
      time24: minutesToTime24(current),
      label: formatMinutesTo12Hour(current),
      startMinutes: current,
    });
  }
  return list;
}

export async function getAvailableSlotsForDate(
  dateStr: string,
  nowOverride?: { dateStr: string; minutesSinceMidnight: number }
): Promise<AvailableSlotsResult> {
  const settings = await getOrCreateSettings();
  const timezone = settings.timezone || 'Asia/Dhaka';
  const now = nowOverride || getNowInTimezone(timezone);

  const dayOfWeek = getDayOfWeekFromDateStr(dateStr);
  const dayName = DAY_NAMES[dayOfWeek] || 'Unknown';
  const allowedDays = settings.availableDays?.length
    ? settings.availableDays
    : [0, 1, 2, 3, 4];

  const isAvailableDay = allowedDays.includes(dayOfWeek);
  const isPastDate = dateStr < now.dateStr;
  const daysAhead = diffDays(now.dateStr, dateStr);
  const maxDays = settings.maxAdvanceBookingDays || 60;
  const isTooFarAhead = daysAhead > maxDays;

  if (isPastDate) {
    return {
      date: dateStr,
      timezone,
      dayName,
      isAvailableDay,
      isPastDate: true,
      isTooFarAhead: false,
      message: 'Past dates are unavailable for booking.',
      slotDurationMinutes: settings.bookingSlotDurationMinutes,
      slots: [],
    };
  }

  if (!isAvailableDay) {
    return {
      date: dateStr,
      timezone,
      dayName,
      isAvailableDay: false,
      isPastDate: false,
      isTooFarAhead: false,
      message: `Consultations are closed on ${dayName}. Available days are Sunday through Thursday (3:00 PM – 8:00 PM).`,
      slotDurationMinutes: settings.bookingSlotDurationMinutes,
      slots: [],
    };
  }

  if (isTooFarAhead) {
    return {
      date: dateStr,
      timezone,
      dayName,
      isAvailableDay: true,
      isPastDate: false,
      isTooFarAhead: true,
      message: `Appointments can only be booked up to ${maxDays} days in advance.`,
      slotDurationMinutes: settings.bookingSlotDurationMinutes,
      slots: [],
    };
  }

  const configuredSlots = generateConfiguredSlots(settings);

  const activeBookings = await Appointment.find({
    appointmentDateStr: dateStr,
    status: { $in: ['Pending', 'Confirmed', 'Completed'] },
  })
    .select('appointmentTime')
    .lean();

  const bookedSet = new Set(activeBookings.map((b) => b.appointmentTime));
  const isToday = dateStr === now.dateStr;

  const slots: SlotItem[] = configuredSlots.map((slot) => {
    const isBooked = bookedSet.has(slot.label) || bookedSet.has(slot.time24);
    const isPastSlot = isToday && slot.startMinutes <= now.minutesSinceMidnight;

    if (isBooked) {
      return {
        time24: slot.time24,
        label: slot.label,
        available: false,
        reason: 'booked',
      };
    }

    if (isPastSlot) {
      return {
        time24: slot.time24,
        label: slot.label,
        available: false,
        reason: 'past',
      };
    }

    return {
      time24: slot.time24,
      label: slot.label,
      available: true,
    };
  });

  return {
    date: dateStr,
    timezone,
    dayName,
    isAvailableDay: true,
    isPastDate: false,
    isTooFarAhead: false,
    slotDurationMinutes: settings.bookingSlotDurationMinutes,
    slots,
  };
}

