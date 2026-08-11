import { BriefcaseBusiness, ClipboardCheck, ClipboardList } from 'lucide-react';

import { OverviewStatsCard } from '@/components/dashboard/OverviewStatsCard';
import type { Task } from '@/types';

type ClientProjectStatsProps = {
  projectCount: number;
  projectTasks: Task[][];
};

export function ClientProjectStats({ projectCount, projectTasks }: ClientProjectStatsProps) {
  const tasks = projectTasks.flat();
  const completedTasks = tasks.filter((task) => task.status === 'DONE').length;
  const completionRate =
    tasks.length > 0
      ? `${Math.round((completedTasks / tasks.length) * 100)}% completion rate`
      : 'No tasks completed yet';
  const stats = [
    {
      label: 'Active projects',
      value: projectCount,
      supportingText: 'Currently in your workspace',
      icon: BriefcaseBusiness,
      tone: 'blue' as const,
    },
    {
      label: 'Tracked tasks',
      value: tasks.length,
      supportingText: 'Across all active projects',
      icon: ClipboardList,
      tone: 'violet' as const,
    },
    {
      label: 'Completed tasks',
      value: completedTasks,
      supportingText: completionRate,
      icon: ClipboardCheck,
      tone: 'emerald' as const,
    },
  ];

  return (
    <OverviewStatsCard
      stats={stats}
      className="md:grid-cols-3 xl:grid-cols-3"
    />
  );
}
