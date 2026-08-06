import Link from 'next/link';
import { BriefcaseBusiness, CheckCircle2, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WidgetCard } from '@/components/shared/widget-card';
import { getProjects } from '@/modules/projects/data/queries';
import { getProjectTasks } from '@/modules/projects/data/tasks';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { formatDate } from '@/utils/date';
import type { PaginatedProjects, Project, Task } from '@/types';

export const metadata = {
  title: 'Client Dashboard | fanaticCoders',
};

export const dynamic = 'force-dynamic';

function getProjectProgress(tasks: Task[]) {
  if (tasks.length === 0) {
    return 0;
  }

  return Math.round((tasks.filter((task) => task.status === 'DONE').length / tasks.length) * 100);
}

export default async function ClientDashboardPage() {
  const projectsResponse = await getProjects({ pageSize: 100 });
  const projectsData =
    projectsResponse.success && projectsResponse.data
      ? (projectsResponse.data as PaginatedProjects)
      : null;
  const projects: Project[] = Array.isArray(projectsData?.items) ? projectsData.items : [];

  const projectCards = await Promise.all(
    projects.map(async (project) => {
      const tasksResponse = await getProjectTasks(project.id);
      const tasks: Task[] =
        tasksResponse.success && Array.isArray(tasksResponse.data)
          ? (tasksResponse.data as Task[])
          : [];

      return {
        project,
        tasks,
        progress: getProjectProgress(tasks),
      };
    }),
  );

  return (
    <div className="space-y-8">
      <WidgetCard
        icon={BriefcaseBusiness}
        title="Your projects"
        description="Track project progress, completed work, and upcoming delivery steps."
        titleClassName="text-3xl"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-2xl font-semibold">{projects.length}</p>
            <p className="text-sm text-muted-foreground">Active projects</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">
              {projectCards.reduce((total, item) => total + item.tasks.length, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Tracked tasks</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">
              {projectCards.reduce(
                (total, item) => total + item.tasks.filter((task) => task.status === 'DONE').length,
                0,
              )}
            </p>
            <p className="text-sm text-muted-foreground">Completed tasks</p>
          </div>
        </div>
      </WidgetCard>

      {projectCards.length === 0 ? (
        <WidgetCard
          icon={ClipboardList}
          title="No projects yet"
          description="Your projects will appear here once delivery begins."
        >
          <Button asChild>
            <Link href="/dashboard/services/new">Start a service request</Link>
          </Button>
        </WidgetCard>
      ) : (
        <section className="grid gap-4">
          {projectCards.map(({ project, tasks, progress }) => (
            <article
              key={project.id}
              className="rounded-lg border bg-card p-5 text-card-foreground"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-normal">{project.name}</h2>
                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{SERVICE_REQUEST_SERVICE_LABELS[project.service]}</span>
                    <span>Started {formatDate(project.startDate ?? project.createdAt)}</span>
                    <span>{tasks.length} tasks</span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full lg:w-auto"
                >
                  <Link href={`/dashboard/projects/${project.id}`}>View project</Link>
                </Button>
              </div>

              <div className="mt-5 grid gap-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              {tasks.length > 0 && (
                <div className="mt-4 grid gap-2">
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 truncate">{task.title}</span>
                      <span className="shrink-0 text-muted-foreground">{task.status}</span>
                    </div>
                  ))}
                  {tasks.some((task) => task.status === 'DONE') && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4" />
                      Completed work is reflected in the progress bar.
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
