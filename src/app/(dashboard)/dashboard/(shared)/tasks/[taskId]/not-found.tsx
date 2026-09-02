import { DashboardNotFound } from '@/components/dashboard/shell/DashboardNotFound';

export default function TaskNotFound() {
  return (
    <DashboardNotFound
      title="Task not found"
      description="We could not find this task, or it is not available in your current workspace."
    />
  );
}
