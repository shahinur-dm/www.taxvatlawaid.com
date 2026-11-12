import { FALLBACK_CONTENT, FALLBACK_SERVICES, FALLBACK_SETTINGS } from './defaults';
import { PublicSettings, ServiceItem, WebsiteContentData } from '@/types';

export async function fetchPublicSiteData(): Promise<{
  content: WebsiteContentData;
  settings: PublicSettings;
  services: ServiceItem[];
}> {
  const backendUrl = (process.env.BACKEND_INTERNAL_URL || 'http://localhost:5000').replace(
    /\/+$/,
    ''
  );
  try {
    const [contentRes, settingsRes, servicesRes] = await Promise.all([
      fetch(`${backendUrl}/api/content`, { cache: 'no-store' }),
      fetch(`${backendUrl}/api/settings/public`, { cache: 'no-store' }),
      fetch(`${backendUrl}/api/services`, { cache: 'no-store' }),
    ]);

    const contentJson = contentRes.ok ? await contentRes.json() : null;
    const settingsJson = settingsRes.ok ? await settingsRes.json() : null;
    const servicesJson = servicesRes.ok ? await servicesRes.json() : null;

    return {
      content: contentJson?.data ? { ...FALLBACK_CONTENT, ...contentJson.data } : FALLBACK_CONTENT,
      settings: settingsJson?.data
        ? { ...FALLBACK_SETTINGS, ...settingsJson.data }
        : FALLBACK_SETTINGS,
      services: Array.isArray(servicesJson?.data) && servicesJson.data.length > 0
        ? servicesJson.data
        : FALLBACK_SERVICES,
    };
  } catch {
    return {
      content: FALLBACK_CONTENT,
      settings: FALLBACK_SETTINGS,
      services: FALLBACK_SERVICES,
    };
  }
}

