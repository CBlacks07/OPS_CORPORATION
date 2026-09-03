import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getIcon } from '@/lib/icons';

export default async function SectorsListPage() {
  const sectors = await prisma.sector.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Secteurs</h1>
          <p className="text-slate-500">Secteurs d'activité mis en avant sur l'accueil.</p>
        </div>
        <Link href="/admin/sectors/new" className="btn-primary">
          <Plus className="w-4 h-4" /> Ajouter
        </Link>
      </div>

      <div className="card divide-y divide-slate-100">
        {sectors.length === 0 && <p className="p-6 text-sm text-slate-500">Aucun secteur pour le moment.</p>}
        {sectors.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <Link key={s.id} href={`/admin/sectors/${s.id}`} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 truncate">{s.titleFr}</p>
                  <p className="text-sm text-slate-500 truncate">{s.descFr}</p>
                </div>
              </div>
              {!s.active && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">Masqué</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
