import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface AboutFirmSectionProps {
  content: WebsiteContentData;
}

export function AboutFirmSection({ content }: AboutFirmSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-ivory-100 border-y border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Editorial Narrative & 6 Core Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em]">
                <span className="h-px w-8 bg-champagne-500" />
                <span>{content.aboutBadge}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-midnight-900 tracking-tight leading-[1.14]">
                {content.aboutHeading}
              </h2>

              <p className="text-charcoal-600 text-base sm:text-[17px] leading-relaxed">
                {content.aboutDescription}
              </p>

              {/* Integrated Practice Pillars */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-3">
                  Foundational Practice Principles
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {content.coreValues.map((value, idx) => (
                    <div
                      key={value}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded bg-white border border-ivory-300 text-xs sm:text-[13px] font-semibold text-midnight-900 shadow-sm"
                    >
                      <span className="text-[11px] font-serif text-champagne-600 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-midnight-900 hover:text-champagne-700 transition-colors group"
                >
                  <span>Read Firm Profile, Vision &amp; Mission</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-champagne-600" />
                </Link>
              </div>
            </div>

            {/* Right Architectural Chamber Composition */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="rounded-lg overflow-hidden border border-ivory-300 shadow-xl shadow-midnight-900/10 bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/images/about-chamber.jpg"
                      alt="Architectural Corporate Law Atrium"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Editorial Grounded Caption Bar */}
                <div className="mt-4 bg-white border border-ivory-300 rounded-lg p-5 shadow-sm flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded bg-midnight-900 text-champagne-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-champagne-700 mb-1">
                      Integrated Legal &amp; Compliance Model
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {content.aboutVision}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
