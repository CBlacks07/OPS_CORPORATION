import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Mail, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNav } from '@/lib/nav';
import { getCompanyInfo, getServices, getSectionCovers } from '@/lib/content';
import { getIcon } from '@/lib/icons';
import CoverImage from '@/components/cover/CoverImage';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const [t, company] = await Promise.all([
    getTranslations({ locale, namespace: 'services' }),
    getCompanyInfo(locale as 'fr' | 'en')
  ]);
  return buildMetadata({
    locale,
    path: '/services',
    title: `${t('headline1')} ${t('headline2')} — ${company?.name || 'OPS CORPORATION'}`,
    description: t('pitch')
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [t, tCta, tFooter, nav, company, services, covers] = await Promise.all([
    getTranslations({ locale, namespace: 'services' }),
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en'),
    getServices(locale as 'fr' | 'en'),
    getSectionCovers()
  ]);

  const container = 'mx-auto w-full max-w-screen-xl px-6 md:px-10';

  return (
    <div className="min-h-screen">
      <Header locale={locale} switchHref={isFr ? '/en' : '/fr'} nav={nav} contactLabel={tCta('contact')} />

      <section className="relative bg-[#0b1220] text-white overflow-hidden">
        <CoverImage url={covers.services_page} />
        <div className={`${container} py-20`}>
          <Reveal>
            <div className="section-label">{t('label')}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-[1.1]">
              {t('headline1')} <span className="text-cyan-400">{t('headline2')}</span>
            </h1>
            <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">{t('pitch')}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className={container}>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal key={s.id} delay={i * 0.06}>
                  <div className="card p-8 h-full flex flex-col">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                    {s.features.length > 0 && (
                      <ul className="space-y-3 border-t border-slate-100 pt-6 mb-6">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto">
                      <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                        <Mail className="w-3.5 h-3.5" /> {tCta('reach')}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
