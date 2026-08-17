import { Suspense } from 'react';
import Link from 'next/link';
import { BriefcaseBusiness, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DashboardOverviewHeader,
  ProjectInsightsSkeleton,
  ProjectInsightsWidget,
} from '@/modules/dashboard';

export const metadata = {
  title: 'Client Dashboard | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardOverviewHeader
        title="Your delivery workspace"
        description="Follow project progress, completed work, and the next delivery steps."
        statusLabel="Workspace ready"
        actions={
          <>
            <Button
              asChild
              variant="outline"
            >
              <Link href="/dashboard/projects">
                <BriefcaseBusiness data-icon="inline-start" />
                Projects
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/services/new">
                <ClipboardList data-icon="inline-start" />
                New request
              </Link>
            </Button>
          </>
        }
      />

      <Suspense fallback={<ProjectInsightsSkeleton />}>
        <ProjectInsightsWidget />
      </Suspense>
    </div>
  );
}
