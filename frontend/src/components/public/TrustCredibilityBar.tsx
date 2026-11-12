import React from 'react';
import { Award, Briefcase, Building2, Scale } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { TaxAidBrand } from './TaxAidBrand';

interface TrustCredibilityBarProps {
  content: WebsiteContentData;
}

export function TrustCredibilityBar({ content }: TrustCredibilityBarProps) {
  return (
    <section
      aria-label="Chamber Credentials"
      className="bg-ivory-100 border-b border-ivory-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ivory-300">
          <div className="py-6 sm:px-6 first:sm:pl-0 flex items-start gap-3.5">
            <Award className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-champagne-700 mb-1">
                Lead Counsel &amp; Proprietor
              </div>
              <div className="font-serif text-lg font-semibold text-midnight-900">
                {content.leadCounselName}
              </div>
            </div>
          </div>

          <div className="py-6 sm:px-6 flex items-start gap-3.5">
            <Scale className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-champagne-700 mb-1">
                Academic &amp; Professional
              </div>
              <div className="text-sm font-semibold text-midnight-900 leading-snug">
                {content.leadCounselCredentials}
              </div>
              <div className="text-xs text-charcoal-500 mt-0.5">{content.leadCounselTitle}</div>
            </div>
          </div>

          <div className="py-6 sm:px-6 flex items-start gap-3.5">
            <Building2 className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-champagne-700 mb-1">
                Associated Practice
              </div>
              <div className="font-serif text-lg font-bold">
                <TaxAidBrand />
              </div>
              <div className="text-xs text-charcoal-500 mt-0.5">Ramna, Dhaka, Bangladesh</div>
            </div>
          </div>

          <div className="py-6 sm:px-6 last:sm:pr-0 flex items-start gap-3.5">
            <Briefcase className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-champagne-700 mb-1">
                Core Legal Mandates
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-midnight-900 leading-snug">
                Tax, VAT, Customs, RJSC Corporate Compliance, Tribunals &amp; High Court Writs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
