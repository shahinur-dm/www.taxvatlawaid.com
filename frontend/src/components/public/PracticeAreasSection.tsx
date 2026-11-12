'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  FileText,
  Gavel,
  Receipt,
  Scale,
  Ship,
  X,
} from 'lucide-react';
import { ServiceCategory, ServiceItem } from '@/types';

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
  if (slug.includes('income-tax')) return 'Income Tax';
  if (slug.includes('vat')) return 'VAT & Tax';
  if (slug.includes('company') || slug.includes('rjsc')) return 'Company Taxation';
  if (slug.includes('investment') || slug.includes('licensing')) return 'Business Compliance';
  if (slug.includes('litigation') || slug.includes('customs')) return 'Legal Consultancy';
  return 'Other';
}

export function PracticeAreasSection({
  services,
  onBookService,
}: PracticeAreasSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="practice-areas" className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-4">
            Complete Legal &amp; Regulatory Divisions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight mb-3">
            Our Core Practice Areas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Click any practice division below to view detailed services, indicative client documents, and the applicable Bangladesh legal framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = ICON_MAP[svc.iconName] || Scale;

            const accentStyles =
              svc.accentColor === 'red'
                ? {
                    cardBorder: 'border-red-200 hover:border-brandRed-600',
                    iconBg: 'bg-red-50 text-brandRed-600',
                  }
                : svc.accentColor === 'green'
                  ? {
                      cardBorder: 'border-emerald-200 hover:border-brandGreen-600',
                      iconBg: 'bg-emerald-50 text-brandGreen-600',
                    }
                  : {
                      cardBorder: 'border-slate-200 hover:border-navy-800',
                      iconBg: 'bg-navy-50 text-navy-800',
                    };

            return (
              <button
                key={svc._id || svc.slug}
                type="button"
                onClick={() => setSelectedService(svc)}
                className={`text-left bg-white rounded-2xl border p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${accentStyles.cardBorder}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center ${accentStyles.iconBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                      {svc.categoryTag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-navy-800 mb-2.5 group-hover:text-brandRed-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {svc.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-sm font-bold text-navy-800">
                  <span>View Services &amp; Checklist</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice Area Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold mb-2">
                  {selectedService.categoryTag}
                  {selectedService.divisionBadge ? ` • ${selectedService.divisionBadge}` : ''}
                </span>
                <h3 className="text-2xl font-extrabold text-navy-800">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-5 space-y-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {selectedService.shortDescription}
              </p>

              {selectedService.detailedServices.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-navy-800 mb-3">
                    Scope of Services
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.detailedServices.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-brandGreen-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.documentChecklist.length > 0 && (
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-navy-800 mb-3">
                    Indicative Client Documents Checklist
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.documentChecklist.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="h-4 w-4 rounded border border-slate-400 shrink-0 mt-0.5 bg-white" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.legalFramework && (
                <div className="rounded-xl bg-navy-50/70 border border-navy-100 p-4 text-xs sm:text-sm text-navy-900">
                  <span className="font-bold block mb-1">Applicable Legal Framework:</span>
                  <span>{selectedService.legalFramework}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <a
                href="#booking"
                onClick={() => {
                  const cat = mapServiceToBookingCategory(selectedService.slug);
                  setSelectedService(null);
                  onBookService?.(cat);
                }}
                className="px-5 py-2.5 rounded-lg bg-brandRed-600 hover:bg-brandRed-700 text-white text-sm font-semibold transition-colors"
              >
                Book Appointment for This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

