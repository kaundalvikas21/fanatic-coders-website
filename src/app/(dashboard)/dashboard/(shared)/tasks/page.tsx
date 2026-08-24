import { ErrorState } from '@/components/shared/error-state';
import {
  TaskKanbanBoard,
  TasksInformation,
  createTaskPermissions,
  getTaskKanbanKey,
} from '@/modules/tasks';
import { getTasks } from '@/modules/tasks/data/queries';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { OrganizationMemberRole, Task } from '@/types';

const TASK_ASSIGNMENT_ROLES = [
  'MANAGER',
  'MEMBER',
] as const satisfies readonly OrganizationMemberRole[];

export const metadata = {
  title: 'Tasks | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const [response, access] = await Promise.all([getTasks(), getCurrentAccess()]);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load tasks"
        message={response.message}
      />
    );
  }

  const tasks = Array.isArray(response.data) ? (response.data as Task[]) : [];
  const assignableMembers = createTaskPermissions(access).canUpdate
    ? await getOrganizationMembersByRole(TASK_ASSIGNMENT_ROLES)
    : [];

  return (
    <div className="flex flex-col gap-5">
      <TasksInformation tasks={tasks} />
      <TaskKanbanBoard
        key={getTaskKanbanKey(tasks)}
        tasks={tasks}
        assignableMembers={assignableMembers}
      />
    </div>
  );
}
