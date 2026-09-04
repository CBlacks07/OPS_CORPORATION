'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, X } from 'lucide-react';

function AdminToastInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const flash = searchParams.get('flash');
  const type = searchParams.get('type') === 'error' ? 'error' : 'success';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!flash) return;
    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), 4000);
    const cleanupTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('flash');
      params.delete('type');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 4300);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flash]);

  if (!flash) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl pl-4 pr-3 py-3 shadow-xl border text-sm font-medium max-w-sm ${
          type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {type === 'error' ? (
          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        )}
        <span className="flex-1">{flash}</span>
        <button onClick={() => setVisible(false)} className="text-slate-400 hover:text-slate-600 shrink-0" aria-label="Fermer">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AdminToast() {
  return (
    <Suspense fallback={null}>
      <AdminToastInner />
    </Suspense>
  );
}
