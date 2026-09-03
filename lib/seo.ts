import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ops-corporation.vercel.app';

/**
 * Construit un objet Metadata cohérent (title, description, canonical,
 * alternates FR/EN, Open Graph) pour une page publique donnée.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: string;
  /** ex: '', '/services', '/a-propos'... (sans le préfixe de locale) */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr${path}`,
        en: `${SITE_URL}/en${path}`
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
