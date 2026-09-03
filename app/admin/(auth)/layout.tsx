import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Connexion — Admin OPS CORPORATION' };

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) redirect('/admin');

  return (
    <div className="min-h-screen bg-[#0b1220] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
