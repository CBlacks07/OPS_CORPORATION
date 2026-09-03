import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNav } from '@/lib/nav';
import { getCompanyInfo, getProjects } from '@/lib/content';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [t, tCta, tFooter, nav, company, projects] = await Promise.all([
    getTranslations({ locale, namespace: 'projects' }),
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en'),
    getProjects(locale as 'fr' | 'en')
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
            <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">{t('pitch')}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className={container}>
          {projects.length === 0 ? (
            <p className="text-slate-500">—</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <div className="card p-7 h-full flex flex-col">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 w-fit">
                      {p.tag}
                    </span>
                    <h2 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{p.title}</h2>
                    <p className="mt-1 text-xs text-slate-400 font-medium">{p.clientName}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{p.desc}</p>
                    {p.stack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-slate-200 bg-slate-50 text-slate-600 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
                      >
                        {tCta('viewSite')} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
