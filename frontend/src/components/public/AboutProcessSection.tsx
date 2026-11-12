import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WebsiteContentData } from '@/types';

interface AboutProcessSectionProps {
  content: WebsiteContentData;
}

export function AboutProcessSection({ content }: AboutProcessSectionProps) {
  return (
    <section id="about-process" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: About & Values */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-brandGreen-50 border border-brandGreen-200 text-brandGreen-700 text-xs font-bold uppercase tracking-wider">
              {content.aboutBadge}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight leading-tight">
              {content.aboutHeading}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {content.aboutDescription}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {content.coreValues.map((value) => (
                <span
                  key={value}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-navy-800"
                >
                  {value}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-800 hover:text-brandRed-600 transition-colors"
              >
                <span>Read Our Full Vision, Mission &amp; Practice Standards</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Six-Step Client Service Process */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-800 mb-6">
              Our Six-Step Client Service Process
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.sixStepProcess.map((item) => {
                const labelColor =
                  item.accent === 'red'
                    ? 'text-brandRed-600'
                    : item.accent === 'green'
                      ? 'text-brandGreen-600'
                      : 'text-navy-700';

                return (
                  <div
                    key={item.step}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
                  >
                    <div className={`text-xs font-extrabold uppercase tracking-wider mb-1 ${labelColor}`}>
                      {item.step}
                    </div>
                    <h4 className="font-bold text-navy-800 text-base mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

