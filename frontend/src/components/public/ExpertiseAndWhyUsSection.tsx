import React from 'react';
import { Briefcase, Building2, Globe2, Landmark, ShieldCheck } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface ExpertiseAndWhyUsSectionProps {
  content: WebsiteContentData;
}

export function ExpertiseAndWhyUsSection({ content }: ExpertiseAndWhyUsSectionProps) {
  return (
    <>
      {/* Section 10: Why Choose TaxVat LawAid — Editorial Midnight Navy Band */}
      <section className="py-20 sm:py-24 bg-midnight-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-5">
                <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Why Choose TaxVat LawAid</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-tight text-white">
                  Precision Counsel Backed by Procedural Discipline
                </h2>
                <p className="text-ivory-200/85 text-base leading-relaxed">
                  Corporate entities and individual taxpayers rely on methodical statutory preparation, clear documentation, and proactive limitation management across regulatory forums.
                </p>
                <div className="pt-2 h-px w-24 bg-champagne-500/60" />
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {content.whyChooseUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-midnight-800/80 border border-white/10 hover:border-champagne-500/60 p-7 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-serif text-2xl font-semibold text-champagne-400 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-champagne-400/70" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ivory-200/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 11: Industries We Serve — Warm Ivory Sector Showcase */}
      <section className="py-20 sm:py-24 bg-ivory-100 border-b border-ivory-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                  <Briefcase className="h-4 w-4" />
                  <span>Sector Coverage</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-midnight-900 tracking-tight">
                  Industries &amp; Clients We Serve
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal-600 max-w-md leading-relaxed">
                Tailored legal, taxation, VAT, customs, and corporate governance support across commercial, industrial, non-profit, and individual matters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {content.industries.map((industry, idx) => {
                const SectorIcon =
                  idx % 3 === 0 ? Building2 : idx % 3 === 1 ? Globe2 : Landmark;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-ivory-300 hover:border-champagne-500 p-5 shadow-sm transition-all duration-300 flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <SectorIcon className="h-4 w-4 text-champagne-600" />
                      <span className="text-[11px] font-serif text-charcoal-500 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-midnight-900 leading-snug">
                      {industry}
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
