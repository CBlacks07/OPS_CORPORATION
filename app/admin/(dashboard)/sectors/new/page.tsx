import SectorForm from '@/components/admin/SectorForm';

export default function NewSectorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Nouveau secteur</h1>
      <SectorForm sector={null} />
    </div>
  );
}
