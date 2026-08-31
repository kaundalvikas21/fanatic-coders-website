import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
import { TaskCardDetails } from '../kanban/TaskKanbanCard';

export function TaskOverviewTab({ task, activeTab }: { task: Task; activeTab: TaskDetailTab }) {
  const status = TASK_STATUS_OPTIONS.find((option) => option.value === task.status)?.label;
  const priority = TASK_PRIORITY_OPTIONS.find((option) => option.value === task.priority)?.label;

  return (
    <TaskDetailTabPanel
      value="overview"
      activeTab={activeTab}
      icon={FileText}
      title="Task description"
      description="Scope and delivery requirements for this task."
      before={
        <Card size="sm">
          <TaskCardDetails />
        </Card>
      }
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
      <p className="max-w-[75ch] whitespace-pre-wrap text-sm leading-6 text-foreground">
        {task.description?.trim() || 'No description has been added to this task.'}
      </p>
    </TaskDetailTabPanel>
  );
}
