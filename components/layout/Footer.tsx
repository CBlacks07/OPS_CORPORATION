import Link from 'next/link';
import { Mail, MapPin, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';

type NavItem = { href: string; label: string };

export default function Footer({
  locale,
  nav,
  tagline,
  copyright,
  company
}: {
  locale: string;
  nav: NavItem[];
  tagline: string;
  copyright: string;
  company: {
    email: string;
    phone: string;
    address: string;
    linkedin: string | null;
    facebook: string | null;
    instagram: string | null;
  } | null;
}) {
  return (
    <footer className="bg-[#0b1220] text-slate-300">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-8 w-8 object-contain" />
              <span className="font-semibold text-white">OPS CORPORATION</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">{tagline}</p>
            {(company?.linkedin || company?.facebook || company?.instagram) && (
              <div className="flex items-center gap-4 mt-5 text-slate-400">
                {company?.linkedin && (
                  <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {company?.facebook && (
                  <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {company?.instagram && (
                  <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Navigation</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {company && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contact</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 shrink-0" /> {company.email}
                </a>
                <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 shrink-0" /> {company.phone}
                </a>
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0" /> {company.address}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>{copyright}</p>
          <p>OPS CORPORATION · {locale === 'fr' ? 'Lomé, Togo' : 'Lomé, Togo'}</p>
        </div>
      </div>
    </footer>
  );
}
