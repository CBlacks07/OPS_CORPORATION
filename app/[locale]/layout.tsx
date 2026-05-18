import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

export const metadata: Metadata = {
  title: 'OPS CORPORATION - Portfolio',
  description: 'Infra - Sécurité - Applications web'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = locale === 'fr' ? fr : en;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
