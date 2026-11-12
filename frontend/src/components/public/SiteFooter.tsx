import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { FALLBACK_SERVICES } from '@/lib/defaults';
import { ServiceItem, WebsiteContentData } from '@/types';
import { TaxAidBrand } from './TaxAidBrand';

interface SiteFooterProps {
  content: WebsiteContentData;
  services?: ServiceItem[];
}

export function SiteFooter({ content, services }: SiteFooterProps) {
  const divisions = services && services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <footer className="bg-midnight-950 text-ivory-200 pt-16 pb-10 border-t border-champagne-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Preserved Logo & Firm Narrative */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white p-0.5 ring-1 ring-champagne-400/50 shrink-0">
                <img
                  src="/images/taxvat-logo.svg"
                  alt={content.brandName}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">
                  <span className="text-brandRed-500">Tax</span>
                  <span className="text-brandGreen-500">Vat</span>{' '}
                  <span className="text-white">LawAid</span>
                </div>
                <p className="text-xs font-medium text-champagne-400">
                  Associated Practice: <TaxAidBrand darkBg={true} />
                </p>
              </div>
            </Link>

            <div className="text-xs sm:text-sm text-ivory-200/80 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">
                {content.leadCounselName}{' '}
                <span className="font-normal text-ivory-200/75">
                  ({content.leadCounselCredentials})
                </span>
              </p>
              <p>{content.footerDescription}</p>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-semibold px-5 py-2.5 rounded text-xs sm:text-sm transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Consultation</span>
            </Link>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ivory-200/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  Client Process
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Client FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Chamber
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-400">
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ivory-200/80">
              {divisions.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="hover:text-white transition-colors line-clamp-1"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Chamber Address & Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-400">
              Chamber &amp; Hours
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-champagne-400 shrink-0 mt-0.5" />
                <span>{content.officeAddress}, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-champagne-400 shrink-0" />
                <span>
                  <a href="tel:01614446444" className="hover:text-white">
                    01614446444
                  </a>{' '}
                  /{' '}
                  <a href="tel:01343226633" className="hover:text-white">
                    01343226633
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-champagne-400 shrink-0" />
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white">
                  {content.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-champagne-400 shrink-0" />
                <span>Sun – Thu · 3:00 PM – 8:00 PM (BST)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-champagne-400 shrink-0" />
                <span>{content.websiteUrl}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright, Disclaimer & Admin Access */}
        <div className="pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs text-ivory-200/60">
          <div className="space-y-1">
            <p>{content.copyrightText}</p>
            <p className="text-ivory-200/50">{content.footerDisclaimer}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link href="/booking" className="hover:text-champagne-300 transition-colors">
              Online Booking
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-champagne-300 transition-colors">
              Chamber Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
