'use client';

import { useTranslations } from 'next-intl';
import { Server, Network, Shield, Code2, Mail, MoveRight, CheckCircle2, MapPin, Zap, Award, ArrowRight } from 'lucide-react';
import ConstellationBG from '@/components/ConstellationBG';
import { useParams } from 'next/navigation';
import Reveal from '@/components/motion/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/layout/Header';

const SOCIALS = {
  github: 'https://github.com/CBlacks07',
  linkedin: 'https://www.linkedin.com',
};

const SERVICES = [
  {
    key: 'managed',
    icon: <Server className="w-6 h-6" />,
    iconClass: 'text-cyan-300 bg-cyan-500/10',
    hoverBorder: 'hover:border-cyan-500/30',
    hoverShadow: 'hover:shadow-[0_12px_48px_rgba(6,182,212,0.1)]',
    features: ['f1', 'f2', 'f3'],
  },
  {
    key: 'deployment',
    icon: <Network className="w-6 h-6" />,
    iconClass: 'text-blue-300 bg-blue-500/10',
    hoverBorder: 'hover:border-blue-500/30',
    hoverShadow: 'hover:shadow-[0_12px_48px_rgba(59,130,246,0.1)]',
    features: ['f1', 'f2', 'f3'],
  },
  {
    key: 'security',
    icon: <Shield className="w-6 h-6" />,
    iconClass: 'text-violet-300 bg-violet-500/10',
    hoverBorder: 'hover:border-violet-500/30',
    hoverShadow: 'hover:shadow-[0_12px_48px_rgba(139,92,246,0.1)]',
    features: ['f1', 'f2', 'f3'],
  },
  {
    key: 'webapps',
    icon: <Code2 className="w-6 h-6" />,
    iconClass: 'text-emerald-300 bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/30',
    hoverShadow: 'hover:shadow-[0_12px_48px_rgba(16,185,129,0.1)]',
    features: ['f1', 'f2', 'f3'],
  },
];

const WHY_US = [
  { key: 'reactive', icon: <Zap className="w-6 h-6" />, iconClass: 'text-cyan-300 bg-cyan-500/10' },
  { key: 'expertise', icon: <Award className="w-6 h-6" />, iconClass: 'text-indigo-300 bg-indigo-500/10' },
  { key: 'local', icon: <MapPin className="w-6 h-6" />, iconClass: 'text-emerald-300 bg-emerald-500/10' },
];

const SYSNET_SKILLS = [
  'Windows / Linux', 'LAN / WAN / VLAN', 'Sécurité / SOC',
  'VMware / VirtualBox', 'Bash / Python', 'NGINX / Firewalls',
];

const FULLSTACK_SKILLS = [
  'TypeScript / JavaScript', 'React / Next.js', 'Node.js / NestJS',
  'PostgreSQL / MongoDB', 'Docker / CI/CD', 'Tailwind / Framer Motion',
];

const PROJECTS = [
  {
    key: 'soc',
    stack: ['Linux', 'Syslog', 'Dashboards', 'Alerting'],
    tagClass: 'text-violet-300 border-violet-500/30 bg-violet-500/10',
    dotClass: 'bg-violet-400',
  },
  {
    key: 'backbone',
    stack: ['LAN/WAN', 'VLAN', 'Routing', 'Monitoring'],
    tagClass: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
    dotClass: 'bg-blue-400',
  },
  {
    key: 'portal',
    stack: ['Next.js', 'Node', 'PostgreSQL', 'Tailwind'],
    tagClass: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    dotClass: 'bg-emerald-400',
  },
];

const STATS = [
  { value: '5+', labelKey: 'years_label', color: 'text-cyan-400' },
  { value: '50+', labelKey: 'missions_label', color: 'text-indigo-400' },
  { value: '99.9%', labelKey: 'uptime_label', color: 'text-emerald-400' },
  { value: '24/7', labelKey: 'support_label', color: 'text-sky-400' },
];

function SectionLabel({ text }: { text: string }) {
  return <div className="section-label">{text}</div>;
}

export default function Page() {
  const t = useTranslations();
  const { locale } = useParams<{ locale: string }>();
  const isFr = String(locale) === 'fr';
  const container = 'mx-auto w-full max-w-6xl px-6 md:px-12';

  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <ConstellationBG />
      <div className="noise-overlay" />

      <Header
        labels={{ skills: t('nav.skills'), projects: t('nav.projects'), services: t('nav.services'), contact: t('nav.contact') }}
        locale={String(locale)}
        switchHref={isFr ? '/en' : '/fr'}
        socials={SOCIALS}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute -top-40 -right-60 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.04] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.05] blur-[120px] pointer-events-none" />
        {/* Logo watermark */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none" aria-hidden>
          <img
            src="/ops-logo.png"
            alt=""
            className="w-[420px] md:w-[600px] lg:w-[720px] object-contain opacity-[0.04]"
            style={{ filter: 'grayscale(1) brightness(3)' }}
          />
        </div>

        <div className={`${container} relative z-10 py-28`}>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.08] px-3 py-1 text-xs font-semibold text-emerald-300 mb-8 tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t('hero.status')}
            </div>

            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-5">
              OPS CORPORATION — Lomé, Togo
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight mb-6">
              <span className="block text-slate-100">{t('hero.headline1')}</span>
              <span className="block gradient-text-animate">{t('hero.headline2')}</span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
              {t('hero.pitch')}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-20">
              <MagneticButton as="a" href="#contact">
                <Mail className="w-4 h-4" />
                {t('cta.contact')}
              </MagneticButton>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
              >
                {t('cta.services')}
                <MoveRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/[0.06] pt-10">
              {STATS.map((s, i) => (
                <div key={s.labelKey} className={`pr-8 ${i > 0 ? 'pl-8 border-l border-white/[0.06]' : ''}`}>
                  <p className={`text-3xl md:text-4xl font-bold tracking-tight ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium tracking-wide">{t(`stats.${s.labelKey}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative py-28">
        <div className={`${container} relative z-10`}>
          <Reveal>
            <SectionLabel text={t('services.label')} />
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 leading-[1.1] mb-1">
              {t('services.headline1')}
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text leading-[1.1] mb-14">
              {t('services.headline2')}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.07}>
                <div className={`service-card group flex flex-col ${s.hoverBorder} ${s.hoverShadow}`}>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.iconClass} mb-6`}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">
                    {t(`services.items.${s.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-7">
                    {t(`services.items.${s.key}.desc`)}
                  </p>
                  <ul className="space-y-3 border-t border-white/[0.06] pt-6 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        {t(`services.items.${s.key}.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                      {t('cta.reach')} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section className="relative py-28 border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
        <div className={`${container} relative z-10`}>
          <Reveal>
            <SectionLabel text={t('whyus.label')} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-1">{t('whyus.headline1')}</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-14">{t('whyus.headline2')}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.key} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300 h-full">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${w.iconClass} mb-5`}>
                    {w.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-3">
                    {t(`whyus.${w.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t(`whyus.${w.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section id="skills" className="relative py-28 border-t border-white/[0.05]">
        <div className={`${container} relative z-10`}>
          <Reveal>
            <SectionLabel text={t('skills.label')} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-3">
              {t('skills.title')}
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl leading-relaxed">
              {t('skills.subtitle')}
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-cyan-400 mb-5">
                  {t('skills.sysnet')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SYSNET_SKILLS.map((skill) => (
                    <span key={skill} className="skill-badge hover:border-cyan-500/30 hover:text-cyan-200 hover:bg-cyan-500/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-indigo-400 mb-5">
                  {t('skills.fullstack')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {FULLSTACK_SKILLS.map((skill) => (
                    <span key={skill} className="skill-badge hover:border-indigo-500/30 hover:text-indigo-200 hover:bg-indigo-500/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projects" className="relative py-28 border-t border-white/[0.05]">
        <div className={`${container} relative z-10`}>
          <Reveal>
            <SectionLabel text={t('projects.label')} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-12">
              {t('projects.title')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p, idx) => (
                <div key={idx} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300 flex flex-col">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${p.tagClass} w-fit`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${p.dotClass}`} />
                    {t(`projects.items.${p.key}.tag`)}
                  </span>
                  <h4 className="mt-5 text-lg font-bold text-slate-100 leading-snug">
                    {t(`projects.items.${p.key}.title`)}
                  </h4>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                    {t(`projects.items.${p.key}.desc`)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full text-xs border border-white/[0.08] bg-white/[0.03] text-slate-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-28 border-t border-white/[0.05]">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[120px] pointer-events-none" />
        <div className={`${container} relative z-10`}>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <SectionLabel text={t('contact.label')} />
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 leading-tight mb-6">
                  {t('contact.title')}
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-10">
                  {t('contact.pitch')}
                </p>
                <div className="space-y-4">
                  <a href={`mailto:${t('contact.info_email')}`} className="flex items-center gap-4 text-slate-300 hover:text-cyan-300 transition-colors group">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/15 transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{t('contact.info_email')}</span>
                  </a>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{t('contact.info_location')}</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const data = Object.fromEntries(new FormData(form).entries());
                  try {
                    const r = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });
                    if (r.ok) alert(isFr ? 'Merci ! Votre message a bien été envoyé.' : 'Thanks! Your message has been sent.');
                    else alert('Error');
                    form.reset();
                  } catch (_) {
                    alert('Network error');
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" className="form-input" placeholder={isFr ? 'Nom' : 'Name'} required />
                  <input name="email" type="email" className="form-input" placeholder="Email" required />
                </div>
                <input name="subject" className="form-input" placeholder={isFr ? 'Sujet' : 'Subject'} />
                <textarea name="message" rows={5} className="form-input resize-none" placeholder={isFr ? 'Décrivez votre projet...' : 'Describe your project...'} />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-900 transition-colors">
                  <Mail className="w-4 h-4" />
                  {t('cta.contact')}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-white/[0.05]">
        <div className={`${container}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg border border-cyan-400/20 bg-cyan-500/10 flex items-center justify-center">
                <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-5 w-5 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-300">OPS CORPORATION</p>
                <p className="text-xs text-slate-500">{t('footer.tagline')}</p>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500">
              <a href="#services" className="hover:text-slate-300 transition-colors">{t('nav.services')}</a>
              <a href="#skills" className="hover:text-slate-300 transition-colors">{t('nav.skills')}</a>
              <a href="#projects" className="hover:text-slate-300 transition-colors">{t('nav.projects')}</a>
              <a href="#contact" className="hover:text-slate-300 transition-colors">{t('nav.contact')}</a>
            </nav>

            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-slate-500">{t('footer.text')}</p>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <a href={SOCIALS.github} className="hover:text-slate-400 transition-colors" target="_blank" rel="noreferrer">GitHub</a>
                <a href={SOCIALS.linkedin} className="hover:text-slate-400 transition-colors" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
