'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Gavel,
  Receipt,
  Scale,
  Ship,
  X,
} from 'lucide-react';
import { ServiceCategory, ServiceItem } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface PracticeAreasSectionProps {
  services: ServiceItem[];
  onBookService?: (category: ServiceCategory) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Receipt,
  Ship,
  Building2,
  Award,
  Gavel,
  Scale,
};

function mapServiceToBookingCategory(slug: string): ServiceCategory {
  if (slug.includes('etin') || slug.includes('ebin')) return 'eTIN/eBIN Registration';
  if (slug.includes('tax-vat-return')) return 'TAX/VAT Return & Services';
  if (slug.includes('tda') || slug.includes('vds')) return 'TDA/VDS Return & Services';
  if (slug.includes('tax-vat-compliance')) return 'TAX/VAT Compliance';
  if (slug.includes('audit')) return 'Audit-Accounting Services';
  if (slug.includes('company-taxation')) return 'Company Taxation';
  if (slug.includes('rjsc-company-registration')) return 'RJSC Company Registration';
  if (slug.includes('partnership') || slug.includes('opc')) return 'Partnership, OPCRegistration';
  if (slug.includes('society') || slug.includes('foundation')) return 'Society-Foundation Registration';
  if (slug.includes('club')) return 'Club Ltd. Registration';
  if (slug.includes('trade-association')) return 'Trade Association Registration';
  if (slug.includes('rjsc-legal-compliance')) return 'RJSC Legal Compliance';
  if (slug.includes('irc') || slug.includes('erc') || slug.includes('bida')) return 'IRC, ERC, BIDA Registration';
  if (slug.includes('trademark') || slug.includes('ip') || slug.includes('patent')) return 'IP>Trademark, Patent, Design';
  if (slug.includes('appeal') || slug.includes('tribunal')) return 'TAX/VAT Appeal, Tribunal';
  if (slug.includes('high-court') || slug.includes('writ')) return 'High Court & Writ Petition';
  if (slug.includes('corporate-legal')) return 'Corporate Legal Consultant';
  if (slug.includes('corporate-business')) return 'Corporate Business Compliance';
  if (slug.includes('licence')) return 'Licences';
  return 'Others';
}

export function PracticeAreasSection({
  services,
  onBookService,
}: PracticeAreasSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section
      id="practice-areas"
      className="py-20 sm:py-24 bg-ivory-100 border-y border-ivory-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                <span className="h-px w-8 bg-champagne-500" />
                <span>Core Legal &amp; Regulatory Divisions</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-midnight-900 tracking-tight mb-3">
                Specialized Practice Areas
              </h2>
              <p className="text-charcoal-600 text-base sm:text-[17px] leading-relaxed">
                Structured representation and regulatory compliance across our 20 specialized practice areas grounded in Bangladesh statutory law.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-midnight-900 hover:text-champagne-700 transition-colors shrink-0 group"
            >
              <span>Explore Full Service Directory</span>
              <ArrowRight className="h-4 w-4 text-champagne-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = ICON_MAP[svc.iconName] || Scale;

            return (
              <RevealOnScroll key={svc._id || svc.slug} delayMs={(idx % 3) * 80}>
                <article className="h-full bg-white rounded-lg border border-ivory-300 hover:border-champagne-500 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-midnight-900/5 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="h-11 w-11 rounded bg-midnight-900 text-champagne-400 flex items-center justify-center shrink-0 group-hover:bg-champagne-500 group-hover:text-midnight-950 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-serif text-2xl font-semibold text-champagne-500/80 tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-champagne-700 mb-2">
                      {svc.categoryTag}
                    </div>

                    <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-midnight-900 mb-3 leading-snug group-hover:text-midnight-700 transition-colors">
                      <Link href={`/services/${svc.slug}`} className="hover:underline decoration-champagne-500 underline-offset-4">
                        {svc.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-charcoal-600 leading-relaxed mb-5">
                      {svc.shortDescription}
                    </p>

                    {svc.detailedServices && svc.detailedServices.length > 0 && (
                      <ul className="space-y-1.5 mb-6 pt-4 border-t border-ivory-200">
                        {svc.detailedServices.slice(0, 3).map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-charcoal-600"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-champagne-500 shrink-0 mt-1.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-ivory-200 flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-midnight-900 hover:text-champagne-700 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className="text-xs font-semibold text-charcoal-500 hover:text-midnight-900 transition-colors"
                    >
                      Quick Checklist
                    </button>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>

      {/* Quick Checklist & Statutory Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-midnight-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="practice-modal-title"
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-ivory-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-midnight-900 text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-champagne-500/30">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-champagne-400">
                    {selectedService.categoryTag}
                  </span>
                  {selectedService.divisionBadge && (
                    <span className="text-xs text-ivory-200/80">
                      · {selectedService.divisionBadge}
                    </span>
                  )}
                </div>
                <h3
                  id="practice-modal-title"
                  className="font-serif text-xl sm:text-2xl font-semibold text-white"
                >
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="p-1.5 rounded hover:bg-white/10 text-ivory-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                {selectedService.shortDescription}
              </p>

              {selectedService.detailedServices?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-3">
                    Scope of Legal &amp; Compliance Work
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.detailedServices.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-charcoal-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-champagne-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.documentChecklist?.length > 0 && (
                <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-2.5">
                    Indicative Client Document Checklist
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedService.documentChecklist.map((doc, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-midnight-900 shrink-0 mt-2" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.legalFramework && (
                <div className="rounded-lg bg-midnight-50 border border-midnight-100 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-1">
                    Applicable Legal Framework
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700">
                    {selectedService.legalFramework}
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-ivory-200">
                <Link
                  href={`/services/${selectedService.slug}`}
                  onClick={() => setSelectedService(null)}
                  className="text-xs font-bold uppercase tracking-wider text-midnight-900 hover:text-champagne-700 inline-flex items-center gap-1"
                >
                  <span>Full Division Page</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2.5 rounded border border-ivory-300 text-sm font-medium text-charcoal-700 hover:bg-ivory-100"
                  >
                    Close
                  </button>
                  <a
                    href="#booking"
                    onClick={() => {
                      const cat = mapServiceToBookingCategory(selectedService.slug);
                      onBookService?.(cat);
                      setSelectedService(null);
                    }}
                    className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-2.5 rounded text-sm"
                  >
                    <Calendar className="h-4 w-4 text-champagne-400" />
                    <span>Book Consultation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
