import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Nouvelle réalisation</h1>
      <ProjectForm project={null} />
    </div>
  );
}
