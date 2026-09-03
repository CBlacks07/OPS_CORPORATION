import { getTranslations } from 'next-intl/server';
import { Linkedin } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNav } from '@/lib/nav';
import { getCompanyInfo, getStats, getTeam } from '@/lib/content';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [t, tCta, tFooter, nav, company, stats, team] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en'),
    getStats(locale as 'fr' | 'en'),
    getTeam(locale as 'fr' | 'en')
  ]);

  const container = 'mx-auto w-full max-w-screen-xl px-6 md:px-10';

  return (
    <div className="min-h-screen">
      <Header locale={locale} switchHref={isFr ? '/en' : '/fr'} nav={nav} contactLabel={tCta('contact')} />

      <section className="bg-[#0b1220] text-white">
        <div className={`${container} py-20`}>
          <Reveal>
            <div className="section-label">{t('label')}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-[1.1]">
              {t('headline1')} <span className="text-cyan-400">{t('headline2')}</span>
            </h1>
            {company && <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">{company.mission}</p>}
          </Reveal>
        </div>
      </section>

      {company && (
        <section className="py-20">
          <div className={container}>
            <div className="grid md:grid-cols-2 gap-10">
              <Reveal>
                <div className="section-label">{t('historyLabel')}</div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{company.history}</p>
                <p className="text-sm text-slate-400 mt-4">
                  {isFr ? `Fondée en ${company.foundedYear}` : `Founded in ${company.foundedYear}`}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="section-label">{t('valuesLabel')}</div>
                <p className="text-slate-700 leading-relaxed">{company.values}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {stats.length > 0 && (
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className={container}>
            <Reveal>
              <div className="section-label">{t('statsLabel')}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s) => (
                  <div key={s.id} className="card bg-white p-6 text-center">
                    <p className="text-3xl font-bold text-cyan-700">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="py-20">
          <div className={container}>
            <Reveal>
              <div className="section-label">{t('teamLabel')}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12">{t('teamHeadline')}</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.08}>
                  <div className="card p-7 text-center h-full flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-2xl font-semibold overflow-hidden mb-5">
                      {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" /> : m.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{m.name}</h3>
                    <p className="text-sm text-cyan-700 font-medium mb-3">{m.role}</p>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{m.bio}</p>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-4 text-slate-400 hover:text-cyan-700 transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
