'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

/**
 * Champ image pour les formulaires admin : URL manuelle + upload de fichier
 * (Vercel Blob, si configuré). L'upload remplit simplement le champ URL —
 * le formulaire parent n'a rien de plus à faire, il lit `name` comme d'habitude.
 */
export default function ImageField({
  name,
  defaultValue,
  label,
  placeholder = 'https://...'
}: {
  name: string;
  defaultValue?: string | null;
  label: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Échec de l'upload");
        return;
      }
      setValue(data.url);
    } catch {
      setError("Échec de l'upload");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="form-input"
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="btn-outline shrink-0 px-3 disabled:opacity-60"
          title="Importer une image"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-20 rounded-lg border border-slate-200 object-cover" />
      )}
    </div>
  );
}
