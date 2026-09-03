import { auth } from '@/lib/auth';
import { changePassword } from './actions';

const ERROR_MESSAGES: Record<string, string> = {
  current: 'Mot de passe actuel incorrect.',
  length: 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
  mismatch: 'La confirmation ne correspond pas au nouveau mot de passe.'
};

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const session = await auth();
  const { error, success } = await searchParams;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Mon compte</h1>
      <p className="text-slate-500 mb-6">{session?.user?.name} — {session?.user?.email}</p>

      <form action={changePassword} className="card p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Changer le mot de passe</h2>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{ERROR_MESSAGES[error] || 'Erreur.'}</p>}
        {success && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">Mot de passe mis à jour.</p>}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mot de passe actuel</label>
          <input name="currentPassword" type="password" required className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nouveau mot de passe</label>
          <input name="newPassword" type="password" required minLength={8} className="form-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirmer le nouveau mot de passe</label>
          <input name="confirmPassword" type="password" required minLength={8} className="form-input" />
        </div>
        <button type="submit" className="btn-primary">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
