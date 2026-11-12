import { FALLBACK_CONTENT, FALLBACK_SERVICES, FALLBACK_SETTINGS } from './defaults';
import { ArticleItem, PublicSettings, ServiceItem, WebsiteContentData } from '@/types';

function getBackendUrl(): string {
  return (process.env.BACKEND_INTERNAL_URL || 'http://localhost:5000').replace(/\/+$/, '');
}

export async function fetchPublicSiteData(): Promise<{
  content: WebsiteContentData;
  settings: PublicSettings;
  services: ServiceItem[];
  articles: ArticleItem[];
}> {
  const backendUrl = getBackendUrl();
  try {
    const [contentRes, settingsRes, servicesRes, articlesRes] = await Promise.all([
      fetch(`${backendUrl}/api/content`, { cache: 'no-store' }),
      fetch(`${backendUrl}/api/settings/public`, { cache: 'no-store' }),
      fetch(`${backendUrl}/api/services`, { cache: 'no-store' }),
      fetch(`${backendUrl}/api/articles`, { cache: 'no-store' }),
    ]);

    const contentJson = contentRes.ok ? await contentRes.json() : null;
    const settingsJson = settingsRes.ok ? await settingsRes.json() : null;
    const servicesJson = servicesRes.ok ? await servicesRes.json() : null;
    const articlesJson = articlesRes.ok ? await articlesRes.json() : null;

    return {
      content: contentJson?.data ? { ...FALLBACK_CONTENT, ...contentJson.data } : FALLBACK_CONTENT,
      settings: settingsJson?.data
        ? { ...FALLBACK_SETTINGS, ...settingsJson.data }
        : FALLBACK_SETTINGS,
      services:
        Array.isArray(servicesJson?.data) && servicesJson.data.length > 0
          ? servicesJson.data
          : FALLBACK_SERVICES,
      articles: Array.isArray(articlesJson?.data) ? articlesJson.data : [],
    };
  } catch {
    return {
      content: FALLBACK_CONTENT,
      settings: FALLBACK_SETTINGS,
      services: FALLBACK_SERVICES,
      articles: [],
    };
  }
}

export async function fetchPublicArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const backendUrl = getBackendUrl();
  try {
    const res = await fetch(`${backendUrl}/api/articles/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}
