'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { withFlash } from '@/lib/adminFlash';

const schema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug: lettres minuscules, chiffres et tirets uniquement'),
  clientName: z.string().min(1),
  url: z.string().url().optional().or(z.literal('')),
  tagFr: z.string().min(1),
  tagEn: z.string().min(1),
  titleFr: z.string().min(1),
  titleEn: z.string().min(1),
  descFr: z.string().min(1),
  descEn: z.string().min(1),
  stack: z.string().default(''),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  order: z.coerce.number().int().default(0),
  featured: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(false)
});

function revalidateAllLocales() {
  revalidatePath('/fr');
  revalidatePath('/en');
  revalidatePath('/fr/realisations');
  revalidatePath('/en/realisations');
}

export async function saveProject(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.parse({
    ...raw,
    featured: formData.get('featured') === 'on',
    active: formData.get('active') === 'on'
  });

  const data = {
    slug: parsed.slug,
    clientName: parsed.clientName,
    url: parsed.url || null,
    tagFr: parsed.tagFr,
    tagEn: parsed.tagEn,
    titleFr: parsed.titleFr,
    titleEn: parsed.titleEn,
    descFr: parsed.descFr,
    descEn: parsed.descEn,
    stack: JSON.stringify(
      parsed.stack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    ),
    coverImageUrl: parsed.coverImageUrl || null,
    order: parsed.order,
    featured: parsed.featured,
    active: parsed.active
  };

  const isNew = !parsed.id;
  if (parsed.id) {
    await prisma.project.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.project.create({ data });
  }
  revalidateAllLocales();
  redirect(withFlash('/admin/projects', isNew ? 'Réalisation ajoutée.' : 'Réalisation mise à jour.'));
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidateAllLocales();
  redirect(withFlash('/admin/projects', 'Réalisation supprimée.'));
}
