'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Edit2, Loader2, Plus, Trash2, X } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { ServiceItem } from '@/types';

const EMPTY_FORM = {
  title: '',
  categoryTag: '',
  divisionBadge: '',
  shortDescription: '',
  detailedServicesText: '',
  documentChecklistText: '',
  legalFramework: '',
  iconName: 'Scale',
  accentColor: 'navy' as 'red' | 'green' | 'navy',
  displayOrder: 1,
  isActive: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: ServiceItem[] }>('/admin/services');
      setServices(res.data.data);
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to load services.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, displayOrder: services.length + 1 });
    setModalOpen(true);
  };

  const openEditModal = (svc: ServiceItem) => {
    setEditingId(svc._id);
    setForm({
      title: svc.title,
      categoryTag: svc.categoryTag,
      divisionBadge: svc.divisionBadge || '',
      shortDescription: svc.shortDescription,
      detailedServicesText: svc.detailedServices.join('\n'),
      documentChecklistText: svc.documentChecklist.join('\n'),
      legalFramework: svc.legalFramework || '',
      iconName: svc.iconName || 'Scale',
      accentColor: svc.accentColor || 'navy',
      displayOrder: svc.displayOrder || 0,
      isActive: svc.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        categoryTag: form.categoryTag,
        divisionBadge: form.divisionBadge,
        shortDescription: form.shortDescription,
        detailedServices: form.detailedServicesText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        documentChecklist: form.documentChecklistText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        legalFramework: form.legalFramework,
        iconName: form.iconName,
        accentColor: form.accentColor,
        displayOrder: Number(form.displayOrder) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        await api.patch(`/admin/services/${editingId}`, payload);
        toast.success('Service updated.');
      } else {
        await api.post('/admin/services', payload);
        toast.success('Service created.');
      }

      setModalOpen(false);
      loadServices();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to save service.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/services/${deleteTarget._id}`);
      toast.success('Service deleted.');
      setDeleteTarget(null);
      loadServices();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to delete service.'));
    }
  };

  return (
    <AdminShell
      title="Services & Practice Divisions"
      subtitle="Manage practice area cards, document checklists, and statutory frameworks"
    >
      <div className="space-y-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Practice Division</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-7 w-7 animate-spin text-navy-800" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((svc) => (
              <div
                key={svc._id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-800 text-xs font-bold">
                      #{svc.displayOrder} • {svc.categoryTag}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        svc.isActive
                          ? 'bg-brandGreen-50 text-brandGreen-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {svc.isActive ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-800 text-lg mb-1">{svc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {svc.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openEditModal(svc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-navy-800 hover:bg-slate-50"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(svc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-brandRed-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-extrabold text-navy-800">
                {editingId ? 'Edit Practice Division' : 'Add Practice Division'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Title *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Category Tag *
                  </label>
                  <input
                    required
                    value={form.categoryTag}
                    onChange={(e) => setForm({ ...form, categoryTag: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Law Badge
                  </label>
                  <input
                    value={form.divisionBadge}
                    onChange={(e) => setForm({ ...form, divisionBadge: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Accent Color
                  </label>
                  <select
                    value={form.accentColor}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        accentColor: e.target.value as 'red' | 'green' | 'navy',
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                  >
                    <option value="navy">Navy</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.displayOrder}
                    onChange={(e) =>
                      setForm({ ...form, displayOrder: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Detailed Services (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.detailedServicesText}
                    onChange={(e) =>
                      setForm({ ...form, detailedServicesText: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Document Checklist (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.documentChecklistText}
                    onChange={(e) =>
                      setForm({ ...form, documentChecklistText: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Applicable Legal Framework
                </label>
                <input
                  value={form.legalFramework}
                  onChange={(e) => setForm({ ...form, legalFramework: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <span>Active on Public Website</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-sm font-bold"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-extrabold text-navy-800">Delete Service?</h3>
            <p className="text-sm text-slate-600">
              Remove <strong>{deleteTarget.title}</strong> from the practice divisions list?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-brandRed-600 text-white text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

