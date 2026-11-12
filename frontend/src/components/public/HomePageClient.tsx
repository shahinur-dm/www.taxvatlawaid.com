'use client';

import React, { useState } from 'react';
import {
  PublicSettings,
  ServiceCategory,
  ServiceItem,
  WebsiteContentData,
} from '@/types';
import { AboutProcessSection } from './AboutProcessSection';
import { BookingSection } from './BookingSection';
import { ContactSection } from './ContactSection';
import { ExpertiseAndWhyUsSection } from './ExpertiseAndWhyUsSection';
import { FaqSection } from './FaqSection';
import { HeroSection } from './HeroSection';
import { LeadCounselCard } from './LeadCounselCard';
import { PracticeAreasSection } from './PracticeAreasSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface HomePageClientProps {
  content: WebsiteContentData;
  settings: PublicSettings;
  services: ServiceItem[];
}

export function HomePageClient({ content, settings, services }: HomePageClientProps) {
  const [preselectedCategory, setPreselectedCategory] = useState<
    ServiceCategory | undefined
  >(undefined);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader content={content} settings={settings} />
      <main className="flex-1">
        <HeroSection content={content} />
        <LeadCounselCard content={content} />
        <BookingSection
          content={content}
          settings={settings}
          preselectedCategory={preselectedCategory}
        />
        <PracticeAreasSection
          services={services}
          onBookService={(cat) => setPreselectedCategory(cat)}
        />
        <AboutProcessSection content={content} />
        <ExpertiseAndWhyUsSection content={content} />
        <FaqSection faqs={content.faqs} />
        <ContactSection content={content} settings={settings} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

