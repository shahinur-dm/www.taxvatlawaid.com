import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PublicSettings, WebsiteContentData } from '@/types';

interface ContactSectionProps {
  content: WebsiteContentData;
  settings: PublicSettings;
}

export function ContactSection({ content, settings }: ContactSectionProps) {
  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-brandRed-50 text-brandRed-700 text-xs font-bold uppercase tracking-wider mb-3">
                Chamber &amp; Office Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mb-3">
                Let&apos;s Discuss Your Legal, Tax &amp; Corporate Compliance Requirements
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Whether you are starting a business, managing a company, preparing a tax or VAT return, handling a customs matter, protecting intellectual property, or facing a legal dispute, TaxVat LawAid welcomes the opportunity to assist you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-navy-800">
                    <MapPin className="h-4 w-4 text-brandRed-600" />
                    <span>Chamber Address</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">{content.officeAddress}</p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-navy-800">
                    <Clock className="h-4 w-4 text-brandGreen-600" />
                    <span>Consultation Hours</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">{settings.officeHoursText}</p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-navy-800">
                    <Phone className="h-4 w-4 text-navy-800" />
                    <span>Phone &amp; WhatsApp</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Call: {content.contactPhone} <br />
                    WhatsApp: {content.contactWhatsapp}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-navy-800">
                    <Mail className="h-4 w-4 text-brandRed-600" />
                    <span>Official Email</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm break-all">
                    {content.contactEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold">Schedule a Consultation</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Reserve a dedicated 30-minute consultation slot online for Chamber Visit, Video Call, or Phone Call between 3:00 PM and 8:00 PM (Sunday to Thursday).
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/booking"
                className="w-full inline-flex items-center justify-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold py-3.5 px-5 rounded-lg transition-colors text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment Online</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brandGreen-600 hover:bg-brandGreen-700 text-white font-bold py-3.5 px-5 rounded-lg transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

