import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Nouveau service</h1>
      <ServiceForm service={null} />
    </div>
  );
}
