import { notFound } from 'next/navigation';
import { MessageSquareText } from 'lucide-react';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import {
  ProjectInfoCard,
  ProjectActionsCard,
  ProjectConversation,
  ProjectMembersCard,
  ProjectTasksCard,
  TaskCreateForm,
  createProjectPermissions,
} from '@/modules/projects';
import { getProjectById } from '@/modules/projects/data/queries';
import { getProjectTasks } from '@/modules/projects/data/tasks';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { OrganizationMemberRole, Project, Task } from '@/types';

export const dynamic = 'force-dynamic';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TASK_ASSIGNMENT_ROLES = [
  'MANAGER',
  'MEMBER',
] as const satisfies readonly OrganizationMemberRole[];

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const access = await getCurrentAccess();
  const projectPermissions = createProjectPermissions(access);
  const canManageTasks = access?.role === 'ADMIN' || access?.role === 'MANAGER';
  const canUpdateTaskStatus = canManageTasks || access?.role === 'MEMBER';
  const { success, data: project } = (await getProjectById(id)) as {
    success: boolean;
    data?: Project | null;
  };

  if (!success || !project) {
    notFound();
  }

  const tasksResponse = await getProjectTasks(project.id);
  const tasks: Task[] =
    tasksResponse.success && Array.isArray(tasksResponse.data)
      ? (tasksResponse.data as Task[])
      : [];
  const assignableMembers = canManageTasks
    ? await getOrganizationMembersByRole(TASK_ASSIGNMENT_ROLES)
    : [];

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        <PageHeader
          title={project.name}
          description={project.description ?? 'Project delivery workspace.'}
          showBackButton
          backLabel="Projects"
        />

        <ProjectTasksCard
          tasks={tasks}
          canManageTasks={canManageTasks}
          canUpdateStatus={canUpdateTaskStatus}
        />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {projectPermissions.canUpdate && <ProjectActionsCard project={project} />}
        <ActionSheet
          title="Project chat"
          description="Coordinate delivery, tasks, and project decisions in real time."
          trigger={
            <ActionSheetButton className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 rounded-full px-4 sm:right-6 sm:bottom-6">
              <MessageSquareText data-icon="inline-start" />
              Project chat
            </ActionSheetButton>
          }
        >
          <div className="min-h-0 flex-1 overflow-hidden border-y border-border">
            <ProjectConversation projectId={project.id} />
          </div>
        </ActionSheet>
        {canManageTasks && (
          <TaskCreateForm
            projectId={project.id}
            assignableMembers={assignableMembers}
          />
        )}
        <ProjectInfoCard project={project} />
        <ProjectMembersCard project={project} />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
