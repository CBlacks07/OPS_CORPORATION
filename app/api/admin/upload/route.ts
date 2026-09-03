import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { put } from '@vercel/blob';

/**
 * Upload d'image depuis l'admin (photo équipe, visuel de réalisation...).
 * Nécessite BLOB_READ_WRITE_TOKEN (Vercel Blob) — sans ce token, l'admin
 * reste utilisable via le champ "URL" manuel dans les formulaires.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Upload non configuré (BLOB_READ_WRITE_TOKEN manquant).' }, { status: 501 });
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 });
  }

  const blob = await put(`ops-corporation/${Date.now()}-${file.name}`, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
