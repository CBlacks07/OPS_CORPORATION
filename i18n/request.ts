import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const supported = ['fr','en'] as const;
  const fallback = 'fr' as const;
  const raw = await requestLocale;
  const locale = (typeof raw === 'string' && supported.includes(raw as any)) ? (raw as 'fr'|'en') : fallback;
  const messages = (await import(`../locales/${locale}.json`)).default;
  return {locale, messages};
});
