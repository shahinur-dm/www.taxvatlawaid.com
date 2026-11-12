'use client';

import React, { useState } from 'react';
import {
  ArticleItem,
  PublicSettings,
  ServiceCategory,
  ServiceItem,
  WebsiteContentData,
} from '@/types';
import { AboutFirmSection } from './AboutFirmSection';
import { BookingSection } from './BookingSection';
import { ContactSection } from './ContactSection';
import { ExpertiseAndWhyUsSection } from './ExpertiseAndWhyUsSection';
import { FaqSection } from './FaqSection';
import { HeroSection } from './HeroSection';
import { InsightsSection } from './InsightsSection';
import { LeadCounselCard } from './LeadCounselCard';
import { PracticeAreasSection } from './PracticeAreasSection';
import { ProcessTimelineSection } from './ProcessTimelineSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TrustCredibilityBar } from './TrustCredibilityBar';

interface HomePageClientProps {
  content: WebsiteContentData;
  settings: PublicSettings;
  services: ServiceItem[];
  articles?: ArticleItem[];
}

export function HomePageClient({
  content,
  settings,
  services,
  articles = [],
}: HomePageClientProps) {
  const [preselectedCategory, setPreselectedCategory] = useState<
    ServiceCategory | undefined
  >(undefined);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader
        content={content}
        settings={settings}
        services={services}
        transparentOverHero
      />
      <main className="flex-1">
        <HeroSection content={content} />
        <TrustCredibilityBar content={content} />
        <AboutFirmSection content={content} />
        <LeadCounselCard content={content} />
        <PracticeAreasSection
          services={services}
          onBookService={(cat) => setPreselectedCategory(cat)}
        />
        <ExpertiseAndWhyUsSection content={content} />
        <ProcessTimelineSection content={content} />
        <BookingSection
          content={content}
          settings={settings}
          preselectedCategory={preselectedCategory}
        />
        <InsightsSection articles={articles} />
        <FaqSection faqs={content.faqs} />
        <ContactSection content={content} settings={settings} />
      </main>
      <SiteFooter content={content} services={services} />
    </div>
  );
}
