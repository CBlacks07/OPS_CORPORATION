'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function changePassword(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect('/admin/login');

  const currentPassword = String(formData.get('currentPassword') || '');
  const newPassword = String(formData.get('newPassword') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  const user = await prisma.user.findUnique({ where: { email: session!.user!.email! } });
  if (!user) redirect('/admin/login');

  const valid = await bcrypt.compare(currentPassword, user!.passwordHash);
  if (!valid) {
    redirect('/admin/account?error=current');
  }
  if (newPassword.length < 8) {
    redirect('/admin/account?error=length');
  }
  if (newPassword !== confirmPassword) {
    redirect('/admin/account?error=mismatch');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user!.id }, data: { passwordHash } });

  redirect('/admin/account?success=1');
}
