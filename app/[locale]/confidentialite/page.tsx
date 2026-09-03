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
    path: '/confidentialite',
    title: locale === 'fr' ? 'Politique de confidentialité — OPS CORPORATION' : 'Privacy policy — OPS CORPORATION',
    description:
      locale === 'fr'
        ? 'Comment OPS CORPORATION collecte et traite vos données personnelles.'
        : 'How OPS CORPORATION collects and processes your personal data.'
  });
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-600 leading-relaxed mb-4">{children}</p>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-slate-600 leading-relaxed mb-2">{children}</li>;
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {isFr ? 'Politique de confidentialité' : 'Privacy policy'}
          </h1>

          {isFr ? (
            <>
              <P>
                {company?.name || 'OPS CORPORATION'} attache une grande importance à la protection de vos données personnelles. Cette page
                explique quelles données sont collectées via ce site, pourquoi, et comment vous pouvez exercer vos droits.
              </P>

              <H2>Données collectées</H2>
              <ul className="list-disc pl-5 mb-4">
                <Li>Formulaire de contact : nom, adresse email, sujet et message que vous nous transmettez volontairement.</Li>
                <Li>Données de navigation anonymisées (pages vues, provenance) via un outil d'analyse d'audience respectueux de la vie privée (Vercel Analytics), sans cookie de suivi publicitaire tiers.</Li>
              </ul>

              <H2>Finalité et base légale</H2>
              <P>
                Les données du formulaire de contact sont utilisées uniquement pour répondre à votre demande, sur la base de votre
                consentement (envoi volontaire du formulaire). Les données de navigation servent à mesurer et améliorer la fréquentation du
                site, sur la base de notre intérêt légitime.
              </P>

              <H2>Destinataires et sous-traitants</H2>
              <P>
                Vos données sont accessibles uniquement à l'équipe {company?.name || 'OPS CORPORATION'} et sont hébergées ou traitées par nos
                prestataires techniques : Vercel (hébergement du site), Neon (base de données), Resend (envoi des emails de contact). Ces
                prestataires n'utilisent vos données que pour l'exécution du service.
              </P>

              <H2>Durée de conservation</H2>
              <P>Les messages du formulaire de contact sont conservés le temps nécessaire au traitement de votre demande.</P>

              <H2>Vos droits</H2>
              <P>
                Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification et de suppression de vos
                données. Pour l'exercer, contactez-nous à{' '}
                <a href={`mailto:${company?.email}`} className="text-cyan-700 hover:underline">
                  {company?.email}
                </a>
                .
              </P>

              <H2>Cookies</H2>
              <P>
                Ce site n'utilise pas de cookie de suivi publicitaire tiers. Certaines préférences d'affichage peuvent être mémorisées
                localement dans votre navigateur.
              </P>
            </>
          ) : (
            <>
              <P>
                {company?.name || 'OPS CORPORATION'} takes the protection of your personal data seriously. This page explains what data is
                collected through this site, why, and how you can exercise your rights.
              </P>

              <H2>Data collected</H2>
              <ul className="list-disc pl-5 mb-4">
                <Li>Contact form: name, email address, subject and message you voluntarily submit.</Li>
                <Li>Anonymized browsing data (pages viewed, referrer) via a privacy-friendly analytics tool (Vercel Analytics), with no third-party advertising tracking cookies.</Li>
              </ul>

              <H2>Purpose and legal basis</H2>
              <P>
                Contact form data is used solely to respond to your request, based on your consent (voluntary form submission). Browsing
                data is used to measure and improve site traffic, based on our legitimate interest.
              </P>

              <H2>Recipients and processors</H2>
              <P>
                Your data is only accessible to the {company?.name || 'OPS CORPORATION'} team and is hosted or processed by our technical
                providers: Vercel (site hosting), Neon (database), Resend (contact email delivery). These providers only use your data to
                perform the service.
              </P>

              <H2>Retention period</H2>
              <P>Contact form messages are kept for as long as necessary to process your request.</P>

              <H2>Your rights</H2>
              <P>
                In accordance with applicable regulations, you have the right to access, rectify and delete your data. To exercise it,
                contact us at{' '}
                <a href={`mailto:${company?.email}`} className="text-cyan-700 hover:underline">
                  {company?.email}
                </a>
                .
              </P>

              <H2>Cookies</H2>
              <P>This site does not use third-party advertising tracking cookies. Some display preferences may be stored locally in your browser.</P>
            </>
          )}
        </div>
      </section>

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
