import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Modifier — {member.name}</h1>
      <TeamMemberForm member={member} />
    </div>
  );
}
