'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLockBodyScroll from '@/components/hooks/useLockBodyScroll';
import Burger from '@/components/ui/Burger';

type NavItem = { href: string; label: string };

export default function Header({
  locale,
  switchHref,
  nav,
  contactLabel
}: {
  locale: string;
  switchHref: string;
  nav: NavItem[];
  contactLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useLockBodyScroll(open);

  const isActive = (href: string) => pathname === href || (href !== `/${locale}` && pathname?.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-8 w-8 object-contain" />
            <span className="font-semibold tracking-tight text-slate-900">OPS CORPORATION</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex justify-center items-center gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={switchHref}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                aria-label="Switch language"
              >
                <Languages className="w-4 h-4" /> {String(locale).toUpperCase()}
              </Link>
              <Link href={nav.find((n) => n.href.endsWith('/contact'))?.href || `/${locale}/contact`} className="btn-primary">
                <Mail className="w-4 h-4" />
                {contactLabel}
              </Link>
            </div>

            {/* Mobile burger */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                href={switchHref}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium border border-slate-200 text-slate-600"
                aria-label="Switch language"
              >
                {String(locale).toUpperCase()}
              </Link>
              <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="text-slate-800">
                <Burger open={open} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[84%] max-w-sm bg-white border-l border-slate-200 p-6 flex flex-col gap-6"
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-8 w-8 object-contain" />
                <span className="font-semibold text-slate-900">OPS CORPORATION</span>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-slate-800">
                <Burger open={true} />
              </button>
            </div>

            <div className="flex flex-col text-slate-800 text-lg gap-5">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="hover:text-cyan-700 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
