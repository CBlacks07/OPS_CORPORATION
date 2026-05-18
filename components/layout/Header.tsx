'use client';
import Link from 'next/link';
import {Languages, Github, Linkedin} from 'lucide-react';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useLockBodyScroll from '@/components/hooks/useLockBodyScroll';
import Burger from '@/components/ui/Burger';

type Labels = {skills:string; projects:string; services:string; contact:string;};
type Socials = {github?: string; linkedin?: string;};

export default function Header({labels, locale, switchHref, socials}:{labels:Labels; locale:string; switchHref:string; socials: Socials}){
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[#0B1220]/70 border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-6 w-6 object-contain" />
          </div>
          <span className="font-semibold tracking-tight text-slate-200">OPS CORPORATION</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center">
          <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <a href="#skills" className="nav-link">{labels.skills}</a>
            <a href="#projects" className="nav-link">{labels.projects}</a>
            <a href="#services" className="nav-link">{labels.services}</a>
            <a href="#contact" className="nav-link">{labels.contact}</a>
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Link href={switchHref} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium border border-cyan-500/30 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-200 text-sm" aria-label="Switch language">
              <Languages className="w-4 h-4" /> {String(locale).toUpperCase()}
            </Link>
            {socials.github && (
              <a href={socials.github} aria-label="GitHub" className="text-slate-300 hover:text-white" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5"/>
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} aria-label="LinkedIn" className="text-slate-300 hover:text-white" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5"/>
              </a>
            )}
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <Link href={switchHref} className="inline-flex items-center gap-2 rounded-xl px-2.5 py-1 border border-cyan-500/30 text-cyan-200" aria-label="Switch language">
              <Languages className="w-4 h-4" />
            </Link>
            <button aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="text-slate-200">
              <Burger open={open} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.15}}
            className="fixed inset-0 z-30 bg-black/40"
            onClick={()=>setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="panel"
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{type:'spring', stiffness: 260, damping: 28}}
            className="fixed right-0 top-0 bottom-0 z-40 w-[84%] max-w-sm bg-[#0B1220] border-l border-white/10 p-6 flex flex-col gap-6"
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-8 w-8 object-contain" />
                <span className="font-semibold text-slate-200">OPS CORPORATION</span>
              </div>
              <button aria-label="Close menu" onClick={()=>setOpen(false)} className="text-slate-200">
                <Burger open={true} />
              </button>
            </div>
            <div className="flex flex-col text-slate-200 text-lg gap-4">
              <a href="#skills" onClick={()=>setOpen(false)} className="hover:text-white">{labels.skills}</a>
              <a href="#projects" onClick={()=>setOpen(false)} className="hover:text-white">{labels.projects}</a>
              <a href="#services" onClick={()=>setOpen(false)} className="hover:text-white">{labels.services}</a>
              <a href="#contact" onClick={()=>setOpen(false)} className="hover:text-white">{labels.contact}</a>
            </div>
            <div className="mt-auto flex items-center gap-4 text-slate-300">
              {socials.github && (
                <a href={socials.github} aria-label="GitHub" className="hover:text-white" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5"/>
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} aria-label="LinkedIn" className="hover:text-white" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5"/>
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
