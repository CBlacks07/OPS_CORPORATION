'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/company', label: 'Entreprise' },
  { href: '/admin/team', label: 'Équipe' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/sectors', label: 'Secteurs' },
  { href: '/admin/projects', label: 'Réalisations' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/account', label: 'Mon compte' }
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-wrap gap-1 py-2">
        {LINKS.map((l) => {
          const active = l.href === '/admin' ? pathname === '/admin' : pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                active ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
