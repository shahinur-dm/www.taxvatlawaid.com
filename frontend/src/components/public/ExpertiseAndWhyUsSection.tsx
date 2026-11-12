import React from 'react';
import { Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';
import { WebsiteContentData } from '@/types';

interface ExpertiseAndWhyUsSectionProps {
  content: WebsiteContentData;
}

export function ExpertiseAndWhyUsSection({ content }: ExpertiseAndWhyUsSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Why Choose Us */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Why Choose TaxVat LawAid</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight mb-3">
              Our Expertise &amp; Commitment
            </h2>
            <p className="text-slate-600 text-base">
              Practical legal guidance, disciplined compliance management, and responsible representation across regulatory authorities, tribunals, and courts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-9 w-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-5 w-5 text-brandGreen-600" />
                  </div>
                  <h3 className="font-bold text-navy-800 text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brandRed-600 mb-1">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Sector Coverage</span>
              </span>
              <h3 className="text-2xl font-extrabold text-navy-800">
                Industries &amp; Clients We Serve
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Tailored legal, taxation, VAT, customs, and corporate governance support across commercial, industrial, non-profit, and individual matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.industries.map((industry, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-700"
              >
                <span className="h-2 w-2 rounded-full bg-brandGreen-600 shrink-0" />
                <span>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

