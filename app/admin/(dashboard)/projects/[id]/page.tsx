import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Modifier — {project.titleFr}</h1>
      <ProjectForm project={project} />
    </div>
  );
}
