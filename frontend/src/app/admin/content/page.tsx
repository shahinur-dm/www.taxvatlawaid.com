'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { FALLBACK_CONTENT } from '@/lib/defaults';
import { WebsiteContentData } from '@/types';

export default function AdminContentPage() {
  const [content, setContent] = useState<WebsiteContentData>(FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<{ success: boolean; data: WebsiteContentData }>(
          '/content'
        );
        setContent({ ...FALLBACK_CONTENT, ...res.data.data });
      } catch (err) {
        toast.error(extractErrorMessage(err, 'Failed to load website content.'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        brandName: content.brandName,
        brandTagline: content.brandTagline,
        associatedPractice: content.associatedPractice,
        heroBadge: content.heroBadge,
        heroHeading: content.heroHeading,
        heroDescription: content.heroDescription,
        heroPrimaryCta: content.heroPrimaryCta,
        heroSecondaryCta: content.heroSecondaryCta,
        leadCounselName: content.leadCounselName,
        leadCounselCredentials: content.leadCounselCredentials,
        leadCounselTitle: content.leadCounselTitle,
        leadCounselPracticeLine: content.leadCounselPracticeLine,
        aboutBadge: content.aboutBadge,
        aboutHeading: content.aboutHeading,
        aboutDescription: content.aboutDescription,
        aboutVision: content.aboutVision,
        contactPhone: content.contactPhone,
        contactWhatsapp: content.contactWhatsapp,
        contactEmail: content.contactEmail,
        officeAddress: content.officeAddress,
        websiteUrl: content.websiteUrl,
        footerDescription: content.footerDescription,
        footerDisclaimer: content.footerDisclaimer,
        copyrightText: content.copyrightText,
        socialLinks: content.socialLinks,
        faqs: content.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      };

      const res = await api.patch<{
        success: boolean;
        message: string;
        data: WebsiteContentData;
      }>('/admin/content', payload);
      setContent({ ...FALLBACK_CONTENT, ...res.data.data });
      toast.success('Website content saved and published!');
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to save website content.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell
      title="Website Content Management"
      subtitle="Update Hero, About, Lead Counsel, Contact Details, FAQs, Footer, and Social Links"
    >
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-navy-800" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Hero Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-navy-800 border-b border-slate-100 pb-2">
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Hero Badge
                </label>
                <input
                  value={content.heroBadge}
                  onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Primary CTA Text
                </label>
                <input
                  value={content.heroPrimaryCta}
                  onChange={(e) =>
                    setContent({ ...content, heroPrimaryCta: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Hero Heading
              </label>
              <input
                value={content.heroHeading}
                onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Hero Description
              </label>
              <textarea
                rows={3}
                value={content.heroDescription}
                onChange={(e) =>
                  setContent({ ...content, heroDescription: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* About & Lead Counsel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-navy-800 border-b border-slate-100 pb-2">
              About &amp; Lead Counsel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Lead Counsel Name
                </label>
                <input
                  value={content.leadCounselName}
                  onChange={(e) =>
                    setContent({ ...content, leadCounselName: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Credentials
                </label>
                <input
                  value={content.leadCounselCredentials}
                  onChange={(e) =>
                    setContent({ ...content, leadCounselCredentials: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                About Heading
              </label>
              <input
                value={content.aboutHeading}
                onChange={(e) => setContent({ ...content, aboutHeading: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                About Description
              </label>
              <textarea
                rows={3}
                value={content.aboutDescription}
                onChange={(e) =>
                  setContent({ ...content, aboutDescription: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Contact & Chamber Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-navy-800 border-b border-slate-100 pb-2">
              Contact &amp; Chamber Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Phone Number
                </label>
                <input
                  value={content.contactPhone}
                  onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  WhatsApp Number
                </label>
                <input
                  value={content.contactWhatsapp}
                  onChange={(e) =>
                    setContent({ ...content, contactWhatsapp: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={content.contactEmail}
                  onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Chamber / Office Address
              </label>
              <input
                value={content.officeAddress}
                onChange={(e) =>
                  setContent({ ...content, officeAddress: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Footer & Social Links */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-navy-800 border-b border-slate-100 pb-2">
              Footer &amp; Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Footer Description
                </label>
                <textarea
                  rows={2}
                  value={content.footerDescription}
                  onChange={(e) =>
                    setContent({ ...content, footerDescription: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Footer Disclaimer
                </label>
                <textarea
                  rows={2}
                  value={content.footerDisclaimer}
                  onChange={(e) =>
                    setContent({ ...content, footerDisclaimer: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Facebook URL
                </label>
                <input
                  value={content.socialLinks.facebook}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  LinkedIn URL
                </label>
                <input
                  value={content.socialLinks.linkedin}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-base font-extrabold text-navy-800">
                Frequently Asked Questions
              </h2>
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    faqs: [...content.faqs, { question: '', answer: '' }],
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-brandRed-600"
              >
                <Plus className="h-4 w-4" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {content.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...content.faqs];
                        updated[idx] = { ...faq, question: e.target.value };
                        setContent({ ...content, faqs: updated });
                      }}
                      placeholder="Question"
                      className="flex-1 rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setContent({
                          ...content,
                          faqs: content.faqs.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-brandRed-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...content.faqs];
                      updated[idx] = { ...faq, answer: e.target.value };
                      setContent({ ...content, faqs: updated });
                    }}
                    placeholder="Answer"
                    className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg shadow-sm text-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save &amp; Publish Website Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}

