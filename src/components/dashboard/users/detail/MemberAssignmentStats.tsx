import type { TaskStats } from '@/types';

type MemberAssignmentStatsProps = {
  stats: TaskStats | null;
};

export function MemberAssignmentStats({ stats }: MemberAssignmentStatsProps) {
  const items = stats
    ? [
        { label: 'Assigned', value: stats.total },
        { label: 'Completed', value: stats.completed },
        { label: 'Overdue', value: stats.overdue },
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
      className="grid grid-cols-3 divide-x divide-border/60 border-y border-border/60 py-4"
      aria-label="Member task summary"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-0 flex-col-reverse items-center gap-1 px-2 text-center"
        >
          <dt className="truncate text-xs text-muted-foreground">{item.label}</dt>
          <dd
            className={
              item.label === 'Overdue'
                ? 'text-xl font-semibold text-destructive tabular-nums'
                : 'text-xl font-semibold tabular-nums'
            }
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
