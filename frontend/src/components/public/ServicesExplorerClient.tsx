'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, ArrowUpRight, Search } from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServicesExplorerClientProps {
  services: ServiceItem[];
}

export function ServicesExplorerClient({ services }: ServicesExplorerClientProps) {
  const [query, setQuery] = useState('');

  const filtered = services.filter((svc) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      svc.title.toLowerCase().includes(q) ||
      svc.categoryTag.toLowerCase().includes(q) ||
      svc.shortDescription.toLowerCase().includes(q) ||
      svc.legalFramework.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-ivory-300 pb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-midnight-900">
              Complete Practice Divisions &amp; Checklists
            </h2>
            <p className="text-sm text-charcoal-600 mt-1">
              Explore service scope, indicative client documents, and Bangladesh statutory frameworks.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 text-charcoal-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search divisions, laws, or compliance..."
              className="w-full rounded border border-ivory-300 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-midnight-900"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((svc, index) => (
            <div
              key={svc._id || svc.slug}
              id={svc.slug}
              className="bg-white rounded-lg border border-ivory-300 p-6 sm:p-9 shadow-sm space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-5 border-b border-ivory-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="font-serif text-lg font-semibold text-champagne-600 tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-ivory-100 border border-ivory-300 text-midnight-900 text-xs font-bold uppercase tracking-wider">
                      {svc.categoryTag}
                    </span>
                    {svc.divisionBadge && (
                      <span className="text-xs font-medium text-charcoal-500">
                        · {svc.divisionBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-midnight-900">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="hover:text-champagne-700 transition-colors"
                    >
                      {svc.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-charcoal-600 mt-1.5 max-w-3xl leading-relaxed">
                    {svc.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 border border-ivory-300 hover:border-midnight-900 text-midnight-900 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded transition-colors"
                  >
                    <span>Division Page</span>
                    <ArrowUpRight className="h-4 w-4 text-champagne-600" />
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-midnight-900 hover:bg-midnight-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-champagne-400" />
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-3">
                    Scope of Legal &amp; Compliance Services
                  </h4>
                  <ul className="space-y-2">
                    {svc.detailedServices.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-700">
                        <CheckCircle2 className="h-4 w-4 text-champagne-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-ivory-100 border border-ivory-300 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight-900 mb-2.5">
                      Indicative Client Document Checklist
                    </h4>
                    <ul className="space-y-1.5">
                      {svc.documentChecklist.map((doc, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-midnight-900 shrink-0 mt-2" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {svc.legalFramework && (
                    <div className="rounded-lg bg-midnight-50 border border-midnight-100 p-4 text-xs sm:text-sm text-midnight-900">
                      <span className="font-bold block mb-1">Applicable Legal Framework:</span>
                      <span>{svc.legalFramework}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-charcoal-500 bg-white rounded-lg border border-ivory-300">
              No matching practice division found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
