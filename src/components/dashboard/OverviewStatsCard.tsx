import type { LucideIcon } from 'lucide-react';

import { WidgetCard } from '@/components/shared/widget-card';

export type OverviewStat = {
  label: string;
  value: number;
  supportingText: string;
  icon: LucideIcon;
};

type OverviewStatsCardProps = {
  title?: string;
  description?: string;
  stats: OverviewStat[];
  className?: string;
};

export function OverviewStatsCard({
  title,
  description,
  stats,
  className,
}: OverviewStatsCardProps) {
  return (
    <WidgetCard
      title={title}
      description={description}
      className={className}
    >
      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg bg-muted/50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <Icon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
              </div>
              <dd className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</dd>
              <p className="mt-1 text-xs text-muted-foreground">{stat.supportingText}</p>
            </div>
          );
        })}
      </dl>
    </WidgetCard>
  );
}
