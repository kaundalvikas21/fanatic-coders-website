import { AlertCircle, ListChecks } from 'lucide-react';
import Link from 'next/link';

import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTaskDetailPath } from '@/modules/tasks/utils/task-path';
import type { Task } from '@/types';
import { TASK_STATUS_BADGE_VARIANTS, TASK_STATUS_COLORS, TASK_STATUS_OPTIONS } from '@/types';
import { formatDate } from '@/utils/date';

type MemberCurrentAssignmentsProps = {
  tasks: Task[];
  unavailable?: boolean;
};

const getStatusLabel = (task: Task) =>
  TASK_STATUS_OPTIONS.find((option) => option.value === task.status)?.label ?? task.status;

const isTaskOverdue = (task: Task) => {
  if (!task.dueDate) return false;

  const dueDate = new Date(task.dueDate);
  return !Number.isNaN(dueDate.getTime()) && dueDate.getTime() < Date.now();
};

function TaskProjectLink({ task }: { task: Task }) {
  if (!task.project?.name) {
    return <span className="text-muted-foreground">Project unavailable</span>;
  }

  return (
    <Link
      href={`/dashboard/projects/${task.projectId}`}
      className="block truncate text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {task.project.name}
    </Link>
  );
}

export function MemberCurrentAssignments({
  tasks,
  unavailable = false,
}: MemberCurrentAssignmentsProps) {
  return (
    <WidgetCard
      icon={ListChecks}
      title="Current assignments"
      description="Recent work assigned to this member."
      titleClassName="text-xl font-semibold"
      contentClassNames="px-0"
      actionSlot={
        <Button
          asChild
          variant="link"
          size="sm"
          className="min-h-11"
        >
          <Link href="/dashboard/tasks">View all tasks</Link>
        </Button>
      }
    >
      {unavailable ? (
        <div className="flex items-start gap-3 px-6 py-8 text-sm text-muted-foreground">
          <AlertCircle
            className="mt-0.5 size-4 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p>Current assignments could not be loaded. Please try again shortly.</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ListChecks
              className="size-5"
              aria-hidden="true"
            />
          </div>
          <p className="mt-4 text-sm font-medium">No current assignments</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Active tasks assigned to this member will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-border/60 xl:hidden">
            {tasks.map((task) => (
              <article
                key={task.id}
                className="grid gap-3 px-4 py-4 sm:px-6"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <Link
                    href={getTaskDetailPath(task.projectId, task.id)}
                    className="min-w-0 font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {task.title}
                  </Link>
                  <Badge
                    variant={TASK_STATUS_BADGE_VARIANTS[task.status]}
                    color={TASK_STATUS_COLORS[task.status]}
                    className="shrink-0"
                  >
                    {getStatusLabel(task)}
                  </Badge>
                </div>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">Project</dt>
                    <dd className="mt-1 min-w-0">
                      <TaskProjectLink task={task} />
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">Due date</dt>
                    <dd
                      className={
                        isTaskOverdue(task)
                          ? 'mt-1 font-medium text-destructive'
                          : 'mt-1 text-foreground'
                      }
                    >
                      {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden xl:block">
            <Table className="min-w-160">
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6">Due date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="max-w-72 pl-6 whitespace-normal">
                      <Link
                        href={getTaskDetailPath(task.projectId, task.id)}
                        className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {task.title}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-56">
                      <TaskProjectLink task={task} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={TASK_STATUS_BADGE_VARIANTS[task.status]}
                        color={TASK_STATUS_COLORS[task.status]}
                      >
                        {getStatusLabel(task)}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={isTaskOverdue(task) ? 'pr-6 font-medium text-destructive' : 'pr-6'}
                    >
                      {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </WidgetCard>
  );
}
