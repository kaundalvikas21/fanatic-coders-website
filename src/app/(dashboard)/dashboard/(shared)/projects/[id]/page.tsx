import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ChatActionSheet, ChatProvider } from '@/modules/chat';
import {
  ProjectInfoCard,
  ProjectActionsCard,
  ProjectConversation,
  ProjectMembersCard,
  ProjectMediaPanel,
  ProjectProgressCard,
  createProjectPermissions,
} from '@/modules/projects';
import { ProjectTasksCard, createTaskPermissions } from '@/modules/tasks';
import { getProjectById } from '@/modules/projects/data/queries';
import { getProjectMedia } from '@/modules/projects/data/media';
import { getProjectTasks } from '@/modules/tasks/data/queries';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { Media, OrganizationMemberRole, Project, Task } from '@/types';

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
  const [access, projectResponse] = await Promise.all([getCurrentAccess(), getProjectById(id)]);
  const projectPermissions = createProjectPermissions(access);
  const taskPermissions = createTaskPermissions(access);
  const { success, data: project } = projectResponse as {
    success: boolean;
    data?: Project | null;
  };

  if (!success || !project) {
    notFound();
  }

  const [tasksResponse, mediaResponse, assignableMembers] = await Promise.all([
    getProjectTasks(project.id),
    getProjectMedia(project.id, { page: 1, pageSize: 20 }),
    taskPermissions.canCreate
      ? getOrganizationMembersByRole(TASK_ASSIGNMENT_ROLES)
      : Promise.resolve([]),
  ]);
  const tasks: Task[] =
    tasksResponse.success && Array.isArray(tasksResponse.data)
      ? (tasksResponse.data as Task[])
      : [];
  const media: Media[] = mediaResponse.success ? mediaResponse.data.items : [];

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        <PageHeader
          title={project.name}
          description={project.description ?? 'Project delivery workspace.'}
          showBackButton
          backLabel="Projects"
        />

        <ProjectProgressCard
          project={project}
          tasks={tasks}
        />

        <ProjectTasksCard
          projectId={project.id}
          tasks={tasks}
          assignableMembers={assignableMembers}
        />

        <ProjectMediaPanel
          projectId={project.id}
          media={media}
        />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {/* Project Actions */}
        {projectPermissions.canUpdate && <ProjectActionsCard project={project} />}

        {/* Chat Integration */}
        {access && (
          <ChatProvider
            channel={{ type: 'project', id: project.id }}
            currentMemberId={access.memberId}
          >
            <ChatActionSheet
              title="Project chat"
              description="Coordinate delivery, tasks, and project decisions in real time."
              triggerLabel="Project chat"
            >
              <div className="min-h-0 flex-1 overflow-hidden border-y border-border">
                <ProjectConversation />
              </div>
            </ChatActionSheet>
          </ChatProvider>
        )}

        <ProjectInfoCard project={project} />
        <ProjectMembersCard project={project} />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
