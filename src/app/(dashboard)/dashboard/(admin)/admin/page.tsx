import { Suspense } from 'react';
import Link from 'next/link';
import { BriefcaseBusiness, Inbox } from 'lucide-react';
import {
  AttentionTasksWidget,
  ChartWidgetSkeleton,
  LeadPipelineWidget,
  ListWidgetSkeleton,
  ProjectInsightsSkeleton,
  ProjectInsightsWidget,
  RecentLeadsWidget,
  StatsWidgetSkeleton,
  TaskFlowWidget,
  WorkspaceStatsWidget,
  DashboardOverviewHeader,
} from '@/modules/dashboard';
import { Button } from '@/components/ui/button';
import { formatCurrentDate } from '@/utils/date';

export const metadata = {
  title: 'Admin | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const today = formatCurrentDate();

  return (
    <div className="space-y-8">
      <DashboardOverviewHeader
        title="Operations overview"
        description="Monitor delivery health, incoming opportunities, and work that needs attention."
        statusLabel="Workspace live"
        meta={today}
        actions={
          <>
            <Button
              asChild
              variant="outline"
            >
              <Link href="/dashboard/leads">
                <Inbox data-icon="inline-start" />
                View leads
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/projects">
                <BriefcaseBusiness data-icon="inline-start" />
                Projects
              </Link>
            </Button>
          </>
        }
      />

      <Suspense fallback={<StatsWidgetSkeleton />}>
        <WorkspaceStatsWidget />
      </Suspense>

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

      <Suspense fallback={<ProjectInsightsSkeleton />}>
        <ProjectInsightsWidget />
      </Suspense>

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
