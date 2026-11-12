'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-ivory-100 border-t border-ivory-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-champagne-700 text-xs font-bold uppercase tracking-[0.18em] mb-3">
              <HelpCircle className="h-4 w-4" />
              <span>Common Client Questions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-midnight-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-xl mx-auto">
              Clear procedural guidance on tax, VAT, customs appeals, RJSC incorporations, and engaging our Dhaka chamber.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <RevealOnScroll key={idx} delayMs={idx * 45}>
                <div
                  className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-champagne-500 shadow-md shadow-midnight-900/5'
                      : 'bg-white border-ivory-300 hover:border-champagne-400'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-serif text-sm font-semibold text-champagne-600 tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-semibold text-midnight-900 leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-champagne-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-midnight-900' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-editorial ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-1 pl-14 text-sm sm:text-[15px] text-charcoal-600 leading-relaxed border-t border-ivory-200">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
