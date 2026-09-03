import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const PATHS = ['', '/services', '/a-propos', '/realisations', '/contact', '/mentions-legales', '/confidentialite'];
const LOCALES = ['fr', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7
    }))
  );
}
