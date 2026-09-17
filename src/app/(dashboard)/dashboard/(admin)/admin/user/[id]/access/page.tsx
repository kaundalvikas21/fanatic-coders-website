import { MemberAccessCard } from '@/components/dashboard/users/detail';
import { getMemberDetail } from '@/lib/data/users/get-member-detail';

export default async function MemberAccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMemberDetail(id);
  return <MemberAccessCard member={member} />;
}
