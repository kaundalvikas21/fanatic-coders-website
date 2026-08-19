import { Inbox } from 'lucide-react';
import { OverviewListCard } from '@/components/dashboard/OverviewListCard';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminDashboardRecentLeads } from '@/modules/dashboard/data/queries';
import { formatDate } from '@/utils/date';

export async function RecentLeadsWidget() {
  const response = await getAdminDashboardRecentLeads();
  const leads = response.success ? response.data : [];
  const items = leads.map((lead) => ({
    id: lead.id,
    href: `/dashboard/leads/${lead.id}`,
    label: lead.name,
    supportingText: lead.companyName || lead.email,
    meta: formatDate(lead.createdAt),
  }));

  return response.success ? (
    <OverviewListCard
      icon={Inbox}
      title="Recent leads"
      description="Latest contact requests entering the pipeline."
      emptyMessage="No leads captured yet."
      items={items}
    />
  ) : (
    <ErrorState
      title="Could not load recent leads"
      message={response.message}
    />
  );
}
