import { MemberAccountCard } from '@/components/dashboard/users/detail';
import { getMemberDetail } from '@/lib/data/users/get-member-detail';

export default async function MemberAccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMemberDetail(id);
  return <MemberAccountCard member={member} />;
}
