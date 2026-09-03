import { saveService, deleteService } from '@/app/admin/(dashboard)/services/actions';
import { ICON_KEYS } from '@/lib/icons';
import Link from 'next/link';

type Feature = { fr: string; en: string };

type Service = {
  id: string;
  slug: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  features: string;
  order: number;
  active: boolean;
} | null;

function parseFeatures(raw?: string): Feature[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function ServiceForm({ service }: { service: Service }) {
  const features = parseFeatures(service?.features);

  return (
    <form action={saveService} className="card p-6 space-y-5">
      {service && <input type="hidden" name="id" value={service.id} />}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Identifiant (slug)</label>
          <input name="slug" defaultValue={service?.slug} required placeholder="ex: applications-web" className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Icône</label>
          <select name="icon" defaultValue={service?.icon || 'Server'} className="form-input">
            {ICON_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titre (FR)</label>
          <input name="titleFr" defaultValue={service?.titleFr} required className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title (EN)</label>
          <input name="titleEn" defaultValue={service?.titleEn} required className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (FR)</label>
          <textarea name="descFr" defaultValue={service?.descFr} required rows={3} className="form-input resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (EN)</label>
          <textarea name="descEn" defaultValue={service?.descEn} required rows={3} className="form-input resize-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">Points clés (jusqu'à 3, laisser vide si inutile)</label>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid md:grid-cols-2 gap-2">
              <input name={`featureFr${i + 1}`} defaultValue={features[i]?.fr} placeholder={`Point ${i + 1} (FR)`} className="form-input" />
              <input name={`featureEn${i + 1}`} defaultValue={features[i]?.en} placeholder={`Point ${i + 1} (EN)`} className="form-input" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ordre d'affichage</label>
          <input name="order" type="number" defaultValue={service?.order ?? 0} className="form-input" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 pb-2.5">
          <input type="checkbox" name="active" defaultChecked={service?.active ?? true} className="h-4 w-4 rounded border-slate-300" />
          Visible sur le site
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
          <Link href="/admin/services" className="btn-outline">
            Annuler
          </Link>
        </div>
        {service && (
          <button type="submit" formAction={deleteService} className="text-sm px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50">
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
