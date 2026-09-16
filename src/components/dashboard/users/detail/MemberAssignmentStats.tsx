import { CircleCheck, ClockAlert, ListTodo } from 'lucide-react';
import type { TaskStats } from '@/types';

type MemberAssignmentStatsProps = {
  stats: TaskStats | null;
};

export function MemberAssignmentStats({ stats }: MemberAssignmentStatsProps) {
  const items = stats
    ? [
        {
          label: 'Assigned',
          value: stats.total,
          Icon: ListTodo,
          iconClassName: 'bg-primary/10 text-primary',
        },
        {
          label: 'Completed',
          value: stats.completed,
          Icon: CircleCheck,
          iconClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        },
        {
          label: 'Overdue',
          value: stats.overdue,
          Icon: ClockAlert,
          iconClassName: 'bg-destructive/10 text-destructive',
        },
      ]
    : [];

  if (!stats) {
    return (
      <p className="border-y border-border/60 py-4 text-center text-sm text-muted-foreground">
        Assignment statistics are temporarily unavailable.
      </p>
    );
  }

  return (
    <dl
      className="grid grid-cols-3 gap-2"
      aria-label="Member task summary"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-0 flex-col-reverse items-center gap-1 rounded-lg border border-border/70 bg-muted/30 px-1 py-4 text-center"
        >
          <dt className="truncate text-xs text-muted-foreground">{item.label}</dt>
          <dd
            className={
              item.label === 'Overdue'
                ? 'flex flex-col items-center gap-2 text-xl font-semibold text-destructive tabular-nums'
                : 'flex flex-col items-center gap-2 text-xl font-semibold tabular-nums'
            }
          >
            <span
              className={`flex size-8 items-center justify-center rounded-lg ${item.iconClassName}`}
            >
              <item.Icon
                className="size-4"
                aria-hidden="true"
              />
            </span>
            <span>{item.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
