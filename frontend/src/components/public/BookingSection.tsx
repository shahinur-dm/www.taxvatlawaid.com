'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Video,
} from 'lucide-react';
import { api, extractErrorMessage } from '@/lib/api';
import {
  AvailableSlotsResponse,
  BookingConfirmation,
  ConsultationMode,
  PublicSettings,
  SERVICE_CATEGORIES,
  ServiceCategory,
  WebsiteContentData,
} from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

const bookingFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Full name is required (min 2 characters)')
    .max(120, 'Name is too long'),
  phone: z
    .string()
    .regex(/^[+\d][\d\s-]{5,24}$/, 'Please enter a valid phone/WhatsApp number'),
  email: z
    .union([z.string().email('Enter a valid email address'), z.literal('')])
    .optional(),
  serviceCategory: z.enum([
    'Income Tax',
    'VAT & Tax',
    'Company Taxation',
    'Tax Return',
    'VAT Registration',
    'Legal Consultancy',
    'Business Compliance',
    'Other',
  ]),
  consultationMode: z.enum(['Chamber Visit', 'Video Call', 'Phone Call']),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select an appointment date'),
  appointmentTime: z.string().min(1, 'Please select an available time slot'),
  problemDescription: z.string().max(2000).optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingSectionProps {
  content: WebsiteContentData;
  settings: PublicSettings;
  preselectedCategory?: ServiceCategory;
}

function getDhakaTodayDateStr(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === 'year')?.value;
  const m = parts.find((p) => p.type === 'month')?.value;
  const d = parts.find((p) => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
}

function getUpcomingOpenDates(
  startDateStr: string,
  availableDays: number[],
  count = 5
): Array<{ dateStr: string; dayShort: string; label: string }> {
  const [y, m, d] = startDateStr.split('-').map(Number);
  const startUtc = Date.UTC(y, m - 1, d);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const results: Array<{ dateStr: string; dayShort: string; label: string }> = [];

  for (let offset = 0; offset < 21 && results.length < count; offset++) {
    const dt = new Date(startUtc + offset * 86400000);
    const dow = dt.getUTCDay();
    if (availableDays.includes(dow)) {
      const dateStr = dt.toISOString().slice(0, 10);
      results.push({
        dateStr,
        dayShort: days[dow],
        label: `${dt.getUTCDate()} ${months[dt.getUTCMonth()]}`,
      });
    }
  }
  return results;
}

export function BookingSection({
  content,
  settings,
  preselectedCategory,
}: BookingSectionProps) {
  const [activeMethod, setActiveMethod] = useState<'online' | 'direct' | 'visit'>('online');
  const todayDhaka = useMemo(() => getDhakaTodayDateStr(), []);
  const quickDates = useMemo(
    () =>
      getUpcomingOpenDates(
        todayDhaka,
        settings.availableDays?.length ? settings.availableDays : [0, 1, 2, 3, 4],
        5
      ),
    [todayDhaka, settings.availableDays]
  );

  const [slotsData, setSlotsData] = useState<AvailableSlotsResponse | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotFetchError, setSlotFetchError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const [lookupRef, setLookupRef] = useState('');
  const [lookupResult, setLookupResult] = useState<BookingConfirmation | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      serviceCategory: preselectedCategory || 'Income Tax',
      consultationMode: 'Chamber Visit',
      appointmentDate: quickDates[0]?.dateStr || todayDhaka,
      appointmentTime: '',
      problemDescription: '',
    },
  });

  useEffect(() => {
    if (preselectedCategory) {
      setValue('serviceCategory', preselectedCategory);
      setActiveMethod('online');
    }
  }, [preselectedCategory, setValue]);

  const selectedDate = watch('appointmentDate');
  const selectedTime = watch('appointmentTime');
  const selectedMode = watch('consultationMode');

  const fetchSlots = useCallback(
    async (dateStr: string) => {
      if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return;
      setLoadingSlots(true);
      setSlotFetchError(null);
      try {
        const res = await api.get<{ success: boolean; data: AvailableSlotsResponse }>(
          `/appointments/available-slots?date=${encodeURIComponent(dateStr)}`
        );
        const data = res.data.data;
        setSlotsData(data);
        const stillValid = data.slots.some(
          (s) => s.label === selectedTime && s.available
        );
        if (!stillValid) {
          setValue('appointmentTime', '');
        }
      } catch (err) {
        setSlotsData(null);
        setSlotFetchError(
          extractErrorMessage(err, 'Unable to load available time slots.')
        );
      } finally {
        setLoadingSlots(false);
      }
    },
    [selectedTime, setValue]
  );

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const res = await api.post<{
        success: boolean;
        message: string;
        appointment: BookingConfirmation;
      }>('/appointments', values);

      if (!res.data.success || !res.data.appointment) {
        throw new Error('Unexpected response from server.');
      }

      setConfirmation(res.data.appointment);
      toast.success(res.data.message);
      fetchSlots(values.appointmentDate);
    } catch (err) {
      const message = extractErrorMessage(
        err,
        'Could not complete your booking. Please try again.'
      );
      toast.error(message);
      fetchSlots(values.appointmentDate);
    }
  };

  const handleLookupReference = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = lookupRef.trim().toUpperCase();
    if (!trimmed) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);
    try {
      const res = await api.get<{
        success: boolean;
        appointment: BookingConfirmation;
      }>(`/appointments/reference/${encodeURIComponent(trimmed)}`);
      setLookupResult(res.data.appointment);
    } catch (err) {
      setLookupError(extractErrorMessage(err, 'Booking reference not found.'));
    } finally {
      setLookupLoading(false);
    }
  };

  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappBase = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  const buildWhatsappDispatchUrl = (slip: BookingConfirmation) => {
    const text = [
      `Assalamu Alaikum, TaxVat LawAid Chamber Desk`,
      `Booking Reference: ${slip.bookingReference}`,
      `Name: ${slip.customerName}`,
      `Service: ${slip.serviceCategory}`,
      `Mode: ${slip.consultationMode}`,
      `Date: ${slip.appointmentDate}`,
      `Time: ${slip.appointmentTime} (Asia/Dhaka)`,
      `Status: ${slip.status}`,
    ].join('\n');
    return `${whatsappBase}?text=${encodeURIComponent(text)}`;
  };

  const buildEmailDispatchUrl = (slip: BookingConfirmation) => {
    const subject = `Appointment Request [${slip.bookingReference}] - ${slip.customerName}`;
    const body = [
      `Booking Reference: ${slip.bookingReference}`,
      `Name: ${slip.customerName}`,
      `Phone: ${slip.phone || ''}`,
      `Service Category: ${slip.serviceCategory}`,
      `Consultation Mode: ${slip.consultationMode}`,
      `Preferred Date: ${slip.appointmentDate}`,
      `Time Slot: ${slip.appointmentTime}`,
      `Status: ${slip.status}`,
    ].join('\n');
    return `mailto:${content.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="booking" className="py-20 sm:py-24 bg-ivory-100 border-y border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                <Calendar className="h-4 w-4" />
                <span>Client Appointment Desk</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-midnight-900 tracking-tight mb-3">
                Schedule Your Legal Consultation
              </h2>
              <p className="text-charcoal-600 text-base leading-relaxed">
                Reserve a real-time consultation slot for Chamber Visit, Video Call, or Phone Call during our chamber hours (Sunday – Thursday, 3:00 PM – 8:00 PM BST).
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Refined 3-Step Chamber Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: '01',
              title: 'Choose Intake Method',
              desc: 'Submit your live slot online, message WhatsApp / Call directly, or request an in-person Ramna chamber visit.',
            },
            {
              step: '02',
              title: 'Select Slot & Consultation Mode',
              desc: 'Pick an open Sunday–Thursday slot (3:00 PM – 8:00 PM Asia/Dhaka) and choose Chamber Visit, Video, or Phone Call.',
            },
            {
              step: '03',
              title: 'Receive Reference & Dispatch',
              desc: 'Get an immediate Booking Reference Slip (Status: Pending) with one-click WhatsApp & Email chamber notification.',
            },
          ].map((card) => (
            <div
              key={card.step}
              className="rounded-lg border border-ivory-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="font-serif text-xl font-semibold text-champagne-600 tabular-nums">
                  {card.step}
                </span>
                <h3 className="font-semibold text-midnight-900 text-sm sm:text-base">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Intake Container */}
        <div className="rounded-lg border border-ivory-300 bg-white p-5 sm:p-8 shadow-lg shadow-midnight-900/5">
          {/* Method Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setActiveMethod('online')}
              className={`text-left rounded-lg p-4 border transition-all ${
                activeMethod === 'online'
                  ? 'border-midnight-900 bg-midnight-900 text-white shadow-md'
                  : 'border-ivory-300 bg-ivory-50 text-midnight-900 hover:border-champagne-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10.5px] font-bold uppercase tracking-[0.16em] ${
                    activeMethod === 'online' ? 'text-champagne-400' : 'text-champagne-700'
                  }`}
                >
                  Method 01 · Online Desk
                </span>
                <Calendar
                  className={`h-4 w-4 ${
                    activeMethod === 'online' ? 'text-champagne-400' : 'text-midnight-900'
                  }`}
                />
              </div>
              <div className="font-semibold text-sm sm:text-base">
                Quick Online Booking Slip
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  activeMethod === 'online' ? 'text-ivory-200/80' : 'text-charcoal-500'
                }`}
              >
                Real-time slot lock &amp; reference generation
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('direct')}
              className={`text-left rounded-lg p-4 border transition-all ${
                activeMethod === 'direct'
                  ? 'border-midnight-900 bg-midnight-900 text-white shadow-md'
                  : 'border-ivory-300 bg-ivory-50 text-midnight-900 hover:border-champagne-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10.5px] font-bold uppercase tracking-[0.16em] ${
                    activeMethod === 'direct' ? 'text-champagne-400' : 'text-champagne-700'
                  }`}
                >
                  Method 02 · Direct Line
                </span>
                <MessageCircle
                  className={`h-4 w-4 ${
                    activeMethod === 'direct' ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                />
              </div>
              <div className="font-semibold text-sm sm:text-base">
                Direct Phone &amp; WhatsApp
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  activeMethod === 'direct' ? 'text-ivory-200/80' : 'text-charcoal-500'
                }`}
              >
                Immediate urgent hearing or notice coordination
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('visit')}
              className={`text-left rounded-lg p-4 border transition-all ${
                activeMethod === 'visit'
                  ? 'border-midnight-900 bg-midnight-900 text-white shadow-md'
                  : 'border-ivory-300 bg-ivory-50 text-midnight-900 hover:border-champagne-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10.5px] font-bold uppercase tracking-[0.16em] ${
                    activeMethod === 'visit' ? 'text-champagne-400' : 'text-champagne-700'
                  }`}
                >
                  Method 03 · In-Person
                </span>
                <Building2
                  className={`h-4 w-4 ${
                    activeMethod === 'visit' ? 'text-champagne-400' : 'text-midnight-900'
                  }`}
                />
              </div>
              <div className="font-semibold text-sm sm:text-base">Ramna Chamber Visit</div>
              <div
                className={`text-xs mt-0.5 ${
                  activeMethod === 'visit' ? 'text-ivory-200/80' : 'text-charcoal-500'
                }`}
              >
                Address, chamber hours &amp; document checklist
              </div>
            </button>
          </div>

          {activeMethod === 'online' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Booking Form / Request Receipt */}
              <div className="lg:col-span-7">
                {confirmation ? (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-emerald-950 text-base">
                          Your appointment request has been submitted successfully!
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                          Keep your Booking Reference below. Your request is currently{' '}
                          <strong>{confirmation.status}</strong> awaiting chamber desk verification and confirmation.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-ivory-300 bg-ivory-50 p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-ivory-300">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-500">
                            Booking Reference
                          </div>
                          <div className="font-serif text-2xl font-semibold text-midnight-900 tracking-wide">
                            {confirmation.bookingReference}
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded bg-champagne-100 border border-champagne-300 text-champagne-700 text-xs font-bold">
                          Status: {confirmation.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-charcoal-500">Client Name</div>
                          <div className="font-semibold text-midnight-900">
                            {confirmation.customerName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-charcoal-500">Service Category</div>
                          <div className="font-semibold text-midnight-900">
                            {confirmation.serviceCategory}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-charcoal-500">Appointment Date</div>
                          <div className="font-semibold text-midnight-900">
                            {confirmation.appointmentDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-charcoal-500">
                            Appointment Time (Asia/Dhaka)
                          </div>
                          <div className="font-semibold text-midnight-900">
                            {confirmation.appointmentTime}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-charcoal-500">Consultation Mode</div>
                          <div className="font-semibold text-midnight-900">
                            {confirmation.consultationMode}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {settings.whatsappDispatchEnabled && (
                        <a
                          href={buildWhatsappDispatchUrl(confirmation)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2.5 rounded text-sm transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Send Slip via WhatsApp</span>
                        </a>
                      )}
                      <a
                        href={buildEmailDispatchUrl(confirmation)}
                        className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-4 py-2.5 rounded text-sm transition-colors"
                      >
                        <Mail className="h-4 w-4 text-champagne-400" />
                        <span>Send via Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmation(null);
                          reset({
                            customerName: '',
                            phone: '',
                            email: '',
                            serviceCategory: confirmation.serviceCategory,
                            consultationMode: 'Chamber Visit',
                            appointmentDate: quickDates[0]?.dateStr || todayDhaka,
                            appointmentTime: '',
                            problemDescription: '',
                          });
                        }}
                        className="inline-flex items-center gap-2 border border-ivory-300 hover:bg-ivory-100 text-midnight-900 font-semibold px-4 py-2.5 rounded text-sm transition-colors"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="pb-3 border-b border-ivory-200">
                      <h3 className="font-serif text-2xl font-semibold text-midnight-900">
                        Consultation Request Form
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                        Open Sunday – Thursday, 3:00 PM – 8:00 PM (Asia/Dhaka).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="customerName"
                          className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5"
                        >
                          Full Name / Company *
                        </label>
                        <input
                          id="customerName"
                          type="text"
                          placeholder="e.g., Md. Mahmudul Hasan"
                          {...register('customerName')}
                          className="w-full rounded border border-ivory-300 bg-ivory-50/40 px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 focus:bg-white outline-none transition-colors"
                        />
                        {errors.customerName && (
                          <p className="text-xs text-brandRed-600 mt-1">
                            {errors.customerName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="e.g., 017XX-XXXXXX"
                          {...register('phone')}
                          className="w-full rounded border border-ivory-300 bg-ivory-50/40 px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 focus:bg-white outline-none transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-xs text-brandRed-600 mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="serviceCategory"
                          className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5"
                        >
                          Service Category *
                        </label>
                        <select
                          id="serviceCategory"
                          {...register('serviceCategory')}
                          className="w-full rounded border border-ivory-300 px-3.5 py-2.5 text-sm text-midnight-900 bg-white focus:border-midnight-900 outline-none"
                        >
                          {SERVICE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        {errors.serviceCategory && (
                          <p className="text-xs text-brandRed-600 mt-1">
                            {errors.serviceCategory.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="e.g., name@company.com"
                          {...register('email')}
                          className="w-full rounded border border-ivory-300 bg-ivory-50/40 px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 focus:bg-white outline-none transition-colors"
                        />
                        {errors.email && (
                          <p className="text-xs text-brandRed-600 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Consultation Mode */}
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                        Consultation Mode *
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {(
                          [
                            { mode: 'Chamber Visit', icon: Building2 },
                            { mode: 'Video Call', icon: Video },
                            { mode: 'Phone Call', icon: Phone },
                          ] as Array<{ mode: ConsultationMode; icon: React.ElementType }>
                        ).map(({ mode, icon: Icon }) => {
                          const active = selectedMode === mode;
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setValue('consultationMode', mode)}
                              className={`flex flex-col items-center justify-center gap-1 rounded border py-2.5 px-2 text-xs font-semibold transition-all ${
                                active
                                  ? 'border-midnight-900 bg-midnight-900 text-white'
                                  : 'border-ivory-300 bg-ivory-50 text-charcoal-700 hover:border-champagne-500'
                              }`}
                            >
                              <Icon
                                className={`h-4 w-4 ${
                                  active ? 'text-champagne-400' : 'text-midnight-900'
                                }`}
                              />
                              <span>{mode}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <label
                          htmlFor="appointmentDate"
                          className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900"
                        >
                          Appointment Date (Sun–Thu) *
                        </label>
                        <span className="text-[11px] text-charcoal-500">
                          Timezone: {settings.timezone}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {quickDates.map((qd) => (
                          <button
                            key={qd.dateStr}
                            type="button"
                            onClick={() =>
                              setValue('appointmentDate', qd.dateStr, {
                                shouldValidate: true,
                              })
                            }
                            className={`px-3 py-1.5 rounded border text-xs font-semibold transition-all ${
                              selectedDate === qd.dateStr
                                ? 'bg-midnight-900 text-white border-midnight-900'
                                : 'bg-ivory-100 text-midnight-900 border-ivory-300 hover:border-champagne-500'
                            }`}
                          >
                            {qd.dayShort}, {qd.label}
                          </button>
                        ))}
                      </div>

                      <input
                        id="appointmentDate"
                        type="date"
                        min={todayDhaka}
                        {...register('appointmentDate')}
                        className="w-full rounded border border-ivory-300 px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                      />
                      {errors.appointmentDate && (
                        <p className="text-xs text-brandRed-600 mt-1">
                          {errors.appointmentDate.message}
                        </p>
                      )}
                    </div>

                    {/* Available Time Slots */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900">
                          Available Time Slot (3:00 PM – 8:00 PM) *
                        </span>
                        {slotsData && (
                          <span className="text-[11px] font-medium text-charcoal-500">
                            {slotsData.dayName} • {slotsData.slotDurationMinutes} min/slot
                          </span>
                        )}
                      </div>

                      {loadingSlots ? (
                        <div className="flex items-center gap-2 text-xs text-charcoal-500 py-4">
                          <Loader2 className="h-4 w-4 animate-spin text-midnight-900" />
                          <span>Checking live slot availability...</span>
                        </div>
                      ) : slotFetchError ? (
                        <div className="rounded border border-brandRed-200 bg-brandRed-50 p-3 text-xs text-brandRed-700">
                          {slotFetchError}
                        </div>
                      ) : slotsData &&
                        (!slotsData.isAvailableDay ||
                          slotsData.isPastDate ||
                          slotsData.isTooFarAhead) ? (
                        <div className="rounded border border-champagne-300 bg-champagne-100/60 p-3 text-xs font-medium text-midnight-900">
                          {slotsData.message ||
                            'Selected date is unavailable. Please choose Sunday through Thursday.'}
                        </div>
                      ) : slotsData && slotsData.slots.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                          {slotsData.slots.map((slot) => {
                            const isSelected = selectedTime === slot.label;
                            return (
                              <button
                                key={slot.time24}
                                type="button"
                                disabled={!slot.available}
                                onClick={() =>
                                  setValue('appointmentTime', slot.label, {
                                    shouldValidate: true,
                                  })
                                }
                                className={`rounded border px-2 py-2 text-xs font-semibold transition-all text-center ${
                                  !slot.available
                                    ? 'bg-ivory-200/60 border-ivory-300 text-charcoal-500/60 cursor-not-allowed line-through'
                                    : isSelected
                                      ? 'bg-champagne-500 border-champagne-600 text-midnight-950 shadow-sm'
                                      : 'bg-white border-ivory-300 text-midnight-900 hover:border-midnight-900'
                                }`}
                                title={
                                  slot.available
                                    ? `Select ${slot.label}`
                                    : slot.reason === 'booked'
                                      ? 'Already booked'
                                      : 'Past time slot'
                                }
                              >
                                <div>{slot.label}</div>
                                {!slot.available && (
                                  <div className="text-[10px] no-underline font-normal">
                                    {slot.reason === 'booked' ? 'Booked' : 'Passed'}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs text-charcoal-500 py-2">
                          No slots configured for this date.
                        </div>
                      )}
                      {errors.appointmentTime && (
                        <p className="text-xs text-brandRed-600 mt-1">
                          {errors.appointmentTime.message}
                        </p>
                      )}
                    </div>

                    {/* Problem Description */}
                    <div>
                      <label
                        htmlFor="problemDescription"
                        className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5"
                      >
                        Problem Description (Optional)
                      </label>
                      <textarea
                        id="problemDescription"
                        rows={3}
                        placeholder="Mention if you received an NBR notice, need new company registration, VAT/BIN assistance, or have a tribunal hearing..."
                        {...register('problemDescription')}
                        className="w-full rounded border border-ivory-300 bg-ivory-50/40 px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 focus:bg-white outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-midnight-900 hover:bg-midnight-800 disabled:opacity-60 text-white font-semibold py-3.5 px-6 rounded shadow-md transition-all text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 text-champagne-400" />
                          <span>Generate Appointment Slip &amp; Submit Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Midnight Info Panel + Reference Tracker */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-midnight-900 text-white rounded-lg p-7 border border-champagne-500/30 space-y-5">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne-400" />
                    <span>Chamber Intake Protocol</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-white">
                    What Happens After You Submit?
                  </h3>

                  <ul className="space-y-4 text-sm text-ivory-200/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-champagne-400 shrink-0 mt-0.5" />
                      <span>
                        You receive an immediate <strong className="text-white">Booking Reference Slip</strong> on screen and your slot is reserved in real time (initially <strong className="text-white">Pending</strong> verification).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-champagne-400 shrink-0 mt-0.5" />
                      <span>
                        One click forwards your pre-formatted slip directly to our{' '}
                        <strong className="text-white">WhatsApp ({content.contactWhatsapp})</strong> or{' '}
                        <strong className="text-white">Email ({content.contactEmail})</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-champagne-400 shrink-0 mt-0.5" />
                      <span>
                        Advocate {content.leadCounselName}&apos;s chamber desk confirms your appointment slot and advises on documents to bring or share.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-white/15 text-xs sm:text-sm text-ivory-200/80">
                    Need urgent statutory notice assistance? Call{' '}
                    <a
                      href={`tel:${content.contactPhone}`}
                      className="font-semibold text-champagne-300 underline"
                    >
                      {content.contactPhone}
                    </a>{' '}
                    directly.
                  </div>
                </div>

                {/* Track Existing Booking Reference */}
                <div className="bg-ivory-100 rounded-lg border border-ivory-300 p-6">
                  <h4 className="font-serif text-lg font-semibold text-midnight-900 mb-1">
                    Check Existing Booking Status
                  </h4>
                  <p className="text-xs text-charcoal-500 mb-3">
                    Enter your Booking Reference (e.g., TVLA-20261115-A1B2C3)
                  </p>
                  <form onSubmit={handleLookupReference} className="flex gap-2">
                    <input
                      type="text"
                      value={lookupRef}
                      onChange={(e) => setLookupRef(e.target.value)}
                      placeholder="TVLA-..."
                      className="flex-1 rounded border border-ivory-300 bg-white px-3 py-2 text-xs sm:text-sm uppercase focus:border-midnight-900 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={lookupLoading}
                      className="inline-flex items-center gap-1.5 bg-midnight-900 hover:bg-midnight-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded"
                    >
                      {lookupLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4 text-champagne-400" />
                      )}
                      <span>Check</span>
                    </button>
                  </form>

                  {lookupError && (
                    <p className="text-xs text-brandRed-600 mt-2">{lookupError}</p>
                  )}

                  {lookupResult && (
                    <div className="mt-3 rounded bg-white border border-ivory-300 p-3.5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-midnight-900">
                          {lookupResult.bookingReference}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-champagne-100 text-champagne-700 font-bold">
                          {lookupResult.status}
                        </span>
                      </div>
                      <div className="text-charcoal-700 font-medium">
                        {lookupResult.customerName} • {lookupResult.serviceCategory}
                      </div>
                      <div className="text-charcoal-500">
                        {lookupResult.appointmentDate} at {lookupResult.appointmentTime} (
                        {lookupResult.consultationMode})
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeMethod === 'direct' && (
            <div className="rounded-lg border border-ivory-300 bg-ivory-50 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-700">
                  Direct Chamber Coordination
                </span>
                <h3 className="font-serif text-2xl font-semibold text-midnight-900">
                  Call or Message Our Chamber Directly
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  For urgent NBR notices, tribunal dates, customs release matters, or immediate inquiries, contact our chamber desk directly during consultation hours ({settings.officeHoursText}).
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`tel:${content.contactPhone}`}
                    className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-3 rounded text-sm"
                  >
                    <Phone className="h-4 w-4 text-champagne-400" />
                    <span>Call {content.contactPhone}</span>
                  </a>
                  <a
                    href={`${whatsappBase}?text=${encodeURIComponent('Assalamu Alaikum, I would like to book a legal/tax consultation with TaxVat LawAid.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-3 rounded text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp {content.contactWhatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-lg bg-white border border-ivory-300 p-6 space-y-3 text-sm">
                <h4 className="font-serif text-lg font-semibold text-midnight-900">
                  What to Mention in Your Message
                </h4>
                <ul className="space-y-2 text-charcoal-600 list-disc pl-5">
                  <li>Your Full Name / Company Name</li>
                  <li>Matter Type (Income Tax, VAT, Customs, RJSC, IP, or Litigation)</li>
                  <li>Preferred Date &amp; Time (Sunday–Thursday, 3:00 PM – 8:00 PM)</li>
                  <li>Whether you prefer Chamber Visit, Video Call, or Phone Call</li>
                </ul>
              </div>
            </div>
          )}

          {activeMethod === 'visit' && (
            <div className="rounded-lg border border-ivory-300 bg-ivory-50 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-700">
                  In-Person Consultation
                </span>
                <h3 className="font-serif text-2xl font-semibold text-midnight-900">
                  Visit Our Chamber in Ramna, Dhaka
                </h3>
                <div className="space-y-3 text-sm text-charcoal-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-midnight-900">Chamber Address</div>
                      <div>{content.officeAddress}, Bangladesh</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-midnight-900">Consultation Hours</div>
                      <div>{settings.officeHoursText}</div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setValue('consultationMode', 'Chamber Visit');
                    setActiveMethod('online');
                  }}
                  className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-2.5 rounded text-sm"
                >
                  <Calendar className="h-4 w-4 text-champagne-400" />
                  <span>Reserve a Chamber Visit Slot</span>
                </button>
              </div>

              <div className="rounded-lg bg-white border border-ivory-300 p-6 space-y-3 text-sm">
                <h4 className="font-serif text-lg font-semibold text-midnight-900">
                  Recommended Documents to Bring
                </h4>
                <ul className="space-y-2 text-charcoal-600 list-disc pl-5">
                  <li>NID / Passport and company authorisation letter (if applicable)</li>
                  <li>TIN, 13-digit BIN, RJSC incorporation &amp; trade licence copies</li>
                  <li>Any impugned notice, assessment order, FIR, contract, or deed</li>
                  <li>Prior tax/VAT returns, challans, and relevant bank statements</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
