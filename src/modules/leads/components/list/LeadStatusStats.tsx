import { BadgeCheck, CircleX, PhoneCall, UserPlus } from 'lucide-react';

import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminDashboardLeadDistribution } from '@/modules/dashboard/data/queries';
import type { AdminDashboardLeadDistribution } from '@/types';

type LeadStatusStatsProps = {
  distribution: AdminDashboardLeadDistribution;
};

export function LeadStatusStats({ distribution }: LeadStatusStatsProps) {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  const stats: OverviewStat[] = [
    {
      label: 'New',
      value: distribution.NEW,
      supportingText: 'Leads waiting for review',
      icon: UserPlus,
      tone: 'blue',
    },
    {
      label: 'Qualified',
      value: distribution.QUALIFIED,
      supportingText: 'Leads ready for follow-up',
      icon: BadgeCheck,
      tone: 'emerald',
    },
    {
      label: 'In progress',
      value: distribution.IN_PROGRESS,
      supportingText: 'Leads being followed up',
      icon: PhoneCall,
      tone: 'amber',
    },
    {
      label: 'Closed',
      value: distribution.DEAD,
      supportingText: `${total} total ${total === 1 ? 'lead' : 'leads'}`,
      icon: CircleX,
      tone: 'violet',
    },
  ];

  return <OverviewStatsCard stats={stats} />;
}

export async function LeadStatusStatsLoader() {
  const response = await getAdminDashboardLeadDistribution();

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load lead totals"
        message={response.message}
      />
    );
  }

  return <LeadStatusStats distribution={response.data} />;
}
