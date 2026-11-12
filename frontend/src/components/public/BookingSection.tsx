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

  // Reference tracker state
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
        // Reset selected time if it is no longer available
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
      // Refresh slots in case of concurrent 409 conflict
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
    <section id="booking" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How to Book Your Consultation Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandRed-50 border border-brandRed-100 text-brandRed-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="h-3.5 w-3.5" />
            <span>Client Appointment Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight mb-3">
            How to Book Your Consultation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We keep booking simple and transparent. Follow the 3-step guide below and choose whichever booking method is most convenient for you.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-7 w-7 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-navy-800">Choose Booking Method</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Book via our <strong>Instant Online Form</strong>, tap to message on{' '}
              <strong>WhatsApp / Call</strong>, or plan a <strong>Direct Chamber Visit</strong> in Ramna, Dhaka.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-7 w-7 rounded-full bg-brandGreen-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-navy-800">Pick Slot &amp; Matter Type</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select an available slot (<strong>Sun–Thu, 3:00 PM – 8:00 PM</strong>) and choose{' '}
              <strong>Chamber Visit</strong>, <strong>Video Call</strong>, or <strong>Phone Call</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-7 w-7 rounded-full bg-brandRed-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-navy-800">Get Reference &amp; Checklist</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Receive an immediate <strong>Booking Reference</strong> and our chamber desk confirms your time slot and exact documents (e.g., TIN, BIN, notice, or deed).
            </p>
          </div>
        </div>

        {/* Main 3-Method Booking Container */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6 lg:p-8 shadow-sm">
          {/* Method Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveMethod('online')}
              className={`text-left rounded-xl p-4 border-2 transition-all bg-white ${
                activeMethod === 'online'
                  ? 'border-navy-800 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandRed-600">
                  Method 1 • Recommended
                </span>
                <Calendar className="h-4 w-4 text-navy-800" />
              </div>
              <div className="font-bold text-navy-800 text-base">
                Quick Online Booking Slip
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Reserve real-time slot &amp; generate slip
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('direct')}
              className={`text-left rounded-xl p-4 border-2 transition-all bg-white ${
                activeMethod === 'direct'
                  ? 'border-navy-800 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandGreen-600">
                  Method 2 • Fastest
                </span>
                <MessageCircle className="h-4 w-4 text-brandGreen-600" />
              </div>
              <div className="font-bold text-navy-800 text-base">
                Direct Phone &amp; WhatsApp
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                One-tap call or WhatsApp inquiry
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('visit')}
              className={`text-left rounded-xl p-4 border-2 transition-all bg-white ${
                activeMethod === 'visit'
                  ? 'border-navy-800 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy-700">
                  Method 3 • In-Person
                </span>
                <Building2 className="h-4 w-4 text-navy-800" />
              </div>
              <div className="font-bold text-navy-800 text-base">
                Ramna Chamber Visit
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Address, chamber hours &amp; checklist
              </div>
            </button>
          </div>

          {/* Method 1: Online Booking Form + Right Navy Info Panel */}
          {activeMethod === 'online' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Form / Confirmation Card */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                {confirmation ? (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-brandGreen-50 border border-brandGreen-200 p-4 flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brandGreen-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-brandGreen-800 text-base">
                          Your appointment request has been submitted successfully!
                        </h3>
                        <p className="text-xs sm:text-sm text-brandGreen-700 mt-1">
                          Save your Booking Reference below. Our chamber desk will verify and confirm your consultation.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                        <div>
                          <div className="text-xs uppercase font-semibold text-slate-500">
                            Booking Reference
                          </div>
                          <div className="text-xl font-extrabold text-navy-800 tracking-wide">
                            {confirmation.bookingReference}
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                          Status: {confirmation.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-slate-500">Customer Name</div>
                          <div className="font-semibold text-slate-900">
                            {confirmation.customerName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Service Category</div>
                          <div className="font-semibold text-slate-900">
                            {confirmation.serviceCategory}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Appointment Date</div>
                          <div className="font-semibold text-slate-900">
                            {confirmation.appointmentDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">
                            Appointment Time (Asia/Dhaka)
                          </div>
                          <div className="font-semibold text-slate-900">
                            {confirmation.appointmentTime}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Consultation Mode</div>
                          <div className="font-semibold text-slate-900">
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
                          className="inline-flex items-center gap-2 bg-brandGreen-600 hover:bg-brandGreen-700 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Send Slip via WhatsApp</span>
                        </a>
                      )}
                      <a
                        href={buildEmailDispatchUrl(confirmation)}
                        className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
                      >
                        <Mail className="h-4 w-4" />
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
                        className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div>
                      <h3 className="text-xl font-bold text-navy-800">
                        Fill in Your Appointment Details
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Simple 1-minute booking. Open Sunday – Thursday, 3:00 PM – 8:00 PM (Asia/Dhaka).
                      </p>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="customerName"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="customerName"
                          type="text"
                          placeholder="e.g., Md. Mahmudul Hasan"
                          {...register('customerName')}
                          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
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
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="e.g., 017XX-XXXXXX"
                          {...register('phone')}
                          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
                        />
                        {errors.phone && (
                          <p className="text-xs text-brandRed-600 mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email (Optional) & Service Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="serviceCategory"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Service Category *
                        </label>
                        <select
                          id="serviceCategory"
                          {...register('serviceCategory')}
                          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
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
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="e.g., name@company.com"
                          {...register('email')}
                          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
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
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
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
                              className={`flex flex-col items-center justify-center gap-1 rounded-lg border py-2.5 px-2 text-xs font-semibold transition-all ${
                                active
                                  ? 'border-navy-800 bg-navy-50 text-navy-800'
                                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{mode}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Appointment Date */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <label
                          htmlFor="appointmentDate"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                        >
                          Appointment Date (Sun–Thu) *
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Timezone: {settings.timezone}
                        </span>
                      </div>

                      {/* Quick open-day pills */}
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
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                              selectedDate === qd.dateStr
                                ? 'bg-navy-800 text-white border-navy-800'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-navy-600'
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
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
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
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Available Time Slot (3:00 PM – 8:00 PM) *
                        </span>
                        {slotsData && (
                          <span className="text-[11px] font-medium text-slate-500">
                            {slotsData.dayName} • {slotsData.slotDurationMinutes} min/slot
                          </span>
                        )}
                      </div>

                      {loadingSlots ? (
                        <div className="flex items-center gap-2 text-xs text-slate-500 py-4">
                          <Loader2 className="h-4 w-4 animate-spin text-navy-800" />
                          <span>Checking live slot availability...</span>
                        </div>
                      ) : slotFetchError ? (
                        <div className="rounded-lg border border-brandRed-200 bg-brandRed-50 p-3 text-xs text-brandRed-700">
                          {slotFetchError}
                        </div>
                      ) : slotsData && (!slotsData.isAvailableDay || slotsData.isPastDate || slotsData.isTooFarAhead) ? (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-800">
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
                                className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all text-center ${
                                  !slot.available
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                                    : isSelected
                                      ? 'bg-brandRed-600 border-brandRed-600 text-white shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-800 hover:border-navy-800 hover:text-navy-800'
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
                        <div className="text-xs text-slate-500 py-2">
                          No slots configured for this date.
                        </div>
                      )}
                      {errors.appointmentTime && (
                        <p className="text-xs text-brandRed-600 mt-1">
                          {errors.appointmentTime.message}
                        </p>
                      )}
                    </div>

                    {/* Brief Note / Problem Description (Optional) */}
                    <div>
                      <label
                        htmlFor="problemDescription"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                      >
                        Problem Description (Optional)
                      </label>
                      <textarea
                        id="problemDescription"
                        rows={3}
                        placeholder="Mention if you received an NBR notice, need new company registration, VAT/BIN help, or have a tribunal date..."
                        {...register('problemDescription')}
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-lg shadow-sm transition-all text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" />
                          <span>Generate Appointment Slip &amp; Submit Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Navy Info Panel + Reference Tracker */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-navy-800 text-white rounded-xl p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="inline-flex items-center px-3 py-1 rounded-md bg-lime-400 text-navy-950 text-xs font-bold">
                    Instant Dispatch Enabled
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    What Happens After You Submit?
                  </h3>

                  <ul className="space-y-4 text-sm text-slate-200">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brandGreen-500 shrink-0 mt-0.5" />
                      <span>
                        You receive an immediate <strong>Booking Reference Slip</strong> on screen and your slot is reserved in our system.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brandGreen-500 shrink-0 mt-0.5" />
                      <span>
                        One click sends your pre-formatted request directly to our{' '}
                        <strong>WhatsApp ({content.contactWhatsapp})</strong> or{' '}
                        <strong>Email ({content.contactEmail})</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brandGreen-500 shrink-0 mt-0.5" />
                      <span>
                        Advocate {content.leadCounselName}&apos;s desk confirms your slot and document checklist.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-navy-700 text-xs sm:text-sm text-slate-300">
                    Need urgent assistance right now? Call{' '}
                    <a
                      href={`tel:${content.contactPhone}`}
                      className="font-bold text-white underline"
                    >
                      {content.contactPhone}
                    </a>{' '}
                    directly.
                  </div>
                </div>

                {/* Track Existing Booking Reference */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h4 className="font-bold text-navy-800 text-sm mb-1">
                    Check Existing Booking Status
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Enter your Booking Reference (e.g., TVLA-20261115-A1B2C3)
                  </p>
                  <form onSubmit={handleLookupReference} className="flex gap-2">
                    <input
                      type="text"
                      value={lookupRef}
                      onChange={(e) => setLookupRef(e.target.value)}
                      placeholder="TVLA-..."
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm uppercase focus:border-navy-800 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={lookupLoading}
                      className="inline-flex items-center gap-1.5 bg-navy-800 hover:bg-navy-900 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg"
                    >
                      {lookupLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span>Check</span>
                    </button>
                  </form>

                  {lookupError && (
                    <p className="text-xs text-brandRed-600 mt-2">{lookupError}</p>
                  )}

                  {lookupResult && (
                    <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-800">
                          {lookupResult.bookingReference}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-navy-100 text-navy-800 font-bold">
                          {lookupResult.status}
                        </span>
                      </div>
                      <div className="text-slate-700">
                        {lookupResult.customerName} • {lookupResult.serviceCategory}
                      </div>
                      <div className="text-slate-500">
                        {lookupResult.appointmentDate} at {lookupResult.appointmentTime} (
                        {lookupResult.consultationMode})
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Method 2: Direct Phone & WhatsApp */}
          {activeMethod === 'direct' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-brandGreen-50 text-brandGreen-700 text-xs font-bold">
                  Fastest Direct Desk
                </span>
                <h3 className="text-2xl font-bold text-navy-800">
                  Call or Message Our Chamber Directly
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For urgent NBR notices, tribunal dates, customs release issues, or immediate guidance, contact our chamber desk directly during consultation hours ({settings.officeHoursText}).
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`tel:${content.contactPhone}`}
                    className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-semibold px-5 py-3 rounded-lg text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call {content.contactPhone}</span>
                  </a>
                  <a
                    href={`${whatsappBase}?text=${encodeURIComponent('Assalamu Alaikum, I would like to book a legal/tax consultation with TaxVat LawAid.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brandGreen-600 hover:bg-brandGreen-700 text-white font-semibold px-5 py-3 rounded-lg text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp {content.contactWhatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-3 text-sm">
                <h4 className="font-bold text-navy-800">
                  What to Mention in Your Message
                </h4>
                <ul className="space-y-2 text-slate-600 list-disc pl-5">
                  <li>Your Full Name / Company Name</li>
                  <li>Matter Type (Income Tax, VAT, Customs, RJSC, IP, or Litigation)</li>
                  <li>Preferred Date &amp; Time (Sunday–Thursday, 3:00 PM – 8:00 PM)</li>
                  <li>Whether you prefer Chamber Visit, Video Call, or Phone Call</li>
                </ul>
              </div>
            </div>
          )}

          {/* Method 3: Ramna Chamber Visit */}
          {activeMethod === 'visit' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold">
                  In-Person Consultation
                </span>
                <h3 className="text-2xl font-bold text-navy-800">
                  Visit Our Chamber in Ramna, Dhaka
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-5 w-5 text-brandRed-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-navy-800">Chamber Address</div>
                      <div>{content.officeAddress}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-5 w-5 text-brandGreen-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-navy-800">Consultation Hours</div>
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
                  className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Reserve a Chamber Visit Slot</span>
                </button>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-3 text-sm">
                <h4 className="font-bold text-navy-800">Recommended Documents to Bring</h4>
                <ul className="space-y-2 text-slate-600 list-disc pl-5">
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

