import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { withFlash } from '@/lib/adminFlash';

async function loginAction(formData: FormData) {
  'use server';
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: withFlash('/admin', 'Connexion réussie.', 'success')
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const code = (error as AuthError & { code?: string }).code || 'default';
      redirect(`/admin/login?error=${code}`);
    }
    throw error;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  too_many_attempts: 'Trop de tentatives échouées. Réessayez dans quelques minutes.',
  default: 'Identifiants incorrects. Réessayez.'
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; flash?: string }>;
}) {
  const { error, flash } = await searchParams;

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-12 w-12 object-contain mb-4" />
        <h1 className="text-xl font-bold text-white">Espace administration</h1>
        <p className="text-sm text-slate-400 mt-1">OPS CORPORATION</p>
      </div>

      <form action={loginAction} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xl">
        {flash && !error && (
          <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {flash}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {ERROR_MESSAGES[error] || ERROR_MESSAGES.default}
          </p>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
          <input name="email" type="email" required className="form-input" placeholder="vous@opscorporation.tg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mot de passe</label>
          <input name="password" type="password" required className="form-input" placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-primary w-full justify-center">
          Se connecter
        </button>
      </form>
    </div>
  );
}
