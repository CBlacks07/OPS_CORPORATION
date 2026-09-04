import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import AdminToast from '@/components/admin/AdminToast';
import { withFlash } from '@/lib/adminFlash';

export const metadata = { title: 'Administration — OPS CORPORATION' };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0b1220] text-white">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/ops-logo.png" alt="OPS CORPORATION" className="h-7 w-7 object-contain" />
            <div>
              <p className="font-semibold leading-tight">OPS CORPORATION</p>
              <p className="text-xs text-slate-400 leading-tight">Espace administration</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-slate-300">{session.user?.name}</span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: withFlash('/admin/login', 'Déconnexion réussie.', 'success') });
              }}
            >
              <button type="submit" className="btn-outline-dark text-xs px-3 py-1.5">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
        <AdminNav />
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-10">{children}</main>
      <AdminToast />
    </div>
  );
}
