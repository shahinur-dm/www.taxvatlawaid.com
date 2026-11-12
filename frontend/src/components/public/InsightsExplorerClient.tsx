'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Search } from 'lucide-react';
import { ARTICLE_CATEGORIES, ArticleItem } from '@/types';

interface InsightsExplorerClientProps {
  articles: ArticleItem[];
  initialCategory?: string;
}

export function InsightsExplorerClient({
  articles,
  initialCategory = 'All',
}: InsightsExplorerClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.statutoryReference.toLowerCase().includes(q)
      );
    });
  }, [articles, selectedCategory, query]);

  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-ivory-300">
          <div className="flex flex-wrap gap-2">
            {['All', ...ARTICLE_CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded text-xs font-semibold transition-all border ${
                    active
                      ? 'bg-midnight-900 text-white border-midnight-900'
                      : 'bg-white text-midnight-900 border-ivory-300 hover:border-champagne-500'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="h-4 w-4 text-charcoal-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search briefings..."
              className="w-full rounded border border-ivory-300 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-midnight-900"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <article
                key={article._id}
                className="bg-white rounded-lg border border-ivory-300 hover:border-champagne-500 p-7 shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-3">
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
                  <h2 className="font-serif text-xl font-semibold text-midnight-900 mb-3 leading-snug group-hover:text-champagne-700 transition-colors">
                    <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-5 line-clamp-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory-200 flex items-center justify-between text-xs font-semibold">
                  <span className="text-charcoal-500 truncate max-w-[190px]">
                    {article.statutoryReference || article.authorName}
                  </span>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 text-midnight-900 hover:text-champagne-700"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-ivory-300 p-10 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-ivory-100 border border-ivory-300 text-champagne-600 flex items-center justify-center mx-auto">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-midnight-900">
              {articles.length === 0
                ? 'Legal Knowledge Center Ready for Verified Publications'
                : 'No Briefings Match Your Filter'}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              {articles.length === 0
                ? 'To maintain strict statutory accuracy under current Bangladesh law, verified updates on Income Tax, VAT, Customs, and RJSC compliance will appear here directly as published by chamber counsel.'
                : 'Try selecting another practice topic or clearing your search query.'}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-ivory-300 hover:border-midnight-900 text-midnight-900 font-semibold px-5 py-2.5 rounded text-sm"
              >
                <span>Browse Practice Areas &amp; Checklists</span>
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white font-semibold px-5 py-2.5 rounded text-sm"
              >
                <Calendar className="h-4 w-4 text-champagne-400" />
                <span>Consult Chamber Directly</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
