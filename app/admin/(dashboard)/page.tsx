import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [services, sectors, team, projects, unreadMessages, totalMessages] = await Promise.all([
    prisma.service.count(),
    prisma.sector.count(),
    prisma.teamMember.count(),
    prisma.project.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count()
  ]);

  const recentMessages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const cards = [
    { label: 'Services', value: services, href: '/admin/services' },
    { label: 'Secteurs', value: sectors, href: '/admin/sectors' },
    { label: 'Membres équipe', value: team, href: '/admin/team' },
    { label: 'Réalisations', value: projects, href: '/admin/projects' },
    { label: 'Messages non lus', value: unreadMessages, href: '/admin/messages' },
    { label: 'Messages reçus', value: totalMessages, href: '/admin/messages' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Tableau de bord</h1>
      <p className="text-slate-500 mb-8">Vue d'ensemble du contenu du site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card p-5 block">
            <p className="text-3xl font-bold text-slate-900">{c.value}</p>
            <p className="text-sm text-slate-500 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Derniers messages</h2>
          <Link href="/admin/messages" className="text-sm text-cyan-700 hover:underline">
            Tout voir
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun message pour le moment.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentMessages.map((m) => (
              <li key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {m.name} <span className="text-slate-400 font-normal">— {m.email}</span>
                  </p>
                  <p className="text-sm text-slate-500 truncate">{m.subject || m.message}</p>
                </div>
                {!m.read && <span className="shrink-0 text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-medium">Nouveau</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
