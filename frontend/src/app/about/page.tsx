import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, CheckCircle2, Eye, Target } from 'lucide-react';
import { AboutFirmSection } from '@/components/public/AboutFirmSection';
import { ExpertiseAndWhyUsSection } from '@/components/public/ExpertiseAndWhyUsSection';
import { LeadCounselCard } from '@/components/public/LeadCounselCard';
import { ProcessTimelineSection } from '@/components/public/ProcessTimelineSection';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { TrustCredibilityBar } from '@/components/public/TrustCredibilityBar';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us & Lead Counsel',
  description:
    'Meet Lead Counsel Hossain Ahmed (Khan) and explore TaxVat LawAid (Associated Practice: TaxAid), our integrated legal model, vision, mission, and six-step client process.',
};

export default async function AboutPage() {
  const { content, settings, services } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        <section className="editorial-grid-dark text-white py-14 sm:py-20 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em] mb-4">
              <span className="h-px w-8 bg-champagne-400" />
              <span>{content.aboutBadge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mb-4">
              {content.aboutHeading}
            </h1>
            <p className="text-ivory-200/90 max-w-2xl text-base sm:text-lg leading-relaxed">
              {content.aboutDescription}
            </p>
          </div>
        </section>

        <TrustCredibilityBar content={content} />
        <LeadCounselCard content={content} />

        {/* Vision & Mission */}
        <section className="py-16 sm:py-20 bg-ivory-100 border-y border-ivory-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg border border-ivory-300 bg-white p-7 sm:p-9 shadow-sm space-y-4">
              <div className="h-11 w-11 rounded bg-midnight-900 text-champagne-400 flex items-center justify-center">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-midnight-900">
                Our Vision
              </h2>
              <p className="text-charcoal-600 leading-relaxed">{content.aboutVision}</p>
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-3 rounded text-sm transition-colors"
                >
                  <Calendar className="h-4 w-4 text-champagne-400" />
                  <span>Book a Consultation</span>
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-ivory-300 bg-white p-7 sm:p-9 shadow-sm space-y-4">
              <div className="h-11 w-11 rounded bg-champagne-500 text-midnight-950 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-midnight-900">
                Our Mission
              </h2>
              <ul className="space-y-3">
                {content.aboutMission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal-700">
                    <CheckCircle2 className="h-4 w-4 text-champagne-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <AboutFirmSection content={content} />
        <ProcessTimelineSection content={content} />
        <ExpertiseAndWhyUsSection content={content} />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
