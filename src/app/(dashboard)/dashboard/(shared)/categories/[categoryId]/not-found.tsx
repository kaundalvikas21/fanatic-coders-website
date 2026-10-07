import { DashboardNotFound } from '@/components/dashboard/shell/DashboardNotFound';

export default function CategoryNotFound() {
  return (
    <DashboardNotFound
      title="Category not found"
      description="This category is no longer available."
    />
  );
}
