import { Ban, CircleCheckBig, CircleDashed, Inbox } from 'lucide-react';

import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
import type { ServiceRequest, ServiceRequestStatus } from '@/types';

type ServiceRequestStatusStatsProps = {
  requests: ServiceRequest[];
};

const initialCounts: Record<ServiceRequestStatus, number> = {
  NEW: 0,
  IN_PROGRESS: 0,
  COMPLETED: 0,
  CANCELLED: 0,
};

export function ServiceRequestStatusStats({ requests }: ServiceRequestStatusStatsProps) {
  const counts = requests.reduce<Record<ServiceRequestStatus, number>>(
    (result, request) => ({ ...result, [request.status]: result[request.status] + 1 }),
    initialCounts,
  );
  const stats: OverviewStat[] = [
    {
      label: 'New',
      value: counts.NEW,
      supportingText: 'Requests waiting for review',
      icon: Inbox,
      tone: 'blue',
    },
    {
      label: 'In progress',
      value: counts.IN_PROGRESS,
      supportingText: 'Requests being worked on',
      icon: CircleDashed,
      tone: 'amber',
    },
    {
      label: 'Completed',
      value: counts.COMPLETED,
      supportingText: `${requests.length} total ${requests.length === 1 ? 'request' : 'requests'}`,
      icon: CircleCheckBig,
      tone: 'emerald',
    },
    {
      label: 'Cancelled',
      value: counts.CANCELLED,
      supportingText: 'Requests no longer active',
      icon: Ban,
      tone: 'violet',
    },
  ];

  return <OverviewStatsCard stats={stats} />;
}
