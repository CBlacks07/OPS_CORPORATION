import { getTranslations } from 'next-intl/server';

export type NavItem = { href: string; label: string };

export async function getNav(locale: string): Promise<NavItem[]> {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/a-propos`, label: t('about') },
    { href: `/${locale}/realisations`, label: t('projects') },
    { href: `/${locale}/contact`, label: t('contact') }
  ];
}
