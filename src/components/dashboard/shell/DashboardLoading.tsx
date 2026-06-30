import { Loader2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

export function DashboardLoading() {
  return (
    <main className="dashboard-shell__loading">
      <div className="dashboard-shell__loading-card">
        <Loader2 className="dashboard-shell__loading-icon animate-spin" />
        <span>Checking session</span>
        <Skeleton className="h-2 w-16" />
      </div>
    </main>
  );
}
