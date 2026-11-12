import React from 'react';
import { ContactSection } from '@/components/public/ContactSection';
import { LeadCounselCard } from '@/components/public/LeadCounselCard';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const { content, settings } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} />
      <main className="flex-1">
        <section className="hero-grid-pattern text-white py-14 sm:py-18 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Chamber &amp; Contact Information
            </h1>
            <p className="text-slate-200 max-w-2xl text-base">
              Reach our Ramna, Dhaka chamber by phone, WhatsApp, email, or schedule an online or in-person consultation.
            </p>
          </div>
        </section>
        <LeadCounselCard content={content} />
        <div className="pt-8">
          <ContactSection content={content} settings={settings} />
        </div>
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

