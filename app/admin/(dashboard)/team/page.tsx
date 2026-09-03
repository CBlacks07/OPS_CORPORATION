import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function TeamListPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Équipe</h1>
          <p className="text-slate-500">Affichée sur la page À propos.</p>
        </div>
        <Link href="/admin/team/new" className="btn-primary">
          <Plus className="w-4 h-4" /> Ajouter
        </Link>
      </div>

      <div className="card divide-y divide-slate-100">
        {members.length === 0 && <p className="p-6 text-sm text-slate-500">Aucun membre pour le moment.</p>}
        {members.map((m) => (
          <Link key={m.id} href={`/admin/team/${m.id}`} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-semibold shrink-0 overflow-hidden">
                {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" /> : m.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900 truncate">{m.name}</p>
                <p className="text-sm text-slate-500 truncate">{m.roleFr}</p>
              </div>
            </div>
            {!m.active && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">Masqué</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
