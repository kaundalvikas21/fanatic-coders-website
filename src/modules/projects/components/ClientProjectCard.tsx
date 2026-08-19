import { ArrowUpRight, CheckCircle2, CircleDashed, ListTodo } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import type { ProjectDeliverySummary } from '@/modules/projects/utils/progress';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { PROJECT_STATUS_BADGE_VARIANTS, PROJECT_STATUS_COLORS } from '@/types';
import { formatDate } from '@/utils/date';

export function ClientProjectCard({ summary }: { summary: ProjectDeliverySummary }) {
  const { project, tasks, completedTasks, openTasks, progressPercent } = summary;
  const recentTasks = tasks.slice(0, 3);

  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card text-card-foreground transition-colors hover:border-primary/25">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="truncate text-lg font-semibold tracking-[-0.01em]">{project.name}</h2>
              <Badge
                variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}
                color={PROJECT_STATUS_COLORS[project.status]}
              >
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {SERVICE_REQUEST_SERVICE_LABELS[project.service]}
              <span aria-hidden="true"> · </span>
              Started {formatDate(project.startDate ?? project.createdAt)}
            </p>
          </div>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full shrink-0 sm:w-auto"
          >
            <Link href={`/dashboard/projects/${project.id}`}>
              Open project
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="rounded-lg bg-muted/35 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Delivery progress</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tasks.length === 0
                  ? 'Progress begins when delivery tasks are added.'
                  : `${completedTasks} of ${tasks.length} tasks completed`}
              </p>
            </div>
            <span className="font-mono text-xl font-semibold tabular-nums">{progressPercent}%</span>
          </div>
          <Progress
            value={progressPercent}
            aria-label={`${project.name} is ${progressPercent}% complete`}
            className="mt-3 h-2"
          />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              {completedTasks} completed
            </span>
            <span className="flex items-center gap-1.5">
              <CircleDashed className="size-3.5" />
              {openTasks} remaining
            </span>
          </div>
        </div>

        {recentTasks.length > 0 && (
          <div>
            <div className="mb-2.5 flex items-center gap-2 text-sm font-medium">
              <ListTodo className="size-4 text-muted-foreground" />
              Latest tasks
            </div>
            <div className="divide-y rounded-lg border border-border/70">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-4 px-3.5 py-2.5 text-sm"
                >
                  <span className="min-w-0 truncate">{task.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {task.status === 'DONE' ? 'Completed' : 'In progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
