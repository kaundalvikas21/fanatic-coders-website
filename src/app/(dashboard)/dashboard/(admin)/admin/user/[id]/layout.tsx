import type { ReactNode } from 'react';
import { MemberAssignmentStats, MemberDetailTabs } from '@/components/dashboard/users/detail';
import { Pencil, Trash2 } from 'lucide-react';
import { EditMemberRoleForm } from '@/components/dashboard/users/EditMemberRoleForm';
import { DeleteUserActions } from '@/components/dashboard/users/DeleteUserActions';
import { ActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { hasAnyRole, Role } from '@/lib/auth/roles';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ProfileDetails } from '@/components/shared/profile-details';
import { Badge } from '@/components/ui/badge';
import { getMemberDetail } from '@/lib/data/users/get-member-detail';
import { getTaskStatsByMemberId } from '@/modules/tasks/data';
import { formatDate } from '@/utils/date';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getMemberDetail(id);
  const access = await getCurrentAccess();
  const statsResponse = await getTaskStatsByMemberId(member.id);
  const stats = statsResponse.success ? statsResponse.data : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="User details"
        description="Account information, assigned work, and workspace access."
      />
      <DetailPageLayout className="xl:grid-cols-[20rem_minmax(0,1fr)]">
        {/* Keeps member identity and assignment totals visible beside desktop detail content. */}
        <DetailPageLayout.Aside>
          <ProfileDetails
            name={member.user.name}
            email={member.user.email}
            image={member.user.image}
            className="relative bg-card py-6 xl:sticky xl:top-(--header-offset)"
            meta={
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>
                <Badge variant="secondary">Organization member</Badge>
              </div>
            }
          >
            <div className="space-y-6">
              <MemberAssignmentStats stats={stats} />
              <div>
                <h2 className="border-b pb-3 text-sm font-semibold">Details</h2>
                <dl className="space-y-4 pt-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="shrink-0 text-muted-foreground">Member ID</dt>
                    <dd className="min-w-0 break-all text-right font-mono text-xs leading-5">
                      {member.id}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Role</dt>
                    <dd>
                      <Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Membership</dt>
                    <dd>Accepted</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Joined</dt>
                    <dd>{formatDate(member.createdAt)}</dd>
                  </div>
                </dl>
              </div>
              {access && hasAnyRole(access.role, [Role.ADMIN]) && (
                <div className="flex flex-wrap gap-2 border-t pt-5">
                  {!hasAnyRole(member.role, [Role.ADMIN]) && (
                    <ActionDialog
                      title="Edit role"
                      description="Change this member's organization role."
                      trigger={
                        <Button
                          variant="default"
                          size="lg"
                          className="flex-1"
                        >
                          <Pencil data-icon="inline-start" />
                          Edit role
                        </Button>
                      }
                    >
                      <EditMemberRoleForm key={member.id} />
                    </ActionDialog>
                  )}
                  {access.memberId !== member.id && (
                    <ActionDialog
                      title={`Delete ${member.user.name}?`}
                      description="Deletes this account and any client-owned data. Work created for other clients is kept. This cannot be undone."
                      trigger={
                        <Button
                          variant="destructive"
                          size="lg"
                          className="flex-1"
                        >
                          <Trash2 data-icon="inline-start" />
                          Delete user
                        </Button>
                      }
                    >
                      <DeleteUserActions
                        member={member}
                        redirectTo="/dashboard/admin/user"
                      />
                    </ActionDialog>
                  )}
                </div>
              )}
            </div>
          </ProfileDetails>
        </DetailPageLayout.Aside>

        <DetailPageLayout.Main>
          <MemberDetailTabs memberId={member.id}>{children}</MemberDetailTabs>
        </DetailPageLayout.Main>
      </DetailPageLayout>
    </div>
  );
}
