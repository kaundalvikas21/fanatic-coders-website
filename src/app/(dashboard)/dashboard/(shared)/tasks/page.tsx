import { ErrorState } from '@/components/shared/error-state';
import { TaskKanbanBoard, TasksInformation } from '@/modules/projects';
import { getTasks } from '@/modules/projects/data/tasks/queries';
import type { Task } from '@/types';

export const metadata = {
  title: 'Tasks | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const response = await getTasks();

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load tasks"
        message={response.message}
      />
    );
  }

  const tasks = Array.isArray(response.data) ? (response.data as Task[]) : [];

  return (
    <div className="flex flex-col gap-5">
      <TasksInformation tasks={tasks} />
      <TaskKanbanBoard
        key={tasks.map((task) => `${task.id}:${task.status}`).join('|')}
        tasks={tasks}
      />
    </div>
  );
}
