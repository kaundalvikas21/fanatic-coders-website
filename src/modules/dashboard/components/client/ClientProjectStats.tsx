import { Activity, BriefcaseBusiness, ClipboardCheck, FolderKanban } from 'lucide-react';

import { OverviewStatsCard } from '@/components/dashboard/OverviewStatsCard';
import { Progress } from '@/components/ui/progress';
import type { ProjectDeliverySummary } from '@/modules/projects/utils/progress';
import { getDeliveryOverview } from '@/modules/projects/utils/progress';

type ClientProjectStatsProps = {
  summaries: ProjectDeliverySummary[];
};

export function ClientProjectStats({ summaries }: ClientProjectStatsProps) {
  const { projects, totalTasks, activeProjects, completedTasks, openTasks, completionRate } =
    getDeliveryOverview(summaries);
  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      supportingText: 'Total delivery workspaces',
      icon: FolderKanban,
      tone: 'blue' as const,
    },
    {
      label: 'Active projects',
      value: activeProjects,
      supportingText: 'Currently in delivery',
      icon: BriefcaseBusiness,
      tone: 'violet' as const,
    },
    {
      label: 'Open tasks',
      value: openTasks,
      supportingText: 'Still moving through delivery',
      icon: Activity,
      tone: 'amber' as const,
    },
    {
      label: 'Completed',
      value: completedTasks,
      supportingText: `${completionRate}% overall completion`,
      icon: ClipboardCheck,
      tone: 'emerald' as const,
    },
  ];

  return (
    <div className="grid gap-5">
      <OverviewStatsCard stats={stats} />

      <div className="rounded-lg border border-border/80 bg-muted/25 px-4 py-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div>
            <p className="font-medium">Overall delivery</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {totalTasks === 0
                ? 'Task progress will appear when delivery begins.'
                : `${completedTasks} of ${totalTasks} tasks completed`}
            </p>
          </div>
          <span className="font-semibold tabular-nums">{completionRate}%</span>
        </div>
        <Progress
          value={completionRate}
          aria-label={`Overall delivery is ${completionRate}% complete`}
          className="mt-3 h-2"
        />
      </div>
    </div>
  );
}
