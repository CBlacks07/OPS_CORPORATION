import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function ProjectsListPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Réalisations</h1>
          <p className="text-slate-500">Projets clients affichés sur la page Réalisations.</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus className="w-4 h-4" /> Ajouter
        </Link>
      </div>

      <div className="card divide-y divide-slate-100">
        {projects.length === 0 && <p className="p-6 text-sm text-slate-500">Aucune réalisation pour le moment.</p>}
        {projects.map((p) => (
          <Link key={p.id} href={`/admin/projects/${p.id}`} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">
                {p.titleFr} <span className="text-slate-400 font-normal">— {p.tagFr}</span>
              </p>
              <p className="text-sm text-slate-500 truncate">{p.clientName}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {p.featured && <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">Mis en avant</span>}
              {!p.active && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Masqué</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
