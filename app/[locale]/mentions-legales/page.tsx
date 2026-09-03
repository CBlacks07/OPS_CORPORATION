import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNav } from '@/lib/nav';
import { getCompanyInfo } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/mentions-legales',
    title: locale === 'fr' ? 'Mentions légales — OPS CORPORATION' : 'Legal notice — OPS CORPORATION',
    description: locale === 'fr' ? "Mentions légales du site OPS CORPORATION." : 'Legal notice for the OPS CORPORATION website.'
  });
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-600 leading-relaxed mb-4">{children}</p>;
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [tCta, tFooter, nav, company] = await Promise.all([
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en')
  ]);

  const container = 'mx-auto w-full max-w-screen-xl px-6 md:px-10';

  return (
    <div className="min-h-screen">
      <Header locale={locale} switchHref={isFr ? '/en' : '/fr'} nav={nav} contactLabel={tCta('contact')} />

      <section className="py-16">
        <div className={`${container} max-w-3xl`}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
            {isFr ? 'Mentions légales' : 'Legal notice'}
          </h1>

          {isFr ? (
            <>
              <H2>Éditeur du site</H2>
              <P>
                Le site {company?.name || 'OPS CORPORATION'} est édité par {company?.name || 'OPS CORPORATION'}, dont le siège est situé à{' '}
                {company?.address || 'Lomé, Togo'}.
              </P>
              <P>
                Contact : {company?.email} — {company?.phone}
              </P>
              <P>Directeur de la publication : Kossi Caringthon MAATHEY, Directeur Général.</P>

              <H2>Hébergement</H2>
              <P>
                Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{' '}
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">
                  vercel.com
                </a>
                . La base de données est hébergée par Neon (Neon, Inc.).
              </P>

              <H2>Propriété intellectuelle</H2>
              <P>
                L'ensemble des contenus présents sur ce site (textes, logo, visuels) est la propriété de {company?.name || 'OPS CORPORATION'},
                sauf mention contraire, et ne peut être reproduit sans autorisation préalable.
              </P>

              <H2>Données personnelles</H2>
              <P>
                Les informations relatives à la collecte et au traitement des données personnelles sont détaillées dans notre{' '}
                <a href={`/${locale}/confidentialite`} className="text-cyan-700 hover:underline">
                  politique de confidentialité
                </a>
                .
              </P>
            </>
          ) : (
            <>
              <H2>Website publisher</H2>
              <P>
                This website is published by {company?.name || 'OPS CORPORATION'}, headquartered at {company?.address || 'Lomé, Togo'}.
              </P>
              <P>
                Contact: {company?.email} — {company?.phone}
              </P>
              <P>Publication director: Kossi Caringthon MAATHEY, CEO.</P>

              <H2>Hosting</H2>
              <P>
                This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA —{' '}
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">
                  vercel.com
                </a>
                . The database is hosted by Neon (Neon, Inc.).
              </P>

              <H2>Intellectual property</H2>
              <P>
                All content on this site (text, logo, visuals) is the property of {company?.name || 'OPS CORPORATION'}, unless otherwise
                stated, and may not be reproduced without prior authorization.
              </P>

              <H2>Personal data</H2>
              <P>
                Information about the collection and processing of personal data is detailed in our{' '}
                <a href={`/${locale}/confidentialite`} className="text-cyan-700 hover:underline">
                  privacy policy
                </a>
                .
              </P>
            </>
          )}
        </div>
      </section>

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
