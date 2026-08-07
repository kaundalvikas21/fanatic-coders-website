import { BriefcaseBusiness, ClipboardList, Inbox, ListChecks } from 'lucide-react';

import { OverviewStatsCard } from '@/components/dashboard/OverviewStatsCard';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminDashboardOverview } from '@/modules/dashboard/data/queries';

export async function WorkspaceStatsWidget() {
  const response = await getAdminDashboardOverview();
  const overview = response.success ? response.data : null;
  const stats = [
    {
      label: 'Projects',
      value: overview?.activeProjects ?? 0,
      supportingText: `${overview?.totalProjects ?? 0} total`,
      icon: BriefcaseBusiness,
      tone: 'blue' as const,
    },
    {
      label: 'Tasks',
      value: overview?.openTasks ?? 0,
      supportingText: `${overview?.completedTasks ?? 0} completed`,
      icon: ListChecks,
      tone: 'emerald' as const,
    },
    {
      label: 'Requests',
      value: overview?.openServiceRequests ?? 0,
      supportingText: `${overview?.totalServiceRequests ?? 0} total`,
      icon: ClipboardList,
      tone: 'amber' as const,
    },
    {
      label: 'Leads',
      value: overview?.totalLeads ?? 0,
      supportingText: `${overview?.newLeads ?? 0} new`,
      icon: Inbox,
      tone: 'violet' as const,
    },
  ];

  return response.success ? (
    <OverviewStatsCard stats={stats} />
  ) : (
    <ErrorState
      title="Could not load workspace totals"
      message={response.message}
    />
  );
}
