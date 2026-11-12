import React from 'react';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/public/ContactSection';
import { LeadCounselCard } from '@/components/public/LeadCounselCard';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact & Dhaka Chamber',
  description:
    'Visit TaxVat LawAid & TaxAid at 14/7, Eastern Mansion, Lift-14, 67/9, Pioneer Road, Ramna, Dhaka or reach us by phone, WhatsApp, or email.',
};

export default async function ContactPage() {
  const { content, settings, services } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        <section className="editorial-grid-dark text-white py-14 sm:py-18 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em] mb-3">
              <span className="h-px w-8 bg-champagne-400" />
              <span>Ramna, Dhaka Chamber</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-3">
              Chamber &amp; Contact Information
            </h1>
            <p className="text-ivory-200/90 max-w-2xl text-base leading-relaxed">
              Reach our Ramna, Dhaka chamber by phone, WhatsApp, email, written inquiry, or schedule an online or in-person consultation.
            </p>
          </div>
        </section>
        <ContactSection content={content} settings={settings} />
        <LeadCounselCard content={content} />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
