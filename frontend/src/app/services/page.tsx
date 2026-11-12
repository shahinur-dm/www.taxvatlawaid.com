import React from 'react';
import type { Metadata } from 'next';
import { ServicesExplorerClient } from '@/components/public/ServicesExplorerClient';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Practice Areas & Legal Services',
  description:
    'Explore TaxVat LawAid six core divisions: Income Tax, VAT & Supplementary Duty, Customs & International Trade, RJSC Company Law, Investment/IP, and High Court Litigation.',
};

export default async function ServicesPage() {
  const { content, settings, services } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        <section className="editorial-grid-dark text-white py-14 sm:py-20 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em] mb-4">
              <span className="h-px w-8 bg-champagne-400" />
              <span>Bangladesh Legal &amp; Compliance Practice</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-4xl mb-4">
              Legal, Taxation, VAT, Customs &amp; Corporate Services
            </h1>
            <p className="text-ivory-200/90 max-w-2xl text-base sm:text-lg leading-relaxed">
              Coordinated legal advisory, return preparation, regulatory registration, IP protection, and dispute representation.
            </p>
          </div>
        </section>

        <ServicesExplorerClient services={services} />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
