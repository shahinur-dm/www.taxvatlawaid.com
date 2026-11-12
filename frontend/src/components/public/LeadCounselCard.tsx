import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WebsiteContentData } from '@/types';

interface LeadCounselCardProps {
  content: WebsiteContentData;
}

export function LeadCounselCard({ content }: LeadCounselCardProps) {
  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  return (
    <section className="relative z-20 -mt-12 sm:-mt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-navy-800 text-white text-xs font-semibold">
              Lead Counsel &amp; Proprietor
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-brandGreen-50 border border-brandGreen-200 text-brandGreen-700 text-xs font-semibold">
              Associated Practice: {content.associatedPractice}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            {content.leadCounselName}
          </h2>

          <p className="text-sm sm:text-base font-medium text-slate-700">
            <span className="font-bold text-slate-900">{content.leadCounselCredentials}</span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="text-brandGreen-600 font-semibold">{content.leadCounselTitle}</span>
          </p>

          <p className="text-xs sm:text-sm font-semibold text-navy-800">
            <span className="text-brandRed-600">TAX</span>-
            <span className="text-brandGreen-600">VAT</span>,{' '}
            <span>RJSC-Company Legal Compliance</span>{' '}
            <span className="text-slate-400">•</span>{' '}
            <span>Appeal, </span>
            <span className="text-brandGreen-600">Tribunal,</span>{' '}
            <span>High Court &amp; Writ Petition</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 min-w-[230px]">
          <a
            href={`tel:${content.contactPhone}`}
            className="inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-semibold px-5 py-3 rounded-lg text-sm shadow-sm transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Call: {content.contactPhone}</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brandGreen-600 hover:bg-brandGreen-700 text-white font-semibold px-5 py-3 rounded-lg text-sm shadow-sm transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp: {content.contactWhatsapp}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

