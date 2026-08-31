import { CalendarDays, Clock3, FileText, ListChecks, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/types';
import {
  TASK_PRIORITY_BADGE_VARIANTS,
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_BADGE_VARIANTS,
  TASK_STATUS_COLORS,
  TASK_STATUS_OPTIONS,
} from '@/types';
import { TaskDetailTabPanel } from './TaskDetailTabPanel';
import type { TaskDetailTab } from './types';
import { formatDate } from '@/utils/date';

function getAssigneeSummary(task: Task) {
  const assignees = task.assignees ?? [];

  if (assignees.length === 0) return 'Unassigned';
  if (assignees.length === 1) {
    return assignees[0]?.member.user.name || assignees[0]?.member.user.email || 'Assigned';
  }

  return `${assignees.length} people`;
}

export function TaskOverviewTab({ task, activeTab }: { task: Task; activeTab: TaskDetailTab }) {
  const status = TASK_STATUS_OPTIONS.find((option) => option.value === task.status)?.label;
  const priority = TASK_PRIORITY_OPTIONS.find((option) => option.value === task.priority)?.label;

  return (
    <TaskDetailTabPanel
      value="overview"
      activeTab={activeTab}
      icon={FileText}
      title="Overview"
      description="Task scope, ownership, and delivery details."
      actionSlot={
        <div className="flex flex-wrap justify-end gap-2">
          <Badge
            variant={TASK_STATUS_BADGE_VARIANTS[task.status]}
            color={TASK_STATUS_COLORS[task.status]}
          >
            {status ?? task.status}
          </Badge>
          <Badge
            variant={TASK_PRIORITY_BADGE_VARIANTS[task.priority]}
            color={TASK_PRIORITY_COLORS[task.priority]}
          >
            {priority ?? task.priority} priority
          </Badge>
        </div>
      }
    >
      <div className="space-y-5">
        <p className="max-w-[75ch] whitespace-pre-wrap break-words text-sm leading-6 text-foreground">
          {task.description?.trim() || 'No description has been added to this task.'}
        </p>

        <dl className="grid gap-x-6 gap-y-4 border-t border-border/70 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <Users
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">Assignees</dt>
              <dd className="truncate text-sm font-medium">{getAssigneeSummary(task)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CalendarDays
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs text-muted-foreground">Due date</dt>
              <dd className="text-sm font-medium">
                {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock3
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs text-muted-foreground">Estimate</dt>
              <dd className="text-sm font-medium">
                {task.estimatedHours !== null && task.estimatedHours !== undefined
                  ? `${task.estimatedHours}h`
                  : 'Not set'}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ListChecks
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs text-muted-foreground">Checklist</dt>
              <dd className="text-sm font-medium">
                {(task.addOnTasks ?? []).filter((item) => item.isCompleted).length}/
                {(task.addOnTasks ?? []).length} complete
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </TaskDetailTabPanel>
  );
}
