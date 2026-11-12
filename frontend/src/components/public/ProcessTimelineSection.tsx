'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { WebsiteContentData } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface ProcessTimelineSectionProps {
  content: WebsiteContentData;
}

export function ProcessTimelineSection({ content }: ProcessTimelineSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="process" className="py-20 sm:py-24 bg-white border-t border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                <span className="h-px w-8 bg-champagne-500" />
                <span>Disciplined Engagement Methodology</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-midnight-900 tracking-tight">
                Six-Step Client Service Process
              </h2>
            </div>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-md leading-relaxed">
              Every matter follows a transparent, documented legal workflow from initial document review through formal filing, representation, and deadline closure.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.sixStepProcess.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <RevealOnScroll key={item.step} delayMs={idx * 75}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full h-full text-left rounded-lg border p-7 transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-midnight-900 text-white border-midnight-900 shadow-xl shadow-midnight-900/15 -translate-y-0.5'
                      : 'bg-ivory-50 text-midnight-900 border-ivory-300 hover:border-champagne-500 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                          isActive ? 'text-champagne-400' : 'text-champagne-700'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`font-serif text-2xl font-semibold tabular-nums ${
                          isActive ? 'text-champagne-400/90' : 'text-ivory-300'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-xl font-semibold mb-2.5 ${
                        isActive ? 'text-white' : 'text-midnight-900'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? 'text-ivory-200/90' : 'text-charcoal-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                      isActive
                        ? 'border-white/15 text-champagne-300'
                        : 'border-ivory-200 text-charcoal-500'
                    }`}
                  >
                    <span>Structured Chamber Stage</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delayMs={150}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-ivory-100 border border-ivory-300 px-6 py-5">
            <p className="text-sm text-charcoal-700">
              Ready to initiate <strong className="text-midnight-900">Step 01 (Initial Consultation)</strong> with our chamber desk?
            </p>
            <Link
              href="#booking"
              className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded transition-colors"
            >
              <Calendar className="h-4 w-4 text-champagne-400" />
              <span>Schedule Initial Consultation</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
