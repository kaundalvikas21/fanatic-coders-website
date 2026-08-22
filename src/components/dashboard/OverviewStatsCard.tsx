import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const statToneClasses = {
  blue: {
    card: 'hover:border-blue-500/30',
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  emerald: {
    card: 'hover:border-emerald-500/30',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  amber: {
    card: 'hover:border-amber-500/30',
    icon: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  violet: {
    card: 'hover:border-violet-500/30',
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
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
            className={cn(
              'min-h-36 border border-border/80 bg-card/80 transition-[border-color,background-color] duration-200 ease-out hover:bg-card motion-reduce:transition-none',
              statToneClasses[tone].card,
            )}
          >
            <CardContent className="flex h-full min-h-30 items-stretch justify-between gap-5">
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <dt className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  <span className={cn('size-1.5 rounded-full', statToneClasses[tone].dot)} />
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <p className="mt-auto pt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">{stat.supportingText}</span>
                </p>
              </div>
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center self-start rounded-lg transition-transform duration-200 ease-out group-hover/card:scale-105 motion-reduce:transform-none motion-reduce:transition-none',
                  statToneClasses[tone].icon,
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

type OverviewStatsSkeletonProps = {
  count?: number;
  className?: string;
};

export function OverviewStatsSkeleton({ count = 4, className }: OverviewStatsSkeletonProps) {
  return (
    <div
      className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <Card
          key={index}
          size="sm"
          className="min-h-36 border border-border/80 bg-card/80"
        >
          <CardContent className="flex min-h-30 justify-between gap-5">
            <div className="flex flex-1 flex-col justify-between gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-14" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="size-11 rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
