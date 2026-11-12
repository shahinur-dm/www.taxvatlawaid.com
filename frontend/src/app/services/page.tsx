import React from 'react';
import { ServicesExplorerClient } from '@/components/public/ServicesExplorerClient';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const { content, settings, services } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} />
      <main className="flex-1">
        <section className="hero-grid-pattern text-white py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold mb-4">
              Bangladesh Legal &amp; Compliance Practice
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mb-4">
              Our Legal, Taxation, VAT, Customs &amp; Corporate Services
            </h1>
            <p className="text-slate-200 max-w-2xl text-base sm:text-lg">
              Coordinated legal advisory, return preparation, regulatory registration, IP protection, and dispute representation.
            </p>
          </div>
        </section>

        <ServicesExplorerClient services={services} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

