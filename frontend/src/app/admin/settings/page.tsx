'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Loader2, Megaphone, Save } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { FALLBACK_SETTINGS } from '@/lib/defaults';
import { PublicSettings } from '@/types';

const DAY_LABELS = [
  { day: 0, label: 'Sunday' },
  { day: 1, label: 'Monday' },
  { day: 2, label: 'Tuesday' },
  { day: 3, label: 'Wednesday' },
  { day: 4, label: 'Thursday' },
  { day: 5, label: 'Friday' },
  { day: 6, label: 'Saturday' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PublicSettings>(FALLBACK_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<{ success: boolean; data: PublicSettings }>(
          '/admin/settings'
        );
        setSettings({ ...FALLBACK_SETTINGS, ...res.data.data });
      } catch (err) {
        toast.error(extractErrorMessage(err, 'Failed to load settings.'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleDay = (dayIndex: number) => {
    const exists = settings.availableDays.includes(dayIndex);
    const updated = exists
      ? settings.availableDays.filter((d) => d !== dayIndex)
      : [...settings.availableDays, dayIndex].sort((a, b) => a - b);
    setSettings({ ...settings, availableDays: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.availableDays.length === 0) {
      toast.error('Please select at least one available consultation day.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        announcementEnabled: settings.announcementEnabled,
        announcementText: settings.announcementText,
        bookingSlotDurationMinutes: Number(settings.bookingSlotDurationMinutes),
        bookingStartTime: settings.bookingStartTime,
        bookingEndTime: settings.bookingEndTime,
        availableDays: settings.availableDays,
        timezone: settings.timezone,
        maxAdvanceBookingDays: Number(settings.maxAdvanceBookingDays),
        officeHoursText: settings.officeHoursText,
        whatsappDispatchEnabled: settings.whatsappDispatchEnabled,
      };
      const res = await api.patch<{
        success: boolean;
        data: PublicSettings;
      }>('/admin/settings', payload);
      setSettings({ ...FALLBACK_SETTINGS, ...res.data.data });
      toast.success('Settings updated and applied to public website!');
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to update settings.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell
      title="Settings & ON PROGRESS Announcement"
      subtitle="Control the public ON PROGRESS banner and configure appointment slot rules"
    >
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-navy-800" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* ON PROGRESS Announcement Control */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Megaphone className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-navy-800">
                    ON PROGRESS Website Announcement Banner
                  </h2>
                  <p className="text-xs text-slate-500">
                    Non-blocking top notice controlled live without editing code
                  </p>
                </div>
              </div>

              <label className="inline-flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.announcementEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      announcementEnabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-navy-800"
                />
                <span className="text-sm font-bold text-navy-800">
                  {settings.announcementEnabled ? 'Banner Enabled' : 'Banner Disabled'}
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Announcement Message Text
              </label>
              <input
                type="text"
                required
                value={settings.announcementText}
                onChange={(e) =>
                  setSettings({ ...settings, announcementText: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            {/* Live Preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-slate-400">
                Public Banner Preview
              </span>
              {settings.announcementEnabled ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-950 rounded-lg px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                  <span className="font-medium">{settings.announcementText}</span>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 px-4 py-2.5 text-xs text-slate-400">
                  Banner is currently hidden on the public website.
                </div>
              )}
            </div>
          </div>

          {/* Booking Schedule Configuration */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <span className="h-9 w-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-base font-extrabold text-navy-800">
                  Appointment Schedule &amp; Slot Configuration
                </h2>
                <p className="text-xs text-slate-500">
                  Configure consultation duration, open days, and hours ({settings.timezone})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Slot Duration (Mins)
                </label>
                <select
                  value={settings.bookingSlotDurationMinutes}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bookingSlotDurationMinutes: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                >
                  <option value={15}>15 Minutes</option>
                  <option value={20}>20 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Start Time (24h)
                </label>
                <input
                  type="time"
                  value={settings.bookingStartTime}
                  onChange={(e) =>
                    setSettings({ ...settings, bookingStartTime: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  End Time (24h)
                </label>
                <input
                  type="time"
                  value={settings.bookingEndTime}
                  onChange={(e) =>
                    setSettings({ ...settings, bookingEndTime: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Max Advance Days
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={settings.maxAdvanceBookingDays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxAdvanceBookingDays: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase text-slate-600 mb-2">
                Available Consultation Days
              </span>
              <div className="flex flex-wrap gap-2">
                {DAY_LABELS.map((item) => {
                  const active = settings.availableDays.includes(item.day);
                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => toggleDay(item.day)}
                      className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition-all ${
                        active
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Display Office Hours Text
                </label>
                <input
                  value={settings.officeHoursText}
                  onChange={(e) =>
                    setSettings({ ...settings, officeHoursText: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.whatsappDispatchEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        whatsappDispatchEnabled: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span>Enable One-Click WhatsApp Slip Dispatch</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg shadow-sm text-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}

