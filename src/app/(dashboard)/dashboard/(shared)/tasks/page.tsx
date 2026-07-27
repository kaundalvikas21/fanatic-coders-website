import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { TaskQueue } from '@/modules/projects';
import { getTasks } from '@/modules/projects/data/tasks';
import { getCurrentAccess } from '@/lib/auth/current-access';
import type { Task } from '@/types';

export const metadata = {
  title: 'Tasks | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const access = await getCurrentAccess();
  const canManageTasks = access?.role === 'ADMIN' || access?.role === 'MANAGER';
  const canUpdateTaskStatus = canManageTasks || access?.role === 'MEMBER';
  const response = await getTasks();
  const tasks: Task[] =
    response.success && Array.isArray(response.data) ? (response.data as Task[]) : [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tasks"
        description={
          canManageTasks
            ? 'Review delivery tasks across projects you can access.'
            : 'Track assigned delivery work and update task status.'
        }
      />

      {response.success ? (
        <TaskQueue
          tasks={tasks}
          canManageTasks={canManageTasks}
          canUpdateStatus={canUpdateTaskStatus}
        />
      ) : (
        <ErrorState
          title="Could not load tasks"
          message={response.message}
        />
      )}
    </div>
  );
}
