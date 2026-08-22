import type { TaskStatus } from '@/types';

export const TASK_STATUS_STYLES: Record<
  TaskStatus,
  {
    column: string;
    card: string;
    heading: string;
    dot: string;
    count: string;
    drop: string;
  }
> = {
  TODO: {
    column: 'border-violet-200 bg-violet-50/70 dark:border-violet-500/25 dark:bg-violet-500/5',
    card: 'border-violet-200/80 bg-white/80 dark:border-violet-500/20 dark:bg-violet-500/[0.035]',
    heading: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    count: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    drop: 'ring-violet-500',
  },
  IN_PROGRESS: {
    column: 'border-blue-200 bg-blue-50/70 dark:border-blue-500/25 dark:bg-blue-500/5',
    card: 'border-blue-200/80 bg-white/80 dark:border-blue-500/20 dark:bg-blue-500/[0.035]',
    heading: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
    count: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    drop: 'ring-blue-500',
  },
  IN_REVIEW: {
    column: 'border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-500/5',
    card: 'border-amber-200/80 bg-white/80 dark:border-amber-500/25 dark:bg-amber-500/[0.035]',
    heading: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    count: 'border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    drop: 'ring-amber-500',
  },
  DONE: {
    column: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/25 dark:bg-emerald-500/5',
    card: 'border-emerald-200/80 bg-white/80 dark:border-emerald-500/20 dark:bg-emerald-500/[0.035]',
    heading: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    count: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    drop: 'ring-emerald-500',
  },
};
