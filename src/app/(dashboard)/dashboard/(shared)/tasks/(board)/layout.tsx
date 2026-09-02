import { Suspense, type ReactNode } from 'react';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { TasksProjectToolbar, createTaskPermissions } from '@/modules/tasks';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { OrganizationMemberRole } from '@/types';

const TASK_ASSIGNMENT_ROLES = [
  'MANAGER',
  'MEMBER',
] as const satisfies readonly OrganizationMemberRole[];

export default async function TasksLayout({ children }: { children: ReactNode }) {
  const access = await getCurrentAccess();
  const taskPermissions = createTaskPermissions(access);
  const assignableMembers = taskPermissions.canCreate
    ? await getOrganizationMembersByRole(TASK_ASSIGNMENT_ROLES)
    : [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tasks"
        description="Review and manage delivery tasks across projects."
        actionSlot={
          <Suspense fallback={null}>
            <TasksProjectToolbar assignableMembers={assignableMembers} />
          </Suspense>
        }
      />
      <DetailPageLayout className="xl:grid-cols-1">
        <DetailPageLayout.Main>{children}</DetailPageLayout.Main>
      </DetailPageLayout>
    </div>
  );
}
