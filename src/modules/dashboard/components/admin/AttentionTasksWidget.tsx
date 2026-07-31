import { OverviewListCard } from '@/components/dashboard/OverviewListCard';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminDashboardAttentionTasks } from '@/modules/dashboard/data/queries';
import { formatDate } from '@/utils/date';

export async function AttentionTasksWidget() {
  const response = await getAdminDashboardAttentionTasks();
  const tasks = response.success ? response.data : [];
  const items = tasks.map((task) => ({
    id: task.id,
    href: `/dashboard/projects/${task.projectId}`,
    label: task.title,
    supportingText: task.project?.name ?? 'Project task',
    meta: task.dueDate ? formatDate(task.dueDate) : 'Urgent',
  }));

  return response.success ? (
    <OverviewListCard
      title="Needs attention"
      description="Urgent or overdue delivery tasks."
      emptyMessage="No urgent or overdue tasks."
      items={items}
    />
  ) : (
    <ErrorState
      title="Could not load attention tasks"
      message={response.message}
    />
  );
}
