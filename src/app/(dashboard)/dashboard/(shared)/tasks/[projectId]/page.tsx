import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import { TaskKanbanBoard, TasksInformation } from '@/modules/projects';
import { getProjectById } from '@/modules/projects/data/queries';
import { getProjectTasks } from '@/modules/projects/data/tasks/queries';
import type { Project, Task } from '@/types';

type ProjectTasksPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const { projectId } = await params;
  const projectResponse = await getProjectById(projectId);
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

  return (
    <div className="flex flex-col gap-5">
      <TasksInformation
        tasks={tasks}
        project={project}
      />
      <TaskKanbanBoard
        key={`${project.id}:${tasks.map((task) => `${task.id}:${task.status}`).join('|')}`}
        tasks={tasks}
        showProjects={false}
      />
    </div>
  );
}
