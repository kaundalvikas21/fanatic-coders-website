import { CircleCheckBig, CircleDashed, ListTodo, ScanSearch } from 'lucide-react';

import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
import type { Task, TaskStatus } from '@/types';

type ProjectTaskStatsProps = {
  tasks: Task[];
};

const initialCounts: Record<TaskStatus, number> = {
  TODO: 0,
  IN_PROGRESS: 0,
  IN_REVIEW: 0,
  DONE: 0,
};

export function ProjectTaskStats({ tasks }: ProjectTaskStatsProps) {
  const counts = tasks.reduce<Record<TaskStatus, number>>(
    (result, task) => ({ ...result, [task.status]: result[task.status] + 1 }),
    initialCounts,
  );
  const stats: OverviewStat[] = [
    {
      label: 'To do',
      value: counts.TODO,
      supportingText: 'Tasks waiting to start',
      icon: ListTodo,
      tone: 'blue',
    },
    {
      label: 'In progress',
      value: counts.IN_PROGRESS,
      supportingText: 'Tasks being worked on',
      icon: CircleDashed,
      tone: 'amber',
    },
    {
      label: 'In review',
      value: counts.IN_REVIEW,
      supportingText: 'Tasks waiting for review',
      icon: ScanSearch,
      tone: 'violet',
    },
    {
      label: 'Done',
      value: counts.DONE,
      supportingText: `${tasks.length} total ${tasks.length === 1 ? 'task' : 'tasks'}`,
      icon: CircleCheckBig,
      tone: 'emerald',
    },
  ];

  return <OverviewStatsCard stats={stats} />;
}
