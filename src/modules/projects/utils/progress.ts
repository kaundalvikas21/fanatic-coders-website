import type { Project, Task } from '@/types';

export type ProjectDeliverySummary = {
  project: Project;
  tasks: Task[];
  completedTasks: number;
  openTasks: number;
  progressPercent: number;
};

export function getProjectTaskProgress(tasks: Task[] | null | undefined) {
  const safeTasks = tasks ?? [];
  const completedTasks = safeTasks.filter((task) => task?.status === 'DONE').length;

  return {
    completedTasks,
    openTasks: safeTasks.length - completedTasks,
    progressPercent:
      safeTasks.length === 0 ? 0 : Math.round((completedTasks / safeTasks.length) * 100),
  };
}

export function createProjectDeliverySummary(
  project: Project,
  tasks: Task[] | null | undefined,
): ProjectDeliverySummary {
  const safeTasks = tasks ?? [];

  return {
    project,
    tasks: safeTasks,
    ...getProjectTaskProgress(safeTasks),
  };
}

export function getDeliveryOverview(summaries: ProjectDeliverySummary[]) {
  const projects = summaries.map(({ project }) => project);
  const totalTasks = summaries.reduce((total, summary) => total + summary.tasks.length, 0);
  const completedTasks = summaries.reduce((total, summary) => total + summary.completedTasks, 0);

  return {
    projects,
    totalTasks,
    completedTasks,
    openTasks: totalTasks - completedTasks,
    activeProjects: projects.filter((project) => project.status === 'ACTIVE').length,
    completionRate: totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
  };
}
