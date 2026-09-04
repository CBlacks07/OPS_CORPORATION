'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { withFlash } from '@/lib/adminFlash';

const schema = z.object({
  id: z.string().optional(),
  icon: z.string().min(1),
  titleFr: z.string().min(1),
  titleEn: z.string().min(1),
  descFr: z.string().min(1),
  descEn: z.string().min(1),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(false)
});

function revalidateAllLocales() {
  revalidatePath('/fr');
  revalidatePath('/en');
}

export async function saveSector(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.parse({ ...raw, active: formData.get('active') === 'on' });

  const isNew = !parsed.id;
  if (parsed.id) {
    await prisma.sector.update({ where: { id: parsed.id }, data: parsed });
  } else {
    await prisma.sector.create({ data: parsed });
  }
  revalidateAllLocales();
  redirect(withFlash('/admin/sectors', isNew ? 'Secteur ajouté.' : 'Secteur mis à jour.'));
}

export async function deleteSector(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.sector.delete({ where: { id } });
  revalidateAllLocales();
  redirect(withFlash('/admin/sectors', 'Secteur supprimé.'));
}
