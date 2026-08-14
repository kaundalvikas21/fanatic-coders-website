import type { PaginatedProjects, Project, Task } from '@/types';
import { getProjects } from './queries';
import { getProjectTasks } from './tasks';
import { createProjectDeliverySummary, type ProjectDeliverySummary } from '../utils/progress';

export async function getProjectDeliverySummaries(): Promise<ProjectDeliverySummary[]> {
  const response = await getProjects({ pageSize: 100 });
  const data = response.success ? (response.data as PaginatedProjects | null) : null;
  const projects: Project[] = Array.isArray(data?.items) ? data.items : [];

  return Promise.all(
    projects.map(async (project) => {
      const tasksResponse = await getProjectTasks(project.id);
      const tasks: Task[] =
        tasksResponse.success && Array.isArray(tasksResponse.data)
          ? (tasksResponse.data as Task[])
          : [];

      return createProjectDeliverySummary(project, tasks);
    }),
  );
}
