'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { PublicSettings, WebsiteContentData } from '@/types';
import { AnnouncementBanner } from './AnnouncementBanner';

interface SiteHeaderProps {
  content: WebsiteContentData;
  settings: PublicSettings;
}

export function SiteHeader({ content, settings }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Practice Areas', href: '/#practice-areas' },
    { label: 'Services', href: '/services' },
    { label: 'About & Process', href: '/about' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact' },
  ];

  const whatsappDigits = content.contactWhatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      <AnnouncementBanner
        enabled={settings.announcementEnabled}
        text={settings.announcementText}
      />

      {/* Top Navy Contact Bar */}
      <div className="bg-navy-800 text-white text-xs border-b border-navy-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div className="flex items-center gap-1.5 text-slate-200 truncate">
            <MapPin className="h-3.5 w-3.5 text-lime-400 shrink-0" />
            <span className="truncate">{content.officeAddress}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-200 shrink-0">
            <a
              href={`tel:${content.contactPhone}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-lime-400" />
              <span>{content.contactPhone}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-brandGreen-500" />
              <span>{content.contactWhatsapp}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href={`mailto:${content.contactEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-amber-300" />
              <span>{content.contactEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/images/taxvat-logo.svg"
              alt={`${content.brandName} Logo`}
              className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
            />
            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-extrabold tracking-tight">
                <span className="text-brandRed-600">Tax</span>
                <span className="text-brandGreen-600">Vat</span>{' '}
                <span className="text-navy-800">LawAid</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:block">
                {content.brandTagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-navy-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-brandRed-600 hover:bg-brandRed-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 w-full bg-brandRed-600 text-white text-sm font-semibold px-4 py-3 rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

