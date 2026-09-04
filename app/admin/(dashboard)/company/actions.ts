'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { withFlash } from '@/lib/adminFlash';

const companySchema = z.object({
  name: z.string().min(1),
  taglineFr: z.string().min(1),
  taglineEn: z.string().min(1),
  missionFr: z.string().min(1),
  missionEn: z.string().min(1),
  historyFr: z.string().min(1),
  historyEn: z.string().min(1),
  valuesFr: z.string().min(1),
  valuesEn: z.string().min(1),
  foundedYear: z.coerce.number().int().min(1990).max(2100),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  linkedin: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal(''))
});

function revalidateAllLocales() {
  revalidatePath('/fr');
  revalidatePath('/en');
  revalidatePath('/fr/a-propos');
  revalidatePath('/en/a-propos');
  revalidatePath('/fr/contact');
  revalidatePath('/en/contact');
}

export async function updateCompanyInfo(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = companySchema.parse(raw);

  await prisma.companyInfo.upsert({
    where: { id: 'main' },
    update: {
      ...parsed,
      linkedin: parsed.linkedin || null,
      facebook: parsed.facebook || null,
      instagram: parsed.instagram || null
    },
    create: {
      id: 'main',
      ...parsed,
      linkedin: parsed.linkedin || null,
      facebook: parsed.facebook || null,
      instagram: parsed.instagram || null
    }
  });

  revalidateAllLocales();
  redirect(withFlash('/admin/company', 'Informations entreprise enregistrées.'));
}

const statSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1),
  labelFr: z.string().min(1),
  labelEn: z.string().min(1),
  order: z.coerce.number().int().default(0)
});

export async function saveStat(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = statSchema.parse(raw);

  const isNew = !parsed.id;
  if (parsed.id) {
    await prisma.stat.update({ where: { id: parsed.id }, data: parsed });
  } else {
    await prisma.stat.create({ data: parsed });
  }
  revalidateAllLocales();
  redirect(withFlash('/admin/company', isNew ? 'Statistique ajoutée.' : 'Statistique enregistrée.'));
}

export async function deleteStat(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.stat.delete({ where: { id } });
  revalidateAllLocales();
  redirect(withFlash('/admin/company', 'Statistique supprimée.'));
}
