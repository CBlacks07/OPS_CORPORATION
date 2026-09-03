import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Mail, Phone, MoveRight, CheckCircle2, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNav } from '@/lib/nav';
import { getCompanyInfo, getStats, getServices, getSectors, getProjects, getSectionCovers } from '@/lib/content';
import { getIcon } from '@/lib/icons';
import CoverImage from '@/components/cover/CoverImage';
import CoverStrip from '@/components/cover/CoverStrip';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const company = await getCompanyInfo(locale as 'fr' | 'en');
  return buildMetadata({
    locale,
    path: '',
    title: `${company?.name || 'OPS CORPORATION'} — ${company?.tagline || ''}`,
    description: company?.mission || ''
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [t, tHome, tWhyUs, tCta, tFooter, nav, company, stats, services, sectors, projects, covers] = await Promise.all([
    getTranslations({ locale, namespace: 'hero' }),
    getTranslations({ locale, namespace: 'home' }),
    getTranslations({ locale, namespace: 'whyus' }),
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en'),
    getStats(locale as 'fr' | 'en'),
    getServices(locale as 'fr' | 'en'),
    getSectors(locale as 'fr' | 'en'),
    getProjects(locale as 'fr' | 'en', { limit: 3 }),
    getSectionCovers()
  ]);

  const container = 'mx-auto w-full max-w-screen-xl px-6 md:px-10';
  const whyUsItems = ['reactive', 'expertise', 'local'] as const;

  return (
    <div className="min-h-screen">
      <Header locale={locale} switchHref={isFr ? '/en' : '/fr'} nav={nav} contactLabel={tCta('contact')} />

      {/* ── HERO ── */}
      <section className="relative bg-[#0b1220] text-white overflow-hidden">
        <CoverImage url={covers.hero} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className={`${container} relative py-24 md:py-32`}>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {t('badge')}
            </div>

            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-5">
              {company?.name} — {company?.address}
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6 max-w-3xl">
              {company?.tagline}
            </h1>

            <p className="text-base md:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">{company?.mission}</p>

            <div className="flex flex-wrap items-center gap-4 mb-20">
              <Link href={`/${locale}/contact`} className="btn-primary">
                <Mail className="w-4 h-4" />
                {tCta('contact')}
              </Link>
              <Link href={`/${locale}/services`} className="btn-outline-dark">
                {tCta('services')}
                <MoveRight className="w-4 h-4" />
              </Link>
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/10 pt-10">
                {stats.map((s, i) => (
                  <div key={s.id} className={`pr-8 ${i > 0 ? 'pl-8 border-l border-white/10' : ''}`}>
                    <p className="text-3xl md:text-4xl font-bold tracking-tight text-cyan-400">{s.value}</p>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24">
        <div className={container}>
          <CoverStrip url={covers.services_home} />
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
              <div>
                <div className="section-label">{tHome('servicesLabel')}</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-[1.15]">
                  {tHome('servicesHeadline1')} <span className="text-cyan-700">{tHome('servicesHeadline2')}</span>
                </h2>
              </div>
              <Link href={`/${locale}/services`} className="text-sm font-semibold text-cyan-700 hover:text-cyan-800 inline-flex items-center gap-1.5 shrink-0">
                {tCta('seeAllServices')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal key={s.id} delay={i * 0.06}>
                  <div className="card p-7 h-full flex flex-col">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{s.desc}</p>
                    {s.features.length > 0 && (
                      <ul className="space-y-2 border-t border-slate-100 pt-4">
                        {s.features.slice(0, 2).map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTEURS ── */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className={container}>
          <CoverStrip url={covers.sectors_home} />
          <Reveal>
            <div className="section-label">{tHome('sectorsLabel')}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 leading-[1.15]">
              {tHome('sectorsHeadline1')} <span className="text-cyan-700">{tHome('sectorsHeadline2')}</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sectors.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal key={s.id} delay={i * 0.06}>
                  <div className="card bg-white p-6 h-full">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section className="py-24">
        <div className={container}>
          <CoverStrip url={covers.whyus_home} />
          <Reveal>
            <div className="section-label">{tHome('whyusLabel')}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 leading-[1.15]">
              {tHome('whyusHeadline1')} <span className="text-cyan-700">{tHome('whyusHeadline2')}</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {whyUsItems.map((key, i) => (
              <Reveal key={key} delay={i * 0.07}>
                <div className="card p-7 h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{tWhyUs(`${key}.title`)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{tWhyUs(`${key}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      {projects.length > 0 && (
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className={container}>
            <CoverStrip url={covers.projects_home} />
            <Reveal>
              <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
                <div>
                  <div className="section-label">{tHome('projectsLabel')}</div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{tHome('projectsHeadline')}</h2>
                </div>
                <Link href={`/${locale}/realisations`} className="text-sm font-semibold text-cyan-700 hover:text-cyan-800 inline-flex items-center gap-1.5 shrink-0">
                  {tCta('seeAllProjects')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07}>
                  <div className="card bg-white overflow-hidden h-full flex flex-col">
                    {p.coverImageUrl && (
                      <div className="h-36 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.coverImageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 w-fit">
                        {p.tag}
                      </span>
                      <h4 className="mt-4 text-lg font-bold text-slate-900 leading-snug">{p.title}</h4>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.desc}</p>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                          {tCta('viewSite')} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA ── */}
      <section className="py-24">
        <div className={container}>
          <Reveal>
            <div className="relative overflow-hidden card bg-[#0b1220] border-0 text-white p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <CoverImage url={covers.contact_cta_home} />
              <div>
                <div className="section-label">{tHome('contactLabel')}</div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{tHome('contactHeadline')}</h2>
                <p className="text-slate-300 max-w-lg">{tHome('contactPitch')}</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link href={`/${locale}/contact`} className="btn-primary">
                  <Mail className="w-4 h-4" /> {tCta('contact')}
                </Link>
                {company?.phone && (
                  <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="btn-outline-dark">
                    <Phone className="w-4 h-4" /> {company.phone}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer
        locale={locale}
        nav={nav}
        tagline={company?.tagline || ''}
        copyright={tFooter('copyright', { year: new Date().getFullYear() })}
        company={company}
      />
    </div>
  );
}
