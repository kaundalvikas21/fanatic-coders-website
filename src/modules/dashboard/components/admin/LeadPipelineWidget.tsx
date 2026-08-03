import { LeadStatusDonutChart } from '@/components/dashboard/charts/LeadStatusDonutChart';
import { ErrorState } from '@/components/shared/error-state';
import { WidgetCard } from '@/components/shared/widget-card';
import { getAdminDashboardLeadDistribution } from '@/modules/dashboard/data/queries';

export async function LeadPipelineWidget() {
  const response = await getAdminDashboardLeadDistribution();
  const distribution = response.success ? response.data : null;
  const data = [
    {
      status: 'new' as const,
      leads: distribution?.NEW ?? 0,
      fill: 'var(--color-new)',
    },
    {
      status: 'qualified' as const,
      leads: distribution?.QUALIFIED ?? 0,
      fill: 'var(--color-qualified)',
    },
    {
      status: 'inProgress' as const,
      leads: distribution?.IN_PROGRESS ?? 0,
      fill: 'var(--color-inProgress)',
    },
    {
      status: 'closed' as const,
      leads: distribution?.DEAD ?? 0,
      fill: 'var(--color-closed)',
    },
  ];

  return (
    <WidgetCard
      title="Lead pipeline"
      description="Current lead distribution by status."
      className="h-full"
    >
      {response.success ? (
        <LeadStatusDonutChart data={data} />
      ) : (
        <ErrorState
          title="Could not load lead pipeline"
          message={response.message}
        />
      )}
    </WidgetCard>
  );
}
