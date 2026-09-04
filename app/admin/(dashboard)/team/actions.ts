'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { withFlash } from '@/lib/adminFlash';

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  roleFr: z.string().min(1),
  roleEn: z.string().min(1),
  bioFr: z.string().min(1),
  bioEn: z.string().min(1),
  photoUrl: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(false)
});

function revalidateAllLocales() {
  revalidatePath('/fr');
  revalidatePath('/en');
  revalidatePath('/fr/a-propos');
  revalidatePath('/en/a-propos');
}

export async function saveTeamMember(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.parse({ ...raw, active: formData.get('active') === 'on' });
  const data = { ...parsed, photoUrl: parsed.photoUrl || null, linkedin: parsed.linkedin || null };

  const isNew = !parsed.id;
  if (parsed.id) {
    await prisma.teamMember.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.teamMember.create({ data });
  }
  revalidateAllLocales();
  redirect(withFlash('/admin/team', isNew ? 'Membre ajouté.' : 'Membre mis à jour.'));
}

export async function deleteTeamMember(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.teamMember.delete({ where: { id } });
  revalidateAllLocales();
  redirect(withFlash('/admin/team', 'Membre supprimé.'));
}
