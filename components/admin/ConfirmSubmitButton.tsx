'use client';

import { useState } from 'react';

/**
 * Bouton de soumission avec confirmation modale préalable — pour toute action
 * destructive (suppression) dans l'admin. Doit être placé à l'intérieur du
 * <form> ciblé : le bouton "Confirmer" porte le `formAction` réel.
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <p className="text-sm text-slate-700 mb-6 leading-relaxed">{message}</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="btn-outline text-sm px-4 py-2">
                Annuler
              </button>
              <button
                type="submit"
                formAction={action}
                onClick={() => setOpen(false)}
                className="text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
