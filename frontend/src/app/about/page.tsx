import React from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, Target, Eye } from 'lucide-react';
import { AboutProcessSection } from '@/components/public/AboutProcessSection';
import { ExpertiseAndWhyUsSection } from '@/components/public/ExpertiseAndWhyUsSection';
import { LeadCounselCard } from '@/components/public/LeadCounselCard';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { content, settings } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} />
      <main className="flex-1">
        <section className="hero-grid-pattern text-white py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold mb-4">
              {content.aboutBadge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mb-4">
              {content.aboutHeading}
            </h1>
            <p className="text-slate-200 max-w-2xl text-base sm:text-lg leading-relaxed">
              {content.aboutDescription}
            </p>
          </div>
        </section>

        <LeadCounselCard content={content} />

        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
              <div className="h-11 w-11 rounded-xl bg-navy-800 text-white flex items-center justify-center">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy-800">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">{content.aboutVision}</p>
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white font-semibold px-5 py-3 rounded-lg text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book a Consultation</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-11 w-11 rounded-xl bg-brandGreen-600 text-white flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy-800">Our Mission</h2>
              <ul className="space-y-3">
                {content.aboutMission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-brandGreen-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <AboutProcessSection content={content} />
        <ExpertiseAndWhyUsSection content={content} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

