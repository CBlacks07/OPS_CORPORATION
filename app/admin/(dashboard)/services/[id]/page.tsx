import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ServiceForm from '@/components/admin/ServiceForm';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Modifier — {service.titleFr}</h1>
      <ServiceForm service={service} />
    </div>
  );
}
