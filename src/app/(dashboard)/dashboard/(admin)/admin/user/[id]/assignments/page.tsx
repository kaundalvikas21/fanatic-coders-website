import { MemberCurrentAssignments } from '@/components/dashboard/users/detail';
import { getMemberDetail } from '@/lib/data/users/get-member-detail';
import { getTasksByMemberId } from '@/modules/tasks/data';

export default async function MemberAssignmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getMemberDetail(id);
  const response = await getTasksByMemberId(member.id);

  return (
    <MemberCurrentAssignments
      tasks={response.success ? response.data : []}
      unavailable={!response.success}
    />
  );
}
