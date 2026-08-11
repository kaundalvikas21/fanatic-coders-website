import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const statToneClasses = {
  blue: {
    card: 'bg-gradient-to-br from-blue-500/10 via-card to-card hover:from-blue-500/15',
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  emerald: {
    card: 'bg-gradient-to-br from-emerald-500/10 via-card to-card hover:from-emerald-500/15',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    card: 'bg-gradient-to-br from-amber-500/10 via-card to-card hover:from-amber-500/15',
    icon: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  },
  violet: {
    card: 'bg-gradient-to-br from-violet-500/10 via-card to-card hover:from-violet-500/15',
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
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
              'min-h-36 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none',
              statToneClasses[tone].card,
            )}
          >
            <CardContent className="flex h-full min-h-30 items-stretch justify-between gap-5">
              <div className="flex min-w-0 flex-1 flex-col justify-between">
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
