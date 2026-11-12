import React from 'react';
import type { Metadata } from 'next';
import { BookingSection } from '@/components/public/BookingSection';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Reserve a 30-minute legal consultation slot (Chamber Visit, Video Call, or Phone Call) Sunday–Thursday, 3:00 PM – 8:00 PM Asia/Dhaka.',
};

export default async function BookingPage() {
  const { content, settings, services } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        <section className="editorial-grid-dark text-white py-14 sm:py-16 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em] mb-3">
              <span className="h-px w-8 bg-champagne-400" />
              <span>Client Intake &amp; Scheduling</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-3">
              Book a Consultation
            </h1>
            <p className="text-ivory-200/90 text-sm sm:text-base max-w-2xl">
              Reserve an appointment with {content.leadCounselName} ({settings.officeHoursText}).
            </p>
          </div>
        </section>
        <BookingSection content={content} settings={settings} />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
