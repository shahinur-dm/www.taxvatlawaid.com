import React from 'react';
import Link from 'next/link';
import { ArrowDown, Calendar } from 'lucide-react';
import { WebsiteContentData } from '@/types';

interface HeroSectionProps {
  content: WebsiteContentData;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero-grid-pattern text-white pt-14 pb-24 sm:pt-20 sm:pb-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-xs sm:text-sm font-medium text-slate-100 mb-6">
            <span className="h-2 w-2 rounded-full bg-brandGreen-500" />
            <span>{content.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mb-6">
            {content.heroHeading}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl">
            {content.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-brandRed-600 hover:bg-brandRed-700 text-white font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-black/20 transition-all text-sm sm:text-base"
            >
              <Calendar className="h-4 w-4" />
              <span>{content.heroPrimaryCta}</span>
            </Link>

            <Link
              href="#practice-areas"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-lg backdrop-blur-sm transition-all text-sm sm:text-base"
            >
              <span>{content.heroSecondaryCta}</span>
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

