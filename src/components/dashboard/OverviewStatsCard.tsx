import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const statToneClasses = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
} as const;

export type OverviewStat = {
  label: string;
  value: number;
  supportingText: string;
  icon: LucideIcon;
  tone?: keyof typeof statToneClasses;
};

type OverviewStatsCardProps = {
  stats: OverviewStat[];
  className?: string;
};

export function OverviewStatsCard({ stats, className }: OverviewStatsCardProps) {
  return (
    <dl className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const tone = stat.tone ?? 'blue';

        return (
          <Card
            key={stat.label}
            size="sm"
            className="min-h-32 transition-colors duration-200 hover:bg-muted/20 motion-reduce:transition-none"
          >
            <CardContent className="flex h-full items-start justify-between gap-5">
              <div className="flex min-w-0 flex-1 flex-col">
                <dt className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <p className="mt-auto pt-2 text-xs text-muted-foreground">{stat.supportingText}</p>
              </div>
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-lg',
                  statToneClasses[tone],
                )}
              >
                <Icon
                  className="size-5"
                  aria-hidden="true"
                />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </dl>
  );
}
