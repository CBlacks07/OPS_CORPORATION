import { saveTeamMember, deleteTeamMember } from '@/app/admin/(dashboard)/team/actions';
import Link from 'next/link';

type Member = {
  id: string;
  name: string;
  roleFr: string;
  roleEn: string;
  bioFr: string;
  bioEn: string;
  photoUrl: string | null;
  linkedin: string | null;
  order: number;
  active: boolean;
} | null;

export default function TeamMemberForm({ member }: { member: Member }) {
  return (
    <form action={saveTeamMember} className="card p-6 space-y-5">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom complet</label>
        <input name="name" defaultValue={member?.name} required className="form-input" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Rôle (FR)</label>
          <input name="roleFr" defaultValue={member?.roleFr} required className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role (EN)</label>
          <input name="roleEn" defaultValue={member?.roleEn} required className="form-input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Bio courte (FR)</label>
          <textarea name="bioFr" defaultValue={member?.bioFr} required rows={3} className="form-input resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Short bio (EN)</label>
          <textarea name="bioEn" defaultValue={member?.bioEn} required rows={3} className="form-input resize-none" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Photo (URL)</label>
          <input name="photoUrl" defaultValue={member?.photoUrl || ''} placeholder="https://..." className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">LinkedIn (URL)</label>
          <input name="linkedin" defaultValue={member?.linkedin || ''} placeholder="https://linkedin.com/..." className="form-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ordre d'affichage</label>
          <input name="order" type="number" defaultValue={member?.order ?? 0} className="form-input" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 pb-2.5">
          <input type="checkbox" name="active" defaultChecked={member?.active ?? true} className="h-4 w-4 rounded border-slate-300" />
          Visible sur le site
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
          <Link href="/admin/team" className="btn-outline">
            Annuler
          </Link>
        </div>
        {member && (
          <button type="submit" formAction={deleteTeamMember} className="text-sm px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50">
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
