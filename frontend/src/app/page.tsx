import React from 'react';
import { HomePageClient } from '@/components/public/HomePageClient';
import { fetchPublicSiteData } from '@/lib/serverData';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { content, settings, services } = await fetchPublicSiteData();
  return <HomePageClient content={content} settings={settings} services={services} />;
}

