import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';
import { SiteFooter } from '@/components/public/SiteFooter';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchPublicArticleBySlug, fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchPublicArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found' };
  }
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ content, settings, services }, article] = await Promise.all([
    fetchPublicSiteData(),
    fetchPublicArticleBySlug(slug),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} services={services} />
      <main className="flex-1 bg-ivory-100">
        <section className="editorial-grid-dark text-white py-14 sm:py-18 border-b border-champagne-500/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:text-white mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Insights &amp; Briefings</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              <span className="px-2.5 py-1 rounded bg-white/10 border border-champagne-400/40 text-champagne-300 font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              {article.publishedAt && (
                <span className="text-ivory-200/80">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-ivory-200/90 text-base sm:text-lg leading-relaxed">
              {article.summary}
            </p>
          </div>
        </section>

        <article className="py-14 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-white rounded-lg border border-ivory-300 p-7 sm:p-10 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-ivory-200 text-xs text-charcoal-500">
                <div>
                  Author: <strong className="text-midnight-900">{article.authorName}</strong>
                </div>
                {article.statutoryReference && (
                  <div className="inline-flex items-center gap-1.5 text-champagne-700 font-semibold">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{article.statutoryReference}</span>
                  </div>
                )}
              </div>

              <div className="prose prose-slate max-w-none text-charcoal-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {article.content}
              </div>

              <div className="pt-6 border-t border-ivory-200 text-xs text-charcoal-500">
                {content.footerDisclaimer}
              </div>
            </div>

            <div className="bg-midnight-900 text-white rounded-lg p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-champagne-400 mb-1">
                  Need Case-Specific Legal Counsel?
                </div>
                <div className="font-serif text-xl font-semibold">
                  Schedule a Consultation With Our Chamber
                </div>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-semibold px-5 py-3 rounded text-sm shrink-0"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
