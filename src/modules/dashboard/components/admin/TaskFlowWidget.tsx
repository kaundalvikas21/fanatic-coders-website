import { TaskStatusBarChart } from '@/components/dashboard/charts/TaskStatusBarChart';
import { ErrorState } from '@/components/shared/error-state';
import { WidgetCard } from '@/components/shared/widget-card';
import { getAdminDashboardTaskDistribution } from '@/modules/dashboard/data/queries';

export async function TaskFlowWidget() {
  const response = await getAdminDashboardTaskDistribution();
  const distribution = response.success ? response.data : null;
  const data = [
    {
      status: 'To do',
      tasks: distribution?.TODO ?? 0,
      fill: 'var(--chart-1)',
    },
    {
      status: 'In progress',
      tasks: distribution?.IN_PROGRESS ?? 0,
      fill: 'var(--chart-2)',
    },
    {
      status: 'In review',
      tasks: distribution?.IN_REVIEW ?? 0,
      fill: 'var(--chart-3)',
    },
    {
      status: 'Done',
      tasks: distribution?.DONE ?? 0,
      fill: 'var(--chart-4)',
    },
  ];

  return (
    <WidgetCard
      title="Task flow"
      description="Delivery tasks grouped by current status."
      className="h-full"
    >
      {response.success ? (
        <TaskStatusBarChart data={data} />
      ) : (
        <ErrorState
          title="Could not load task flow"
          message={response.message}
        />
      )}
    </WidgetCard>
  );
}
