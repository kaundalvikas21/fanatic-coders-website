import { BadgeCheck, CircleX, PhoneCall, UserPlus } from 'lucide-react';

import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
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
