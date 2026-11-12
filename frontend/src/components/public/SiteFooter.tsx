import React from 'react';
import Link from 'next/link';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { WebsiteContentData } from '@/types';

interface SiteFooterProps {
  content: WebsiteContentData;
}

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="bg-navy-800 text-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-navy-700">
          {/* Column 1: Brand & Lead Counsel */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/taxvat-logo.svg"
                alt={content.brandName}
                className="h-12 w-12 bg-white rounded-full p-1"
              />
              <div>
                <div className="text-lg font-extrabold tracking-tight">
                  <span className="text-brandRed-500">Tax</span>
                  <span className="text-brandGreen-500">Vat</span>{' '}
                  <span className="text-white">LawAid</span>
                </div>
                <p className="text-xs font-semibold text-brandGreen-400">
                  Associated Practice: {content.associatedPractice}
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 space-y-1 leading-relaxed">
              <p className="font-bold text-white">
                {content.leadCounselName},{' '}
                <span className="font-normal text-slate-300">
                  {content.leadCounselCredentials}
                </span>
              </p>
              <p>{content.footerDescription}</p>
            </div>
          </div>

          {/* Column 2: Chamber & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Chamber &amp; Contact
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />
                <span>{content.officeAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brandGreen-500 shrink-0" />
                <span>
                  <a href={`tel:${content.contactPhone}`} className="hover:text-white">
                    {content.contactPhone}
                  </a>{' '}
                  /{' '}
                  <a href={`tel:${content.contactWhatsapp}`} className="hover:text-white">
                    {content.contactWhatsapp}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brandRed-500 shrink-0" />
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white">
                  {content.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-lime-400 shrink-0" />
                <span>{content.websiteUrl}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/booking" className="hover:text-white transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Practice Areas &amp; Checklists
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About &amp; Our 6-Step Process
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Client FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Chamber Directions &amp; Hours
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/admin/login"
                  className="text-slate-400 hover:text-white text-xs transition-colors"
                >
                  Chamber Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-400">
          <p>{content.copyrightText}</p>
          <p className="sm:text-right">{content.footerDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

