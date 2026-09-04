'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { withFlash } from '@/lib/adminFlash';

export async function markMessageRead(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
  redirect(withFlash('/admin/messages', 'Message marqué comme lu.'));
}

export async function deleteMessage(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
  redirect(withFlash('/admin/messages', 'Message supprimé.'));
}
