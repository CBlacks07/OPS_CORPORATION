'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { SECTION_COVERS } from '@/lib/sections';

const schema = z.object({
  key: z.enum(SECTION_COVERS.map((s) => s.key) as [string, ...string[]]),
  imageUrl: z.string().url().optional().or(z.literal(''))
});

export async function saveCover(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.parse(raw);

  await prisma.sectionCover.upsert({
    where: { id: parsed.key },
    update: { imageUrl: parsed.imageUrl || null },
    create: { id: parsed.key, imageUrl: parsed.imageUrl || null }
  });

  revalidatePath('/fr');
  revalidatePath('/en');
  revalidatePath('/fr/services');
  revalidatePath('/en/services');
  revalidatePath('/fr/a-propos');
  revalidatePath('/en/a-propos');
  revalidatePath('/fr/realisations');
  revalidatePath('/en/realisations');
  revalidatePath('/fr/contact');
  revalidatePath('/en/contact');
}
