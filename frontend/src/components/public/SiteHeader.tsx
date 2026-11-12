'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { FALLBACK_SERVICES } from '@/lib/defaults';
import { PublicSettings, ServiceItem, WebsiteContentData } from '@/types';
import { AnnouncementBanner } from './AnnouncementBanner';
import { TaxAidBrand } from './TaxAidBrand';

interface SiteHeaderProps {
  content: WebsiteContentData;
  settings: PublicSettings;
  services?: ServiceItem[];
  transparentOverHero?: boolean;
}

export function SiteHeader({
  content,
  settings,
  services,
  transparentOverHero = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);
  const [practiceMenuOpen, setPracticeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const divisions = services && services.length > 0 ? services : FALLBACK_SERVICES;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPracticeMenuOpen(false);
  }, [pathname]);

  const isTransparent = transparentOverHero && !scrolled;

  const whatsappDigits = (content.contactWhatsapp || '01614446444').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits.startsWith('88') ? whatsappDigits : `88${whatsappDigits}`}`;

  const openDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setPracticeMenuOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setPracticeMenuOpen(false);
    }, 150);
  };

  const navLinkClass = (active: boolean) =>
    `relative text-[13px] font-medium tracking-wide transition-colors py-1 whitespace-nowrap ${
      isTransparent
        ? active
          ? 'text-champagne-300'
          : 'text-ivory-100/90 hover:text-white'
        : active
          ? 'text-midnight-900 font-semibold'
          : 'text-charcoal-600 hover:text-midnight-900'
    }`;

  return (
    <header
      className={`${
        transparentOverHero ? 'fixed top-0 inset-x-0' : 'sticky top-0'
      } z-50 w-full transition-all duration-300`}
    >
      <AnnouncementBanner
        enabled={settings.announcementEnabled}
        text={settings.announcementText}
      />

      {/* Refined Chamber Contact Strip */}
      <div
        className={`transition-colors duration-300 border-b text-[11.5px] ${
          isTransparent
            ? 'bg-midnight-950/70 backdrop-blur-md border-white/10 text-ivory-200'
            : 'bg-midnight-900 border-midnight-800 text-ivory-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div className="flex items-center gap-2 truncate text-ivory-200/90">
            <MapPin className="h-3.5 w-3.5 text-champagne-400 shrink-0" />
            <span className="truncate">{content.officeAddress}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 shrink-0">
            <a
              href="tel:01614446444"
              className="inline-flex items-center gap-1.5 hover:text-champagne-300 transition-colors"
            >
              <Phone className="h-3 w-3 text-champagne-400" />
              <span>01614446444 / 01343226633</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-champagne-300 transition-colors"
            >
              <MessageCircle className="h-3 w-3 text-emerald-400" />
              <span>{content.contactWhatsapp}</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href={`mailto:${content.contactEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-champagne-300 transition-colors"
            >
              <Mail className="h-3 w-3 text-champagne-400" />
              <span>{content.contactEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 border-b ${
          isTransparent
            ? 'bg-midnight-900/45 backdrop-blur-md border-white/10 text-white'
            : 'bg-white/95 backdrop-blur-md border-ivory-300 text-midnight-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-3">
          {/* Preserved Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-champagne-400/40 flex items-center justify-center shrink-0">
              <img
                src="/images/taxvat-logo.svg"
                alt={`${content.brandName} Logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-lg sm:text-[19px] font-bold tracking-tight flex items-baseline gap-1">
                <span>
                  <span className="text-brandRed-500">Tax</span>
                  <span className="text-brandGreen-500">Vat</span>
                </span>
                <span className={isTransparent ? 'text-white' : 'text-midnight-900'}>
                  LawAid
                </span>
              </div>
              <p
                className={`text-[10.5px] font-medium hidden xl:block tracking-wide ${
                  isTransparent ? 'text-ivory-200/80' : 'text-charcoal-500'
                }`}
              >
                Associated Practice: <TaxAidBrand darkBg={isTransparent} />
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-6"
          >
            <Link href="/" className={navLinkClass(pathname === '/')}>
              Home
            </Link>
            <Link href="/about" className={navLinkClass(pathname === '/about')}>
              About Us
            </Link>

            {/* Practice Areas Dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                onClick={() => setPracticeMenuOpen((v) => !v)}
                aria-expanded={practiceMenuOpen}
                className={`inline-flex items-center gap-1 ${navLinkClass(
                  pathname.startsWith('/services')
                )}`}
              >
                <span>Practice Areas</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    practiceMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {practiceMenuOpen && (
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[480px] z-50"
                >
                  <div className="bg-white rounded-lg border border-ivory-300 shadow-2xl shadow-midnight-900/15 overflow-hidden text-charcoal-800">
                    <div className="px-5 py-3 bg-ivory-100 border-b border-ivory-300 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-900">
                        20 Practice Divisions &amp; Services
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-champagne-700 hover:text-midnight-900 inline-flex items-center gap-1"
                      >
                        <span>All Services</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="p-2 divide-y divide-ivory-200 max-h-[380px] overflow-y-auto">
                      {divisions.map((svc, idx) => (
                        <Link
                          key={svc.slug}
                          href={`/services/${svc.slug}`}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-ivory-100 transition-colors group"
                        >
                          <span className="text-[11px] font-serif font-semibold text-champagne-600 pt-0.5 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-midnight-900 group-hover:text-champagne-700 transition-colors">
                              {svc.title}
                            </div>
                            <div className="text-[11px] text-charcoal-500 line-clamp-1">
                              {svc.categoryTag} · {svc.divisionBadge}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/services" className={navLinkClass(pathname === '/services')}>
              Our Services
            </Link>
            <Link href="/#process" className={navLinkClass(false)}>
              Our Process
            </Link>
            <Link
              href="/insights"
              className={navLinkClass(pathname.startsWith('/insights'))}
            >
              Insights
            </Link>
            <Link href="/#faq" className={navLinkClass(false)}>
              FAQ
            </Link>
            <Link href="/contact" className={navLinkClass(pathname === '/contact')}>
              Contact
            </Link>
          </nav>

          {/* CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/booking"
              className={`hidden sm:inline-flex items-center gap-2 text-xs xl:text-[13px] font-semibold px-4 xl:px-5 py-2.5 rounded transition-all tracking-wide ${
                isTransparent
                  ? 'bg-champagne-500 hover:bg-champagne-400 text-midnight-950 shadow-lg shadow-black/20'
                  : 'bg-midnight-900 hover:bg-midnight-800 text-white shadow-sm border border-champagne-500/30'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book an Appointment</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className={`lg:hidden p-2 rounded border transition-colors ${
                isTransparent
                  ? 'border-white/25 text-white hover:bg-white/10'
                  : 'border-ivory-300 text-midnight-900 hover:bg-ivory-100'
              }`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-ivory-300 shadow-2xl max-h-[82vh] overflow-y-auto text-midnight-900">
          <div className="px-5 py-5 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              About Us
            </Link>

            <div className="border-b border-ivory-200">
              <button
                type="button"
                onClick={() => setMobilePracticeOpen((v) => !v)}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold"
              >
                <span>Practice Areas</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobilePracticeOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobilePracticeOpen && (
                <div className="pb-3 pl-3 space-y-1.5">
                  {divisions.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-medium text-charcoal-600 hover:text-midnight-900"
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              Our Services
            </Link>
            <Link
              href="/#process"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              Our Process
            </Link>
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              Insights &amp; Articles
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold border-b border-ivory-200"
            >
              Contact
            </Link>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-midnight-900 text-white font-semibold py-3 px-4 rounded text-sm"
              >
                <Calendar className="h-4 w-4 text-champagne-400" />
                <span>Book an Appointment</span>
              </Link>
              <a
                href="tel:01614446444"
                className="inline-flex items-center justify-center gap-2 bg-ivory-100 border border-ivory-300 text-midnight-900 font-semibold py-3 px-4 rounded text-sm"
              >
                <Phone className="h-4 w-4 text-champagne-600" />
                <span>Call 01614446444 / 01343226633</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
