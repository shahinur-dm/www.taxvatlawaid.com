import type { MetadataRoute } from 'next';
import { FALLBACK_SERVICES } from '@/lib/defaults';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www-taxvatlawaid-com.vercel.app';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/booking`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = FALLBACK_SERVICES.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
