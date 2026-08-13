import type { Project, Task } from '@/types';

export type ProjectDeliverySummary = {
  project: Project;
  tasks: Task[];
  completedTasks: number;
  openTasks: number;
  progressPercent: number;
};

export function getProjectTaskProgress(tasks: Task[]) {
  const completedTasks = tasks.filter((task) => task.status === 'DONE').length;

  return {
    completedTasks,
    openTasks: tasks.length - completedTasks,
    progressPercent: tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100),
  };
}

export function createProjectDeliverySummary(
  project: Project,
  tasks: Task[],
): ProjectDeliverySummary {
  return {
    project,
    tasks,
    ...getProjectTaskProgress(tasks),
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
