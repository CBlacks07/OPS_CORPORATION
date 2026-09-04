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
  icon: z.string().min(1),
  titleFr: z.string().min(1),
  titleEn: z.string().min(1),
  descFr: z.string().min(1),
  descEn: z.string().min(1),
  featureFr1: z.string().default(''),
  featureEn1: z.string().default(''),
  featureFr2: z.string().default(''),
  featureEn2: z.string().default(''),
  featureFr3: z.string().default(''),
  featureEn3: z.string().default(''),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(false)
});

function revalidateAllLocales() {
  revalidatePath('/fr');
  revalidatePath('/en');
  revalidatePath('/fr/services');
  revalidatePath('/en/services');
}

export async function saveService(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.parse({ ...raw, active: formData.get('active') === 'on' });

  const features = [
    { fr: parsed.featureFr1, en: parsed.featureEn1 },
    { fr: parsed.featureFr2, en: parsed.featureEn2 },
    { fr: parsed.featureFr3, en: parsed.featureEn3 }
  ].filter((f) => f.fr.trim() || f.en.trim());

  const data = {
    slug: parsed.slug,
    icon: parsed.icon,
    titleFr: parsed.titleFr,
    titleEn: parsed.titleEn,
    descFr: parsed.descFr,
    descEn: parsed.descEn,
    features: JSON.stringify(features),
    order: parsed.order,
    active: parsed.active
  };

  const isNew = !parsed.id;
  if (parsed.id) {
    await prisma.service.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidateAllLocales();
  redirect(withFlash('/admin/services', isNew ? 'Service ajouté.' : 'Service mis à jour.'));
}

export async function deleteService(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  revalidateAllLocales();
  redirect(withFlash('/admin/services', 'Service supprimé.'));
}
