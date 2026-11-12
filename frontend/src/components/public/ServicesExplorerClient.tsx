'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, Search } from 'lucide-react';
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
    <section className="py-14 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-800">
              Complete Practice Divisions &amp; Checklists
            </h2>
            <p className="text-sm text-slate-600">
              Explore service scope, indicative client documents, and Bangladesh statutory frameworks.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search practice areas or laws..."
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-navy-800"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((svc) => (
            <div
              key={svc._id || svc.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold">
                      {svc.categoryTag}
                    </span>
                    {svc.divisionBadge && (
                      <span className="px-2.5 py-1 rounded-full bg-brandGreen-50 text-brandGreen-700 text-xs font-semibold">
                        {svc.divisionBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold text-navy-800">{svc.title}</h3>
                  <p className="text-sm text-slate-600 mt-1.5 max-w-3xl">
                    {svc.shortDescription}
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shrink-0 self-start"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Consultation</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800 mb-3">
                    Scope of Legal &amp; Compliance Services
                  </h4>
                  <ul className="space-y-2">
                    {svc.detailedServices.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-brandGreen-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800 mb-2.5">
                      Indicative Client Document Checklist
                    </h4>
                    <ul className="space-y-1.5">
                      {svc.documentChecklist.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <span className="h-3.5 w-3.5 rounded border border-slate-400 bg-white shrink-0 mt-1" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {svc.legalFramework && (
                    <div className="rounded-xl bg-navy-50/70 border border-navy-100 p-4 text-xs sm:text-sm text-navy-900">
                      <span className="font-bold block mb-1">Applicable Legal Framework:</span>
                      <span>{svc.legalFramework}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
              No matching practice areas found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

