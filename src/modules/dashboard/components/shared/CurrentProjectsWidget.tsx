import {
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CirclePause,
} from 'lucide-react';

import { ProjectProgressChart } from '@/components/dashboard/charts/ProjectProgressChart';
import { ErrorState } from '@/components/shared/error-state';
import { WidgetCard } from '@/components/shared/widget-card';
import { cn } from '@/lib/utils';
import { getDashboardCurrentProjects } from '@/modules/dashboard/data/queries';

const insightToneClasses = {
  emerald: {
    box: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  amber: {
    box: 'hover:border-amber-500/30 hover:bg-amber-500/5',
    icon: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  violet: {
    box: 'hover:border-violet-500/30 hover:bg-violet-500/5',
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
  blue: {
    box: 'hover:border-blue-500/30 hover:bg-blue-500/5',
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
} as const;

export async function ProjectInsightsWidget() {
  const response = await getDashboardCurrentProjects();

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load project progress"
        message={response.message}
      />
    );
  }

  const data = response.data.projects.map((project) => ({
    project: project.name,
    progress: project.progressPercent,
  }));
  const { stats } = response.data;
  const projectStats = [
    {
      label: 'Active projects',
      value: stats.active,
      supportingText: 'Delivery in progress',
      icon: BriefcaseBusiness,
      tone: 'emerald' as const,
    },
    {
      label: 'On hold',
      value: stats.onHold,
      supportingText: 'Waiting to resume',
      icon: CirclePause,
      tone: 'amber' as const,
    },
    {
      label: 'Average progress',
      value: `${stats.averageProgress}%`,
      supportingText: 'Across current projects',
      icon: ChartNoAxesColumnIncreasing,
      tone: 'violet' as const,
    },
    {
      label: 'Due this month',
      value: stats.dueThisMonth,
      supportingText: 'Project due dates',
      icon: CalendarDays,
      tone: 'blue' as const,
    },
  ];

  return (
    <WidgetCard
      icon={ChartNoAxesColumnIncreasing}
      title="Project insights"
      description="Delivery status and task completion across current projects."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:items-stretch">
        <dl className="grid grid-cols-2 gap-3">
          {projectStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={cn(
                  'group/insight flex min-h-32 min-w-0 flex-col justify-between gap-5 rounded-lg border border-border/70 bg-muted/15 p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none',
                  insightToneClasses[stat.tone].box,
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex min-w-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span
                      className={cn(
                        'size-1.5 shrink-0 rounded-full',
                        insightToneClasses[stat.tone].dot,
                      )}
                    />
                    <span className="truncate">{stat.label}</span>
                  </dt>
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover/insight:scale-105 motion-reduce:transform-none motion-reduce:transition-none',
                      insightToneClasses[stat.tone].icon,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                </div>
                <div>
                  <dd className="font-mono text-2xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.supportingText}</p>
                </div>
              </div>
            );
          })}
        </dl>

        <div className="min-w-0 border-t border-border/70 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <div className="mb-3">
            <h3 className="text-sm font-medium">Project progress</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Completed tasks as a percentage of total tasks.
            </p>
          </div>
          <ProjectProgressChart data={data} />
        </div>
      </div>
    </WidgetCard>
  );
}
