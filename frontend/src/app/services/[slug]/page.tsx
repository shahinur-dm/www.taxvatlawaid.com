import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Scale,
} from 'lucide-react';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { services } = await fetchPublicSiteData();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Practice Division Not Found',
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, settings, services } = await fetchPublicSiteData();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1">
        {/* Editorial Division Header */}
        <section className="editorial-grid-dark text-white py-14 sm:py-20 border-b border-champagne-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Practice Divisions</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-white/10 border border-champagne-400/40 text-champagne-300 text-xs font-semibold uppercase tracking-wider">
                {service.categoryTag}
              </span>
              {service.divisionBadge && (
                <span className="px-3 py-1 rounded bg-midnight-800 border border-white/15 text-ivory-200 text-xs font-medium">
                  {service.divisionBadge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-4xl mb-4">
              {service.title}
            </h1>
            <p className="text-ivory-200/90 max-w-3xl text-base sm:text-lg leading-relaxed mb-8">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-semibold px-6 py-3 rounded text-sm transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Book a Consultation</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-champagne-400 text-white font-medium px-6 py-3 rounded text-sm transition-colors"
              >
                <span>Submit Chamber Inquiry</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Scope & Document Checklist */}
        <section className="py-16 sm:py-20 bg-ivory-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-lg border border-ivory-300 p-7 sm:p-9 shadow-sm space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-champagne-700">
                  <Scale className="h-4 w-4" />
                  <span>Scope of Legal &amp; Compliance Services</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-midnight-900">
                  How TaxVat LawAid Supports This Division
                </h2>
                <ul className="space-y-3.5 pt-2">
                  {service.detailedServices.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded bg-ivory-50 border border-ivory-200 text-sm sm:text-[15px] text-charcoal-800"
                    >
                      <CheckCircle2 className="h-5 w-5 text-champagne-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.legalFramework && (
                <div className="bg-midnight-900 text-white rounded-lg border border-champagne-500/30 p-7 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-champagne-400">
                    Applicable Statutory &amp; Regulatory Framework
                  </div>
                  <p className="text-sm sm:text-base text-ivory-200 leading-relaxed">
                    {service.legalFramework}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-lg border border-ivory-300 p-7 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-champagne-700">
                  <FileText className="h-4 w-4" />
                  <span>Indicative Client Document Checklist</span>
                </div>
                <p className="text-xs text-charcoal-500">
                  Prepare applicable records from below ahead of your consultation:
                </p>
                <ul className="space-y-2.5 pt-1">
                  {service.documentChecklist.map((doc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-charcoal-700 pb-2.5 border-b border-ivory-200 last:border-b-0 last:pb-0"
                    >
                      <span className="font-serif text-xs font-semibold text-champagne-600 mt-0.5 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Practice Divisions */}
              <div className="bg-white rounded-lg border border-ivory-300 p-7 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-semibold text-midnight-900">
                  Other Legal Divisions
                </h3>
                <div className="space-y-2">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded bg-ivory-50 hover:bg-ivory-100 border border-ivory-200 text-xs sm:text-sm font-medium text-midnight-900 transition-colors"
                    >
                      <span className="truncate">{rel.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-champagne-600 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
