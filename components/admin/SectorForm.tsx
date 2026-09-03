import { saveSector, deleteSector } from '@/app/admin/(dashboard)/sectors/actions';
import { ICON_KEYS } from '@/lib/icons';
import Link from 'next/link';

type Sector = {
  id: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  order: number;
  active: boolean;
} | null;

export default function SectorForm({ sector }: { sector: Sector }) {
  return (
    <form action={saveSector} className="card p-6 space-y-5">
      {sector && <input type="hidden" name="id" value={sector.id} />}

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Icône</label>
        <select name="icon" defaultValue={sector?.icon || 'Store'} className="form-input">
          {ICON_KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titre (FR)</label>
          <input name="titleFr" defaultValue={sector?.titleFr} required className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title (EN)</label>
          <input name="titleEn" defaultValue={sector?.titleEn} required className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (FR)</label>
          <textarea name="descFr" defaultValue={sector?.descFr} required rows={3} className="form-input resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (EN)</label>
          <textarea name="descEn" defaultValue={sector?.descEn} required rows={3} className="form-input resize-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ordre d'affichage</label>
          <input name="order" type="number" defaultValue={sector?.order ?? 0} className="form-input" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 pb-2.5">
          <input type="checkbox" name="active" defaultChecked={sector?.active ?? true} className="h-4 w-4 rounded border-slate-300" />
          Visible sur le site
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
          <Link href="/admin/sectors" className="btn-outline">
            Annuler
          </Link>
        </div>
        {sector && (
          <button type="submit" formAction={deleteSector} className="text-sm px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50">
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
