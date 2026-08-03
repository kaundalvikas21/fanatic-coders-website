import { Suspense } from 'react';
import {
  AttentionTasksWidget,
  ChartWidgetSkeleton,
  LeadPipelineWidget,
  ListWidgetSkeleton,
  RecentLeadsWidget,
  StatsWidgetSkeleton,
  TaskFlowWidget,
  WorkspaceStatsWidget,
} from '@/modules/dashboard';
import { PageHeader } from '@/components/shared/page-header';

export const metadata = {
  title: 'Admin | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Establish page context using the shared dashboard header. */}
      <PageHeader
        title="Admin workspace"
        description="Manage workspace access, roles, and lead review from one place."
      />

      {/* Present independent workspace totals before the analytical distributions. */}
      <Suspense fallback={<StatsWidgetSkeleton />}>
        <WorkspaceStatsWidget />
      </Suspense>

      {/* Compare lead pipeline and task delivery flow side by side. */}
      <section
        aria-label="Workspace analytics"
        className="grid items-stretch gap-4 lg:grid-cols-2"
      >
        <Suspense fallback={<ChartWidgetSkeleton />}>
          <LeadPipelineWidget />
        </Suspense>
        <Suspense fallback={<ChartWidgetSkeleton />}>
          <TaskFlowWidget />
        </Suspense>
      </section>

      {/* Prioritize work needing action alongside the newest pipeline activity. */}
      <section className="grid gap-4 xl:grid-cols-2">
        <Suspense fallback={<ListWidgetSkeleton />}>
          <AttentionTasksWidget />
        </Suspense>
        <Suspense fallback={<ListWidgetSkeleton />}>
          <RecentLeadsWidget />
        </Suspense>
      </section>
    </div>
  );
}
