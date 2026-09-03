import { saveProject, deleteProject } from '@/app/admin/(dashboard)/projects/actions';
import Link from 'next/link';
import ImageField from '@/components/admin/ImageField';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';

type Project = {
  id: string;
  slug: string;
  clientName: string;
  url: string | null;
  tagFr: string;
  tagEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  stack: string;
  coverImageUrl: string | null;
  order: number;
  featured: boolean;
  active: boolean;
} | null;

function parseStack(raw?: string): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function ProjectForm({ project }: { project: Project }) {
  const stack = parseStack(project?.stack).join(', ');

  return (
    <form action={saveProject} className="card p-6 space-y-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Identifiant (slug)</label>
          <input name="slug" defaultValue={project?.slug} required placeholder="ex: ccl" className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom du client</label>
          <input name="clientName" defaultValue={project?.clientName} required className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Site en ligne (URL)</label>
          <input name="url" defaultValue={project?.url || ''} placeholder="https://..." className="form-input" />
        </div>
        <ImageField name="coverImageUrl" defaultValue={project?.coverImageUrl} label="Image de couverture" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Catégorie (FR)</label>
          <input name="tagFr" defaultValue={project?.tagFr} required placeholder="ex: Santé" className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category (EN)</label>
          <input name="tagEn" defaultValue={project?.tagEn} required placeholder="ex: Healthcare" className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titre (FR)</label>
          <input name="titleFr" defaultValue={project?.titleFr} required className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title (EN)</label>
          <input name="titleEn" defaultValue={project?.titleEn} required className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (FR)</label>
          <textarea name="descFr" defaultValue={project?.descFr} required rows={3} className="form-input resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (EN)</label>
          <textarea name="descEn" defaultValue={project?.descEn} required rows={3} className="form-input resize-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Technologies (séparées par des virgules)</label>
        <input name="stack" defaultValue={stack} placeholder="Next.js, Tailwind, SEO" className="form-input" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ordre d'affichage</label>
          <input name="order" type="number" defaultValue={project?.order ?? 0} className="form-input" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 pb-2.5">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className="h-4 w-4 rounded border-slate-300" />
          Mis en avant (accueil)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 pb-2.5">
          <input type="checkbox" name="active" defaultChecked={project?.active ?? true} className="h-4 w-4 rounded border-slate-300" />
          Visible sur le site
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
          <Link href="/admin/projects" className="btn-outline">
            Annuler
          </Link>
        </div>
        {project && (
          <ConfirmSubmitButton
            action={deleteProject}
            message={`Supprimer la réalisation "${project.titleFr}" ? Cette action est définitive.`}
            triggerLabel="Supprimer"
            triggerClassName="text-sm px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50"
          />
        )}
      </div>
    </form>
  );
}
