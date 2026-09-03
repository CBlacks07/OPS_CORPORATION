'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

type Labels = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  success: string;
  error: string;
};

export default function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('sending');
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        try {
          const r = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (r.ok) {
            setStatus('success');
            form.reset();
          } else {
            setStatus('error');
          }
        } catch {
          setStatus('error');
        }
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <input name="name" className="form-input" placeholder={labels.name} required />
        <input name="email" type="email" className="form-input" placeholder={labels.email} required />
      </div>
      <input name="subject" className="form-input" placeholder={labels.subject} />
      <textarea name="message" rows={5} className="form-input resize-none" placeholder={labels.message} required />
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        <Mail className="w-4 h-4" />
        {labels.submit}
      </button>
      {status === 'success' && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{labels.success}</p>}
      {status === 'error' && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{labels.error}</p>}
    </form>
  );
}
