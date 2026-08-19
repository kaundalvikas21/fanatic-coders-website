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
      titleClassName="text-xl font-semibold"
    >
      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tabular-nums">{progressPercent}%</span>
              <span className="text-sm text-muted-foreground">complete</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {tasks.length === 0
                ? 'Progress begins when the first task is added.'
                : `${completedTasks} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} completed`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Project status</span>
            <Badge
              variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}
              color={PROJECT_STATUS_COLORS[project.status]}
            >
              {PROJECT_STATUS_LABELS[project.status]}
            </Badge>
          </div>
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
