import { Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WidgetCard } from '@/components/shared/widget-card';
import { PROJECT_STATUS_BADGE_VARIANTS, PROJECT_STATUS_COLORS } from '@/types';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import type { Project, Task } from '@/types';

type ProjectProgressCardProps = {
  project: Project;
  tasks: Task[];
};

export function ProjectProgressCard({ project, tasks }: ProjectProgressCardProps) {
  const completedTasks = tasks.filter((task) => task.status === 'DONE').length;
  const progressPercent =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <WidgetCard
      icon={Activity}
      title="Project progress"
      description="Completion based on delivery tasks."
      actionSlot={
        <Badge
          variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}
          color={PROJECT_STATUS_COLORS[project.status]}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
      }
    >
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div>
            <p className="font-medium text-foreground">
              {tasks.length === 0
                ? 'No delivery tasks yet'
                : `${completedTasks} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} complete`}
            </p>
            <p className="mt-0.5 text-muted-foreground">
              {tasks.length === 0
                ? 'Progress begins when the first task is added.'
                : 'Calculated from completed delivery tasks.'}
            </p>
          </div>
          <span className="shrink-0 font-mono font-semibold tabular-nums text-foreground">
            {progressPercent}%
          </span>
        </div>

        <Progress
          value={progressPercent}
          aria-label={`Project is ${progressPercent}% complete`}
          className="h-2.5"
        />
      </div>
    </WidgetCard>
  );
}
