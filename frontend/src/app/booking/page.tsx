import React from 'react';
import { BookingSection } from '@/components/public/BookingSection';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
  const { content, settings } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} />
      <main className="flex-1">
        <section className="hero-grid-pattern text-white py-12 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Book a Consultation
            </h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl">
              Reserve an appointment with {content.leadCounselName} ({settings.officeHoursText}).
            </p>
          </div>
        </section>
        <BookingSection content={content} settings={settings} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

