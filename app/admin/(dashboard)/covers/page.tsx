import { prisma } from '@/lib/prisma';
import { SECTION_COVERS } from '@/lib/sections';
import { saveCover } from './actions';
import ImageField from '@/components/admin/ImageField';

export default async function CoversPage() {
  const rows = await prisma.sectionCover.findMany();
  const byKey = new Map(rows.map((r) => [r.id, r.imageUrl]));

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Images de couverture</h1>
      <p className="text-slate-500 mb-6">
        Une image par section du site (optionnelle). Sans image, la section garde son fond actuel — aucune casse. Avec une image, un léger
        effet de zoom (Ken Burns) s'applique automatiquement.
      </p>

      <div className="space-y-4">
        {SECTION_COVERS.map((s) => (
          <form key={s.key} action={saveCover} className="card p-5 flex items-end gap-4 flex-wrap">
            <input type="hidden" name="key" value={s.key} />
            <div className="flex-1 min-w-[240px]">
              <ImageField name="imageUrl" defaultValue={byKey.get(s.key)} label={s.label} />
            </div>
            <button type="submit" className="btn-primary shrink-0">
              Enregistrer
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
