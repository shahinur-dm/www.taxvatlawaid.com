import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, FileText } from 'lucide-react';
import { ARTICLE_CATEGORIES, ArticleItem } from '@/types';
import { RevealOnScroll } from './RevealOnScroll';

interface InsightsSectionProps {
  articles: ArticleItem[];
}

export function InsightsSection({ articles }: InsightsSectionProps) {
  const published = articles.slice(0, 3);

  return (
    <section id="insights" className="py-20 sm:py-24 bg-white border-t border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 text-champagne-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">
                <BookOpen className="h-4 w-4" />
                <span>Insights &amp; Legal Knowledge Center</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-midnight-900 tracking-tight mb-3">
                Statutory Briefings &amp; Practice Guidelines
              </h2>
              <p className="text-charcoal-600 text-base leading-relaxed">
                Structured legal resources covering Bangladesh Income Tax, VAT, Customs regulations, RJSC corporate governance, and procedural guidance.
              </p>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-midnight-900 hover:text-champagne-700 transition-colors shrink-0 group"
            >
              <span>Visit Knowledge Center</span>
              <ArrowRight className="h-4 w-4 text-champagne-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </RevealOnScroll>

        {/* Curated Knowledge Pillars */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ARTICLE_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/insights?category=${encodeURIComponent(category)}`}
              className="px-3.5 py-1.5 rounded bg-ivory-100 border border-ivory-300 hover:border-champagne-500 text-xs font-semibold text-midnight-900 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        {published.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {published.map((article, idx) => (
              <RevealOnScroll key={article._id} delayMs={idx * 80}>
                <article className="h-full bg-ivory-50 rounded-lg border border-ivory-300 hover:border-champagne-500 p-7 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-4">
                      <span className="font-bold uppercase tracking-wider text-champagne-700">
                        {article.category}
                      </span>
                      {article.publishedAt && (
                        <span className="text-charcoal-500">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-midnight-900 mb-3 leading-snug group-hover:text-champagne-700 transition-colors">
                      <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-3 mb-5">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory-200 flex items-center justify-between text-xs font-semibold">
                    <span className="text-charcoal-500 truncate max-w-[180px]">
                      {article.statutoryReference || article.authorName}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1 text-midnight-900 hover:text-champagne-700 shrink-0"
                    >
                      <span>Read Briefing</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <RevealOnScroll>
            <div className="rounded-lg border border-ivory-300 bg-ivory-100 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-champagne-700">
                  <FileText className="h-4 w-4" />
                  <span>Chamber Editorial Desk</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-midnight-900">
                  Verified Legal Publications &amp; Statutory Notes
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                  Our Legal Knowledge Center is structured to publish verified Finance Act updates, NBR circulars, VAT/Mushak procedural notes, customs SRO briefings, and RJSC compliance checklists directly by chamber counsel—without unverified commentary.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/insights"
                  className="inline-flex items-center justify-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-3 rounded text-sm transition-colors"
                >
                  <span>Explore Topic Directory</span>
                  <ArrowRight className="h-4 w-4 text-champagne-400" />
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-ivory-50 border border-ivory-300 text-midnight-900 font-semibold px-5 py-3 rounded text-sm transition-colors"
                >
                  <Calendar className="h-4 w-4 text-champagne-600" />
                  <span>Request Direct Legal Advice</span>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
