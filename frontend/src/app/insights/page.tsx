import React from 'react';
import type { Metadata } from 'next';
import { InsightsExplorerClient } from '@/components/public/InsightsExplorerClient';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights & Legal Knowledge Center',
  description:
    'Verified tax updates, VAT compliance notes, customs regulations, RJSC company law resources, and business compliance guidance from TaxVat LawAid.',
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { content, settings, services, articles } = await fetchPublicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        <section className="editorial-grid-dark text-white py-14 sm:py-20 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2.5 text-champagne-400 text-xs font-bold uppercase tracking-[0.18em] mb-4">
              <span className="h-px w-8 bg-champagne-400" />
              <span>Legal Knowledge Center</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mb-4">
              Insights, Statutory Updates &amp; Compliance Briefings
            </h1>
            <p className="text-ivory-200/90 max-w-2xl text-base sm:text-lg leading-relaxed">
              Verified regulatory briefs across Income Tax, VAT &amp; Mushak, Customs, Corporate Governance, and High Court practice in Bangladesh.
            </p>
          </div>
        </section>

        <InsightsExplorerClient
          articles={articles}
          initialCategory={category || 'All'}
        />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
