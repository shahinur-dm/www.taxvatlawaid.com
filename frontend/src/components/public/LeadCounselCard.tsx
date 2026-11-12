import React from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface LeadCounselCardProps {
  content: WebsiteContentData;
}

export function LeadCounselCard({ content }: LeadCounselCardProps) {
  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  const focusMandates = [
    'Income Tax & Corporate Tax Advisory, Audits & Appeals',
    'VAT, Supplementary Duty, BIN & Mushak Compliance',
    'RJSC Company Formation, Filings & Corporate Governance',
    'Appellate Tribunals, High Court Division & Writ Petitions',
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Editorial Architectural Chamber Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden bg-midnight-900 shadow-2xl shadow-midnight-900/15 border border-ivory-300">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src="/images/counsel-desk.jpg"
                    alt={`${content.leadCounselName} - Chamber Briefs & Desk`}
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/20 to-transparent"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <div className="flex items-center gap-2 text-champagne-300 text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5">
                      <span className="h-px w-6 bg-champagne-400" />
                      <span>Chamber Leadership</span>
                    </div>
                    <div className="font-serif text-xl font-semibold text-white">
                      {content.leadCounselName}
                    </div>
                    <div className="text-xs text-ivory-200/85 mt-0.5">
                      {content.leadCounselTitle} · {content.associatedPractice}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Partner Profile */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                  <span className="h-px w-8 bg-champagne-500" />
                  <span>Lead Counsel &amp; Proprietor</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-midnight-900 tracking-tight leading-tight">
                  {content.leadCounselName}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
                  <span className="font-semibold text-charcoal-800">
                    {content.leadCounselCredentials}
                  </span>
                  <span className="text-champagne-500">•</span>
                  <span className="font-semibold text-champagne-700">
                    {content.leadCounselTitle}
                  </span>
                </div>
              </div>

              <div className="h-px bg-ivory-300" />

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-500">
                  Core Practice Specialisation
                </div>
                <p className="text-base text-charcoal-700 leading-relaxed font-medium">
                  {content.leadCounselPracticeLine}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {focusMandates.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded bg-ivory-100 border border-ivory-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] font-medium text-charcoal-700 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-6 py-3.5 rounded text-sm transition-colors"
                >
                  <Calendar className="h-4 w-4 text-champagne-400" />
                  <span>Request Consultation</span>
                </Link>
                <a
                  href={`tel:${content.contactPhone}`}
                  className="inline-flex items-center justify-center gap-2 bg-ivory-100 hover:bg-ivory-200 border border-ivory-300 text-midnight-900 font-semibold px-5 py-3.5 rounded text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 text-champagne-600" />
                  <span>Call: {content.contactPhone}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-3.5 rounded text-sm transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
