'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { api, extractErrorMessage } from '@/lib/api';
import { PublicSettings, WebsiteContentData } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface ContactSectionProps {
  content: WebsiteContentData;
  settings: PublicSettings;
}

export function ContactSection({ content, settings }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;
  const mapQuery = encodeURIComponent(
    `${content.officeAddress}, Bangladesh`
  );

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!/^[+\d][\d\s-]{5,24}$/.test(phone.trim())) {
      toast.error('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      toast.error('Please enter at least 10 characters describing your inquiry.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post<{ success: boolean; message: string }>('/inquiries', {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Legal Consultation Inquiry',
        message: message.trim(),
      });
      toast.success(res.data.message);
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Could not submit inquiry. Please try calling directly.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-t border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Official Chamber Directory + Embedded Interactive Map */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em]">
                  <span className="h-px w-8 bg-champagne-500" />
                  <span>Chamber &amp; Office Directory</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-midnight-900 tracking-tight">
                  Connect With Our Dhaka Chamber
                </h2>
                <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                  {content.brandName} · Associated Practice:{' '}
                  <strong className="text-midnight-900">{content.associatedPractice}</strong>. Reach us in Ramna, Dhaka or schedule an online consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-midnight-900">
                    <MapPin className="h-4 w-4 text-champagne-600 shrink-0" />
                    <span>Chamber Address</span>
                  </div>
                  <p className="text-charcoal-600 text-xs sm:text-[13px] leading-relaxed">
                    {content.officeAddress}, Bangladesh
                  </p>
                </div>

                <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-midnight-900">
                    <Clock className="h-4 w-4 text-champagne-600 shrink-0" />
                    <span>Consultation Hours</span>
                  </div>
                  <p className="text-charcoal-600 text-xs sm:text-[13px] leading-relaxed">
                    {settings.officeHoursText}
                  </p>
                </div>

                <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-midnight-900">
                    <Phone className="h-4 w-4 text-champagne-600 shrink-0" />
                    <span>Direct Telephone &amp; WhatsApp</span>
                  </div>
                  <p className="text-charcoal-600 text-xs sm:text-[13px] leading-relaxed">
                    <a href={`tel:${content.contactPhone}`} className="hover:text-midnight-900 underline decoration-ivory-300">
                      Call: {content.contactPhone}
                    </a>
                    <br />
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-midnight-900 underline decoration-ivory-300">
                      WhatsApp: {content.contactWhatsapp}
                    </a>
                  </p>
                </div>

                <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-midnight-900">
                    <Mail className="h-4 w-4 text-champagne-600 shrink-0" />
                    <span>Email &amp; Web</span>
                  </div>
                  <p className="text-charcoal-600 text-xs sm:text-[13px] leading-relaxed break-all">
                    <a href={`mailto:${content.contactEmail}`} className="hover:text-midnight-900">
                      {content.contactEmail}
                    </a>
                    <br />
                    <span className="inline-flex items-center gap-1 text-charcoal-500">
                      <Globe className="h-3 w-3" /> {content.websiteUrl}
                    </span>
                  </p>
                </div>
              </div>

              {/* Google Maps Embed targeting actual Eastern Mansion, Ramna address */}
              <div className="rounded-lg overflow-hidden border border-ivory-300 shadow-sm h-64 bg-ivory-100">
                <iframe
                  title="TaxVat LawAid Chamber Location Map - Eastern Mansion, Pioneer Road, Ramna, Dhaka"
                  src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: Contact Inquiry Form + Direct Conversion Bar */}
            <div className="lg:col-span-6 bg-ivory-100 rounded-lg border border-ivory-300 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-midnight-900 mb-2">
                  Send a Written Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6">
                  Submit a confidential summary of your legal, tax, VAT, or corporate compliance question, or reserve a dedicated 30-minute consultation slot directly.
                </p>

                {submitted && (
                  <div className="mb-5 rounded bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-900">
                    Thank you. Your inquiry has been recorded cleanly by our chamber desk. For urgent statutory deadlines, please also call or message us on WhatsApp.
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                        Full Name / Company *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name or organization"
                        className="w-full rounded border border-ivory-300 bg-white px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full rounded border border-ivory-300 bg-white px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full rounded border border-ivory-300 bg-white px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                        Matter Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., VAT Audit / RJSC Filing / Tax Return"
                        className="w-full rounded border border-ivory-300 bg-white px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-bold uppercase tracking-wider text-midnight-900 mb-1.5">
                      Inquiry Details *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your legal or regulatory requirement..."
                      className="w-full rounded border border-ivory-300 bg-white px-3.5 py-2.5 text-sm text-midnight-900 focus:border-midnight-900 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-midnight-900 hover:bg-midnight-800 disabled:opacity-60 text-white font-semibold py-3.5 px-6 rounded transition-colors text-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-champagne-400" />
                        <span>Submit Chamber Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="pt-5 border-t border-ivory-300 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-semibold py-3 px-4 rounded transition-colors text-xs sm:text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Consultation Slot</span>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded transition-colors text-xs sm:text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Chamber Desk</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
