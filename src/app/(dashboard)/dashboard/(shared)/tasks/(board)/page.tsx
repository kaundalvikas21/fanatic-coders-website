import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import { TaskKanbanBoard, TasksInformation, getTaskKanbanKey } from '@/modules/tasks';
import { getProjectById } from '@/modules/projects/data/queries';
import { getProjectTasks, getTasks } from '@/modules/tasks/data/queries';
import type { Project, Task } from '@/types';

export const metadata = {
  title: 'Tasks | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type TasksPageProps = {
  searchParams: Promise<{ projectId?: string | string[] }>;
};

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const query = await searchParams;
  const projectId = typeof query.projectId === 'string' ? query.projectId : undefined;
  const [response, projectResponse] = await Promise.all([
    projectId ? getProjectTasks(projectId) : getTasks(),
    projectId ? getProjectById(projectId) : Promise.resolve(null),
  ]);

  if (projectResponse && !projectResponse.success) {
    if (projectResponse.status === 404) {
      notFound();
    }

    return (
      <ErrorState
        title="Could not load project"
        message={projectResponse.message}
      />
    );
  }

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load tasks"
        message={response.message}
      />
    );
  }

  const tasks = Array.isArray(response.data) ? (response.data as Task[]) : [];
  const project = projectResponse?.success ? (projectResponse.data as Project) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <TasksInformation
        tasks={tasks}
        project={project}
      />
      <TaskKanbanBoard
        key={`${projectId ?? 'all'}:${getTaskKanbanKey(tasks)}`}
        tasks={tasks}
        showProjects={!projectId}
      />
    </div>
  );
}
