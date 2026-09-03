import { prisma } from '@/lib/prisma';
import { markMessageRead, deleteMessage } from './actions';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';

export default async function MessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Messages</h1>
      <p className="text-slate-500 mb-6">Messages reçus via le formulaire de contact du site.</p>

      {messages.length === 0 ? (
        <div className="card p-6">
          <p className="text-sm text-slate-500">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`card p-5 ${!m.read ? 'border-cyan-200 bg-cyan-50/30' : ''}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-slate-900">
                    {m.name} {!m.read && <span className="ml-2 text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-medium align-middle">Nouveau</span>}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm text-cyan-700 hover:underline">
                    {m.email}
                  </a>
                  {m.subject && <p className="text-sm text-slate-600 mt-1 font-medium">{m.subject}</p>}
                </div>
                <p className="text-xs text-slate-400 shrink-0">
                  {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(m.createdAt)}
                </p>
              </div>
              <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{m.message}</p>
              <div className="flex gap-3 mt-4">
                {!m.read && (
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="btn-outline text-xs px-3 py-1.5">
                      Marquer comme lu
                    </button>
                  </form>
                )}
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmSubmitButton
                    action={deleteMessage}
                    message={`Supprimer le message de ${m.name} ? Cette action est définitive.`}
                    triggerLabel="Supprimer"
                    triggerClassName="text-xs px-3 py-1.5 rounded-lg text-red-600 border border-red-200 hover:bg-red-50"
                  />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
