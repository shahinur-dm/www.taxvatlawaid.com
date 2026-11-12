'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Users,
  XCircle,
} from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { AppointmentRecord, DashboardStats } from '@/types';
import { toast } from 'sonner';

const PIE_COLORS = ['#1d2362', '#dc2626', '#16a34a', '#d97706', '#2563eb', '#7c3aed', '#0891b2', '#64748b'];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, recentRes] = await Promise.all([
          api.get<{ success: boolean; data: DashboardStats }>('/admin/dashboard/stats'),
          api.get<{ success: boolean; data: AppointmentRecord[] }>(
            '/admin/dashboard/recent-appointments?limit=6'
          ),
        ]);
        setStats(statsRes.data.data);
        setRecent(recentRes.data.data);
      } catch (err) {
        toast.error(extractErrorMessage(err, 'Failed to load dashboard overview.'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = stats
    ? [
        {
          label: 'Total Appointments',
          value: stats.counts.total,
          icon: Users,
          tone: 'bg-navy-50 text-navy-800',
        },
        {
          label: "Today's Appointments",
          value: stats.counts.today,
          icon: Calendar,
          tone: 'bg-blue-50 text-blue-700',
        },
        {
          label: 'Pending Requests',
          value: stats.counts.pending,
          icon: Clock,
          tone: 'bg-amber-50 text-amber-700',
        },
        {
          label: 'Confirmed',
          value: stats.counts.confirmed,
          icon: CalendarCheck,
          tone: 'bg-indigo-50 text-indigo-700',
        },
        {
          label: 'Completed',
          value: stats.counts.completed,
          icon: CheckCircle2,
          tone: 'bg-brandGreen-50 text-brandGreen-700',
        },
        {
          label: 'Cancelled',
          value: stats.counts.cancelled,
          icon: XCircle,
          tone: 'bg-brandRed-50 text-brandRed-700',
        },
      ]
    : [];

  return (
    <AdminShell
      title="Dashboard Overview"
      subtitle="Live appointment metrics, analytics, and upcoming consultations"
    >
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-navy-800" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* 6 Statistic Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`h-9 w-9 rounded-lg flex items-center justify-center ${card.tone}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-navy-800">
                    {card.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">
                    {card.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-navy-800">
                    Appointment Schedule Analytics
                  </h2>
                  <p className="text-xs text-slate-500">
                    Bookings grouped by scheduled date
                  </p>
                </div>
              </div>

              {stats && stats.dailyAnalytics.length > 0 ? (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.dailyAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="confirmed" name="Confirmed" fill="#1d2362" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" fill="#d97706" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" name="Completed" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-60 flex items-center justify-center text-sm text-slate-500">
                  No appointment analytics data yet.
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-base font-bold text-navy-800 mb-1">
                Service Category Breakdown
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Distribution across practice categories
              </p>

              {stats && stats.serviceCategoryStats.length > 0 ? (
                <div className="space-y-4">
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.serviceCategoryStats}
                          dataKey="count"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={42}
                        >
                          {stats.serviceCategoryStats.map((_, idx) => (
                            <Cell
                              key={idx}
                              fill={PIE_COLORS[idx % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {stats.serviceCategoryStats.map((item, idx) => (
                      <div key={item.category} className="flex items-center justify-between gap-2 bg-slate-50 px-2.5 py-1.5 rounded">
                        <span className="flex items-center gap-1.5 truncate">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                          />
                          <span className="truncate">{item.category}</span>
                        </span>
                        <span className="font-bold text-navy-800">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-60 flex items-center justify-center text-sm text-slate-500">
                  No service statistics recorded yet.
                </div>
              )}
            </div>
          </div>

          {/* Recent & Upcoming Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-navy-800">Recent Appointments</h2>
                <Link
                  href="/admin/appointments"
                  className="text-xs font-bold text-brandRed-600 hover:underline"
                >
                  Manage All →
                </Link>
              </div>
              {recent.length === 0 ? (
                <p className="text-sm text-slate-500 py-6 text-center">
                  No appointments submitted yet.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recent.map((appt) => (
                    <div key={appt._id} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-navy-800 truncate">
                          {appt.customerName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {appt.serviceCategory} • {appt.appointmentDateStr} at {appt.appointmentTime}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 shrink-0">
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-navy-800">
                  Upcoming Consultations
                </h2>
                <span className="text-xs text-slate-500">Today: {stats?.todayDate}</span>
              </div>
              {!stats || stats.upcomingAppointments.length === 0 ? (
                <p className="text-sm text-slate-500 py-6 text-center">
                  No upcoming pending or confirmed appointments.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {stats.upcomingAppointments.map((appt) => (
                    <div key={appt._id} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-navy-800 truncate">
                          {appt.customerName}{' '}
                          <span className="font-normal text-slate-500">({appt.phone})</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {appt.appointmentDateStr} • {appt.appointmentTime} • {appt.consultationMode}
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                          appt.status === 'Confirmed'
                            ? 'bg-brandGreen-50 text-brandGreen-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

