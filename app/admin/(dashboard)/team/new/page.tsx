import TeamMemberForm from '@/components/admin/TeamMemberForm';

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Nouveau membre de l'équipe</h1>
      <TeamMemberForm member={null} />
    </div>
  );
}
