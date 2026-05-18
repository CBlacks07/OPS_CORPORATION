'use client';

import {useTranslations} from 'next-intl';
import { Cpu, Server, Network, Shield, Code2, Boxes, Database, Terminal, Mail, MoveRight, Github, Linkedin } from 'lucide-react';
import ConstellationBG from '@/components/ConstellationBG';
import {useParams} from 'next/navigation';

import AnimatedText from '@/components/motion/AnimatedText';
import Reveal from '@/components/motion/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';
import ParallaxGrid from '@/components/bg/ParallaxGrid';
import ConstellationField from '@/components/bg/ConstellationField';
import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/layout/Header';

const SOCIALS = {
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com'
};

const SYSNET_SKILLS = [
  { icon: <Server className="w-5 h-5" />, key: 'admin_os' },
  { icon: <Network className="w-5 h-5" />, key: 'networking' },
  { icon: <Shield className="w-5 h-5" />, key: 'security' },
  { icon: <Cpu className="w-5 h-5" />, key: 'virtualization' },
  { icon: <Terminal className="w-5 h-5" />, key: 'automation' },
];

const FULLSTACK_SKILLS = [
  { icon: <Code2 className="w-5 h-5" />, key: 'ts' },
  { icon: <Boxes className="w-5 h-5" />, key: 'frontend' },
  { icon: <Database className="w-5 h-5" />, key: 'databases' },
  { icon: <Server className="w-5 h-5" />, key: 'backend' },
  { icon: <Shield className="w-5 h-5" />, key: 'auth' },
  { icon: <Terminal className="w-5 h-5" />, key: 'ui' },
  { icon: <Boxes className="w-5 h-5" />, key: 'devops' },
];

const PROJECTS = [
  { key: 'soc', stack: ['Linux', 'Syslog', 'Dashboards', 'Alerting'] },
  { key: 'backbone', stack: ['LAN/WAN', 'VLAN', 'Routing', 'Monitoring'] },
  { key: 'portal', stack: ['Next.js', 'Node', 'PostgreSQL', 'Tailwind'] },
];

const SERVICES = [
  { key: 'managed', icon: <Server className="w-5 h-5" /> },
  { key: 'deployment', icon: <Network className="w-5 h-5" /> },
  { key: 'security', icon: <Shield className="w-5 h-5" /> },
  { key: 'webapps', icon: <Code2 className="w-5 h-5" /> },
];

function SectionHeader({title, subtitle}:{title: string; subtitle?: string}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-100">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-300 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export default function Page() {
  const t = useTranslations();
  const {locale} = useParams<{locale: string}>();
  const container = "mx-auto w-full max-w-screen-2xl px-6 md:px-10";

  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <ConstellationBG />
      <ParallaxGrid />
      <ConstellationField />
      <div className="noise-overlay" />

      <Header
        labels={{skills: t('nav.skills'), projects: t('nav.projects'), services: t('nav.services'), contact: t('nav.contact')}}
        locale={String(locale)}
        switchHref={String(locale) === 'fr' ? '/en' : '/fr'}
        socials={SOCIALS}
      />

      <section className="relative">
        <div className={`${container} py-20`}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.15)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('hero.status')}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-sky-400 to-blue-400 glitch leading-[1.05] tracking-tight">
                  <span className="block">
                    <AnimatedText text={t('hero.role_line1')} per="char" delay={0.2} />
                  </span>
                  <span className="block">
                    <AnimatedText text={t('hero.role_line2')} per="char" delay={0.2} />
                  </span>
                </span>
              </h1>
              <p className="mt-5 text-slate-300 max-w-xl motion-smooth">{t('hero.pitch')}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticButton as="a" href="#contact">
                  <Mail className="w-4 h-4" /> {t('cta.contact')}
                </MagneticButton>
                <a href="#services" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 font-medium border border-cyan-500/30 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-200">
                  Nos services <MoveRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-slate-400">
                {SOCIALS.github && (
                  <a href={SOCIALS.github} className="hover:text-white inline-flex items-center gap-2" target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {SOCIALS.linkedin && (
                  <a href={SOCIALS.linkedin} className="hover:text-white inline-flex items-center gap-2" target="_blank" rel="noreferrer">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal y={10} delay={0.1}>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <img src="/ops-logo.png" alt="OPS Logo" className="h-16 w-16 object-contain" />
                  <div>
                    <p className="text-cyan-300 font-semibold">OPS CORPORATION</p>
                    <p className="text-slate-300 text-sm">Infra - Sécurité - Applications web</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    {SYSNET_SKILLS.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200/90">
                        <span className="text-cyan-300">{s.icon}</span>
                        {t(`skills.sysnet_items.${s.key}`)}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {FULLSTACK_SKILLS.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200/90">
                        <span className="text-cyan-300">{s.icon}</span>
                        {t(`skills.fullstack_items.${s.key}`)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="skills" className="relative py-20">
        <div className={container}>
          <Reveal>
            <SectionHeader title={t('skills.title')} subtitle={t('skills.subtitle')} />
            <div className="grid md:grid-cols-2 gap-6">
              <TiltCard>
                <h3 className="text-lg font-semibold text-cyan-200 mb-4">{t('skills.sysnet')}</h3>
                <ul className="space-y-2 text-slate-200/90">
                  {SYSNET_SKILLS.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-300">{s.icon}</span>{t(`skills.sysnet_items.${s.key}`)}
                    </li>
                  ))}
                </ul>
              </TiltCard>
              <TiltCard>
                <h3 className="text-lg font-semibold text-cyan-200 mb-4">{t('skills.fullstack')}</h3>
                <ul className="space-y-2 text-slate-200/90">
                  {FULLSTACK_SKILLS.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-300">{s.icon}</span>{t(`skills.fullstack_items.${s.key}`)}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="relative py-20">
        <div className={container}>
          <Reveal>
            <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p, idx) => (
                <TiltCard key={idx}>
                  <div className="text-xs uppercase tracking-widest text-cyan-300/80">{t(`projects.items.${p.key}.tag`)}</div>
                  <h4 className="mt-2 font-semibold text-slate-100">{t(`projects.items.${p.key}.title`)}</h4>
                  <p className="mt-2 text-sm text-slate-300">{t(`projects.items.${p.key}.desc`)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-cyan-900/40 border border-cyan-500/30 text-cyan-200">{s}</span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="relative py-20">
        <div className={container}>
          <Reveal>
            <SectionHeader title={t('services.title')} subtitle={t('services.subtitle')} />
            <div className="grid md:grid-cols-2 gap-6">
              {SERVICES.map((s, i) => (
                <TiltCard key={i}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
                      {s.icon}
                    </div>
                    <h4 className="font-semibold text-cyan-200">{t(`services.items.${s.key}.title`)}</h4>
                  </div>
                  <p className="mt-3 text-slate-300 text-sm">{t(`services.items.${s.key}.desc`)}</p>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative py-20">
        <div className={container}>
          <Reveal>
            <SectionHeader title={t('contact.title')} subtitle={t('contact.pitch')} />
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = Object.fromEntries(new FormData(form).entries());
                try {
                  const r = await fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});
                  if (r.ok) alert(String(locale) === 'fr' ? 'Merci ! Votre message a bien été envoyé.' : 'Thanks! Your message has been sent.');
                  else alert('Error');
                  form.reset();
                } catch (_) {
                  alert('Network error');
                }
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 grid md:grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <input name="name" className="w-full rounded-xl bg-[#0F172A] border border-white/10 px-4 py-2.5 outline-none focus:border-cyan-400" placeholder={String(locale) === 'fr' ? 'Nom' : 'Name'} required />
                <input name="email" type="email" className="w-full rounded-xl bg-[#0F172A] border border-white/10 px-4 py-2.5 outline-none focus:border-cyan-400" placeholder="Email" required />
                <input name="subject" className="w-full rounded-xl bg-[#0F172A] border border-white/10 px-4 py-2.5 outline-none focus:border-cyan-400" placeholder={String(locale) === 'fr' ? 'Sujet' : 'Subject'} />
              </div>
              <div className="space-y-4">
                <textarea name="message" className="w-full h-[138px] rounded-xl bg-[#0F172A] border border-white/10 px-4 py-2.5 outline-none focus:border-cyan-400" placeholder={String(locale) === 'fr' ? 'Message' : 'Message'} />
                <button type="submit" className="inline-flex items-center justify-center gap-2 w-full rounded-2xl px-4 py-2.5 font-medium bg-cyan-500/90 hover:bg-cyan-400 text-slate-900">
                  <Mail className="w-4 h-4" /> {t('cta.contact')}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-400 border-t border-white/5">
        {t('footer.text')}
      </footer>
    </div>
  );
}
