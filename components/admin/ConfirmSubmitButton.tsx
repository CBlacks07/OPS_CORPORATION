'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

/**
 * Bouton "Confirmer" à l'intérieur du <form> ciblé. useFormStatus() lit l'état
 * de soumission du formulaire ambiant sans jamais intercepter le clic — un
 * onClick manuel sur ce bouton désynchronise le wiring interne de React pour
 * <button formAction=...> et le clic finit sur son fallback
 * `javascript:throw(...)` (rien ne part). C'est la manière correcte d'avoir
 * un état "en cours" sur un bouton de Server Action.
 */
function ConfirmActionButton({
  action,
  confirmLabel
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={action}
      disabled={pending}
      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white font-semibold transition-colors"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {confirmLabel}
    </button>
  );
}

/**
 * Bouton de soumission avec confirmation modale préalable — pour toute action
 * destructive (suppression, déconnexion...) dans l'admin. Doit être placé à
 * l'intérieur du <form> ciblé.
 */
export default function ConfirmSubmitButton({
  action,
  message,
  triggerLabel,
  triggerClassName,
  confirmLabel = 'Supprimer'
}: {
  action: (formData: FormData) => void | Promise<void>;
  message: string;
  triggerLabel: React.ReactNode;
  triggerClassName?: string;
  confirmLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setOpen(false)} role="presentation">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-modal="true">
            <p className="text-sm text-slate-700 mb-6 leading-relaxed">{message}</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="btn-outline text-sm px-4 py-2">
                Annuler
              </button>
              <ConfirmActionButton action={action} confirmLabel={confirmLabel} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
