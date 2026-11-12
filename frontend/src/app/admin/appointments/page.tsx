'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import {
  AppointmentRecord,
  AppointmentStatus,
  SERVICE_CATEGORIES,
} from '@/types';

const STATUS_BADGE: Record<AppointmentStatus, string> = {
  Pending: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-brandGreen-100 text-brandGreen-800',
  Cancelled: 'bg-brandRed-100 text-brandRed-800',
};

export default function AdminAppointmentsPage() {
  const [items, setItems] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [selected, setSelected] = useState<AppointmentRecord | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppointmentRecord | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '10');
      if (search.trim()) params.set('search', search.trim());
      if (dateFilter) params.set('date', dateFilter);
      if (serviceFilter !== 'All') params.set('service', serviceFilter);
      if (statusFilter !== 'All') params.set('status', statusFilter);

      const res = await api.get<{
        success: boolean;
        data: AppointmentRecord[];
        pagination: { page: number; totalPages: number; total: number };
      }>(`/admin/appointments?${params.toString()}`);

      setItems(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setTotalCount(res.data.pagination.total);
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to load appointments.'));
    } finally {
      setLoading(false);
    }
  }, [page, search, dateFilter, serviceFilter, statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    setUpdatingId(id);
    try {
      const res = await api.patch<{
        success: boolean;
        message: string;
        data: AppointmentRecord;
      }>(`/admin/appointments/${id}/status`, { status });
      toast.success(res.data.message);
      setItems((prev) => prev.map((it) => (it._id === id ? res.data.data : it)));
      if (selected?._id === id) {
        setSelected(res.data.data);
      }
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to update status.'));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    try {
      const res = await api.patch<{
        success: boolean;
        message: string;
        data: AppointmentRecord;
      }>(`/admin/appointments/${selected._id}/notes`, { adminNotes: notesDraft });
      toast.success(res.data.message);
      setSelected(res.data.data);
      setItems((prev) =>
        prev.map((it) => (it._id === selected._id ? res.data.data : it))
      );
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to save internal notes.'));
    } finally {
      setSavingNotes(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setUpdatingId(deleteTarget._id);
    try {
      await api.delete(`/admin/appointments/${deleteTarget._id}`);
      toast.success('Appointment deleted.');
      setDeleteTarget(null);
      if (selected?._id === deleteTarget._id) setSelected(null);
      fetchAppointments();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to delete appointment.'));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminShell
      title="Appointment Management"
      subtitle="Search, filter, confirm, complete, cancel, and record internal notes"
    >
      <div className="space-y-5">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative lg:col-span-2">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, phone, or TVLA reference..."
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-navy-800"
            />
          </div>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
          />

          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none focus:border-navy-800"
          >
            <option value="All">All Services</option>
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none focus:border-navy-800"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong>{items.length}</strong> of <strong>{totalCount}</strong> appointments
            </span>
            {(search || dateFilter || serviceFilter !== 'All' || statusFilter !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setDateFilter('');
                  setServiceFilter('All');
                  setStatusFilter('All');
                  setPage(1);
                }}
                className="font-semibold text-brandRed-600 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-navy-800" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">
              No appointments match your current filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3 px-4">Reference &amp; Client</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((appt) => (
                    <tr key={appt._id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-800">{appt.customerName}</div>
                        <div className="text-xs text-slate-500">
                          {appt.phone} • <span className="font-mono">{appt.bookingReference}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{appt.serviceCategory}</div>
                        <div className="text-xs text-slate-500">{appt.consultationMode}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {appt.appointmentDateStr}
                        </div>
                        <div className="text-xs text-slate-500">{appt.appointmentTime}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                            STATUS_BADGE[appt.status]
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelected(appt);
                              setNotesDraft(appt.adminNotes || '');
                            }}
                            title="View details & notes"
                            className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {appt.status !== 'Confirmed' && (
                            <button
                              type="button"
                              disabled={updatingId === appt._id}
                              onClick={() => handleStatusChange(appt._id, 'Confirmed')}
                              title="Confirm appointment"
                              className="p-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}

                          {appt.status !== 'Cancelled' && (
                            <button
                              type="button"
                              disabled={updatingId === appt._id}
                              onClick={() => handleStatusChange(appt._id, 'Cancelled')}
                              title="Cancel appointment"
                              className="p-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 disabled:opacity-50"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={updatingId === appt._id}
                            onClick={() => setDeleteTarget(appt)}
                            title="Delete appointment"
                            className="p-2 rounded-lg border border-red-200 text-brandRed-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details + Notes Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono text-slate-500">
                  {selected.bookingReference}
                </div>
                <h3 className="text-xl font-extrabold text-navy-800">
                  {selected.customerName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-500">Phone</div>
                <div className="font-semibold">{selected.phone}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="font-semibold break-all">
                  {selected.email || 'Not provided'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Service Category</div>
                <div className="font-semibold">{selected.serviceCategory}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Consultation Mode</div>
                <div className="font-semibold">{selected.consultationMode}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Date &amp; Time</div>
                <div className="font-semibold">
                  {selected.appointmentDateStr} at {selected.appointmentTime}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Current Status</div>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold mt-0.5 ${
                    STATUS_BADGE[selected.status]
                  }`}
                >
                  {selected.status}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase text-slate-500 mb-1">
                Client Problem Description
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-700 min-h-[56px]">
                {selected.problemDescription || 'No description provided.'}
              </div>
            </div>

            {/* Status Switcher */}
            <div>
              <div className="text-xs font-bold uppercase text-slate-500 mb-2">
                Update Booking Status
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as AppointmentStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updatingId === selected._id || selected.status === st}
                      onClick={() => handleStatusChange(selected._id, st)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        selected.status === st
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-navy-800'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-500">
                Internal Admin Notes
              </label>
              <textarea
                rows={3}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Add chamber preparation notes, document checklist status, or follow-up actions..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleSaveNotes}
                  className="bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  {savingNotes ? 'Saving...' : 'Save Internal Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-extrabold text-navy-800">
              Delete Appointment?
            </h3>
            <p className="text-sm text-slate-600">
              Are you sure you want to permanently delete the booking for{' '}
              <strong>{deleteTarget.customerName}</strong> (
              <span className="font-mono">{deleteTarget.bookingReference}</span>)? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700"
              >
                Keep Record
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-brandRed-600 hover:bg-brandRed-700 text-white text-sm font-semibold"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

