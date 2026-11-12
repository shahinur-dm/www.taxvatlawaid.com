import React from 'react';
import Link from 'next/link';
import { ArrowDownRight, Calendar, Clock, Shield } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { TaxAidBrand } from './TaxAidBrand';

interface HeroSectionProps {
  content: WebsiteContentData;
}

export function HeroSection({ content }: HeroSectionProps) {
  const headline =
    content.heroHeading &&
    !content.heroHeading.startsWith('Integrated Legal, Taxation, Regulatory')
      ? content.heroHeading
      : 'Strategic Legal Counsel. Trusted Business Protection.';

  return (
    <section className="relative min-h-[680px] lg:min-h-[760px] flex items-center bg-midnight-900 text-white overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-28">
      {/* Architectural Legal Chamber Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-chamber.jpg"
          alt="TaxVat LawAid Executive Legal Chamber"
          className="h-full w-full object-cover object-center opacity-55 scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-900/90 to-midnight-900/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-midnight-950/50"
        />
      </div>

      {/* Subtle architectural hairline frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne-500/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 text-champagne-300 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            <span className="h-px w-8 bg-champagne-400" />
            <span>{content.heroBadge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.08] text-white mb-6">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-ivory-200/90 leading-relaxed mb-10 max-w-2xl font-normal">
            {content.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-semibold px-7 py-4 rounded transition-all text-sm tracking-wide shadow-xl shadow-black/25"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a Consultation</span>
            </Link>

            <Link
              href="#practice-areas"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-champagne-400 hover:bg-white/5 text-white font-medium px-7 py-4 rounded transition-all text-sm tracking-wide"
            >
              <span>Explore Our Expertise</span>
              <ArrowDownRight className="h-4 w-4 text-champagne-300" />
            </Link>
          </div>

          {/* Grounded Chamber Availability Strip */}
          <div className="pt-7 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-[13px] text-ivory-200/80">
            <div className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-champagne-400 shrink-0" />
              <span>Chamber Hours: Sun – Thu, 3:00 PM – 8:00 PM (BST)</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-champagne-400 shrink-0" />
              <span>
                Associated Practice: <TaxAidBrand darkBg={true} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
