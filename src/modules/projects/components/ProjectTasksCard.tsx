import { ListChecks } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WidgetCard } from '@/components/shared/widget-card';
import { formatDate } from '@/utils/date';
import type { Task } from '@/types';
import {
  TASK_PRIORITY_BADGE_VARIANTS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_BADGE_VARIANTS,
  TASK_STATUS_OPTIONS,
} from '@/types';
import { TaskDeleteButton } from './TaskDeleteButton';
import { TaskStatusSelect } from './TaskStatusSelect';

type ProjectTasksCardProps = {
  tasks: Task[];
  canManageTasks: boolean;
  canUpdateStatus?: boolean;
};

function getOptionLabel<TValue extends string>(
  options: readonly { value: TValue; label: string }[],
  value: TValue,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function getAssigneeLabel(task: Task) {
  if (task.assignees.length === 0) {
    return 'Unassigned';
  }

  return task.assignees
    .map((assignee) => assignee.member.user.name || assignee.member.user.email)
    .join(', ');
}

export function ProjectTasksCard({
  tasks,
  canManageTasks,
  canUpdateStatus = true,
}: ProjectTasksCardProps) {
  return (
    <WidgetCard
      icon={ListChecks}
      title="Delivery tasks"
      description="Assign work and track progress inside this project."
      titleClassName="text-xl font-semibold"
    >
      {tasks.length === 0 ? (
        <p className="text-sm leading-6 text-muted-foreground">
          No tasks yet. Create the first delivery task for this project.
        </p>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold tracking-normal">{task.title}</h3>
                    <Badge variant={TASK_STATUS_BADGE_VARIANTS[task.status]}>
                      {getOptionLabel(TASK_STATUS_OPTIONS, task.status)}
                    </Badge>
                    <Badge variant={TASK_PRIORITY_BADGE_VARIANTS[task.priority]}>
                      {getOptionLabel(TASK_PRIORITY_OPTIONS, task.priority)}
                    </Badge>
                  </div>

                  {task.description && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>Assignee: {getAssigneeLabel(task)}</span>
                    <span>Due: {formatDate(task.dueDate ?? undefined)}</span>
                    <span>
                      Estimate:{' '}
                      {task.estimatedHours === null || task.estimatedHours === undefined
                        ? 'Not set'
                        : `${task.estimatedHours}h`}
                    </span>
                  </div>
                </div>

                {(canUpdateStatus || canManageTasks) && (
                  <div className="flex shrink-0 items-center gap-2">
                    {canUpdateStatus && (
                      <div className="w-44">
                        <TaskStatusSelect
                          task={task}
                          canUpdateStatus={canUpdateStatus}
                        />
                      </div>
                    )}
                    {canManageTasks && <TaskDeleteButton task={task} />}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
