import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import SectorForm from '@/components/admin/SectorForm';

export default async function EditSectorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sector = await prisma.sector.findUnique({ where: { id } });
  if (!sector) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Modifier — {sector.titleFr}</h1>
      <SectorForm sector={sector} />
    </div>
  );
}
