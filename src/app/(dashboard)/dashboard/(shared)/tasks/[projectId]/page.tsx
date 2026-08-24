import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import {
  TaskKanbanBoard,
  TasksInformation,
  createTaskPermissions,
  getTaskKanbanKey,
} from '@/modules/tasks';
import { getProjectById } from '@/modules/projects/data/queries';
import { getProjectTasks } from '@/modules/tasks/data/queries';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { OrganizationMemberRole, Project, Task } from '@/types';

const TASK_ASSIGNMENT_ROLES = [
  'MANAGER',
  'MEMBER',
] as const satisfies readonly OrganizationMemberRole[];

type ProjectTasksPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const { projectId } = await params;
  const [projectResponse, access] = await Promise.all([
    getProjectById(projectId),
    getCurrentAccess(),
  ]);
  const project = projectResponse.success ? (projectResponse.data as Project | null) : null;

  if (!project) {
    notFound();
  }

  const tasksResponse = await getProjectTasks(project.id);

  if (!tasksResponse.success) {
    return (
      <ErrorState
        title="Could not load tasks"
        message={tasksResponse.message}
      />
    );
  }

  const tasks = Array.isArray(tasksResponse.data) ? (tasksResponse.data as Task[]) : [];
  const assignableMembers = createTaskPermissions(access).canUpdate
    ? await getOrganizationMembersByRole(TASK_ASSIGNMENT_ROLES)
    : [];

  return (
    <div className="flex flex-col gap-5">
      <TasksInformation
        tasks={tasks}
        project={project}
      />
      <TaskKanbanBoard
        key={`${project.id}:${getTaskKanbanKey(tasks)}`}
        tasks={tasks}
        showProjects={false}
        assignableMembers={assignableMembers}
      />
    </div>
  );
}
