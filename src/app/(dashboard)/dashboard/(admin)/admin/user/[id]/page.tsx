import { notFound } from 'next/navigation';
import {
  MemberAccessCard,
  MemberAccountCard,
  MemberActivityPlaceholder,
  MemberAssignmentStats,
  MemberCurrentAssignments,
} from '@/components/dashboard/users/detail';
import { BackButton } from '@/components/shared/back-button';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { ProfileDetails } from '@/components/shared/profile-details';
import { Badge } from '@/components/ui/badge';
import { getUserMemberById } from '@/lib/data/users/queries';
import { getTasksByMemberId, getTaskStatsByMemberId } from '@/modules/tasks/data';
import { formatDate } from '@/utils/date';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getUserMemberById(id);
  const member = response.success ? response.data : null;

  if (!member) {
    notFound();
  }

  const [tasksResponse, statsResponse] = await Promise.all([
    getTasksByMemberId(member.id),
    getTaskStatsByMemberId(member.id),
  ]);

  const tasks = tasksResponse.success ? tasksResponse.data : [];
  const stats = statsResponse.success ? statsResponse.data : null;

  return (
    <DetailPageLayout className="xl:grid-cols-[20rem_minmax(0,1fr)]">
      {/* Keeps member identity and assignment totals visible beside desktop detail content. */}
      <DetailPageLayout.Aside>
        <ProfileDetails
          name={member.user.name}
          email={member.user.email}
          image={member.user.image}
          nameAsHeading
          className="relative xl:sticky xl:top-(--header-offset)"
          actionSlot={<BackButton label="Back to users" />}
          meta={
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>
              <Badge variant="secondary">Organization member</Badge>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Joined {formatDate(member.createdAt)}</p>
            </div>
            <MemberAssignmentStats stats={stats} />
            <p className="text-center text-xs leading-5 text-muted-foreground">
              Work counts summarize tasks assigned to this organization member.
            </p>
          </div>
        </ProfileDetails>
      </DetailPageLayout.Aside>

      <DetailPageLayout.Main>
        {/* Shows active work first because it is the primary operational context for a member. */}
        <MemberCurrentAssignments
          tasks={tasks}
          unavailable={!tasksResponse.success}
        />

        {/* Groups stable account identifiers with role-derived organization access. */}
        <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <MemberAccountCard member={member} />
          <MemberAccessCard member={member} />
        </div>

        {/* Reserves the activity surface until member event tracking is available. */}
        <MemberActivityPlaceholder />
      </DetailPageLayout.Main>
    </DetailPageLayout>
  );
}
