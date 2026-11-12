'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Mail, Phone, Trash2 } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { InquiryItem } from '@/types';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: InquiryItem[] }>(
        '/admin/inquiries'
      );
      setInquiries(res.data.data || []);
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to load inquiries.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  const updateStatus = async (id: string, status: InquiryItem['status']) => {
    try {
      await api.patch(`/admin/inquiries/${id}/status`, { status });
      toast.success('Inquiry status updated.');
      await loadInquiries();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to update inquiry.'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    try {
      await api.delete(`/admin/inquiries/${id}`);
      toast.success('Inquiry deleted.');
      await loadInquiries();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to delete inquiry.'));
    }
  };

  return (
    <AdminShell
      title="Contact Inquiries"
      subtitle="Review written client inquiries submitted via the Contact page"
    >
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-7 w-7 animate-spin text-navy-800" />
          </div>
        ) : inquiries.length === 0 ? (
          <p className="text-sm text-slate-500 py-10 text-center">
            No written inquiries received yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {inquiries.map((inq) => (
              <div key={inq._id} className="py-5 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900 text-base">
                      {inq.name} — <span className="text-navy-800">{inq.subject}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {inq.phone}
                      </span>
                      {inq.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" /> {inq.email}
                        </span>
                      )}
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateStatus(inq._id, e.target.value as InquiryItem['status'])
                      }
                      className="rounded border border-slate-300 px-2.5 py-1 text-xs font-semibold bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Responded">Responded</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq._id)}
                      className="p-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50"
                      aria-label="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200">
                  {inq.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
