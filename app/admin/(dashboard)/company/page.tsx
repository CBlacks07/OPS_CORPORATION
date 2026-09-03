import { prisma } from '@/lib/prisma';
import { updateCompanyInfo, saveStat, deleteStat } from './actions';

export default async function CompanyPage() {
  const [company, stats] = await Promise.all([
    prisma.companyInfo.findUnique({ where: { id: 'main' } }),
    prisma.stat.findMany({ orderBy: { order: 'asc' } })
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Entreprise</h1>
        <p className="text-slate-500">Informations générales affichées sur le site public (Accueil, À propos, Contact, pied de page).</p>
      </div>

      <form action={updateCompanyInfo} className="card p-6 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom</label>
          <input name="name" defaultValue={company?.name} required className="form-input" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Slogan (FR)</label>
            <input name="taglineFr" defaultValue={company?.taglineFr} required className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tagline (EN)</label>
            <input name="taglineEn" defaultValue={company?.taglineEn} required className="form-input" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mission (FR)</label>
            <textarea name="missionFr" defaultValue={company?.missionFr} required rows={3} className="form-input resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mission (EN)</label>
            <textarea name="missionEn" defaultValue={company?.missionEn} required rows={3} className="form-input resize-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Histoire (FR)</label>
            <textarea name="historyFr" defaultValue={company?.historyFr} required rows={4} className="form-input resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">History (EN)</label>
            <textarea name="historyEn" defaultValue={company?.historyEn} required rows={4} className="form-input resize-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Valeurs (FR)</label>
            <input name="valuesFr" defaultValue={company?.valuesFr} required className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Values (EN)</label>
            <input name="valuesEn" defaultValue={company?.valuesEn} required className="form-input" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Année de création</label>
            <input name="foundedYear" type="number" defaultValue={company?.foundedYear} required className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email de contact</label>
            <input name="email" type="email" defaultValue={company?.email} required className="form-input" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Téléphone</label>
            <input name="phone" defaultValue={company?.phone} required className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Adresse</label>
            <input name="address" defaultValue={company?.address} required className="form-input" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">LinkedIn (URL)</label>
            <input name="linkedin" defaultValue={company?.linkedin || ''} placeholder="https://linkedin.com/..." className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Facebook (URL)</label>
            <input name="facebook" defaultValue={company?.facebook || ''} placeholder="https://facebook.com/..." className="form-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Instagram (URL)</label>
            <input name="instagram" defaultValue={company?.instagram || ''} placeholder="https://instagram.com/..." className="form-input" />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Statistiques (Accueil / À propos)</h2>
        <p className="text-slate-500 mb-4">Les 4 chiffres clés affichés sous le hero et sur la page À propos.</p>

        <div className="card divide-y divide-slate-100">
          {stats.map((s) => (
            <form key={s.id} action={saveStat} className="p-4 grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_80px_auto] gap-3 items-center">
              <input type="hidden" name="id" value={s.id} />
              <input name="value" defaultValue={s.value} className="form-input" placeholder="Valeur (ex: 3+)" />
              <input name="labelFr" defaultValue={s.labelFr} className="form-input" placeholder="Libellé FR" />
              <input name="labelEn" defaultValue={s.labelEn} className="form-input" placeholder="Label EN" />
              <input name="order" type="number" defaultValue={s.order} className="form-input" placeholder="Ordre" />
              <div className="flex gap-2 col-span-2 md:col-span-1">
                <button type="submit" className="btn-outline text-xs px-3 py-2">
                  Enregistrer
                </button>
                <button type="submit" formAction={deleteStat} className="text-xs px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50">
                  Suppr.
                </button>
              </div>
            </form>
          ))}
        </div>

        <details className="mt-4 card p-4">
          <summary className="cursor-pointer text-sm font-medium text-slate-700">+ Ajouter une statistique</summary>
          <form action={saveStat} className="mt-4 grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_80px_auto] gap-3 items-center">
            <input name="value" required className="form-input" placeholder="Valeur (ex: 3+)" />
            <input name="labelFr" required className="form-input" placeholder="Libellé FR" />
            <input name="labelEn" required className="form-input" placeholder="Label EN" />
            <input name="order" type="number" defaultValue={stats.length} className="form-input" placeholder="Ordre" />
            <button type="submit" className="btn-primary text-xs px-3 py-2 col-span-2 md:col-span-1">
              Ajouter
            </button>
          </form>
        </details>
      </div>
    </div>
  );
}
