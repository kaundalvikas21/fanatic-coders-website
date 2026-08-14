import Link from 'next/link';
import { BriefcaseBusiness, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WidgetCard } from '@/components/shared/widget-card';
import { ClientProjectStats } from '@/modules/dashboard/components/client/ClientProjectStats';
import { DashboardOverviewHeader } from '@/modules/dashboard';
import { ClientProjectCard } from '@/modules/projects/components/ClientProjectCard';
import { getProjectDeliverySummaries } from '@/modules/projects/data/delivery';

export const metadata = {
  title: 'Client Dashboard | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function ClientDashboardPage() {
  const projectSummaries = await getProjectDeliverySummaries();
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

      <WidgetCard
        icon={BriefcaseBusiness}
        title="Delivery overview"
        description="A summary of projects and task completion."
        titleClassName="text-xl"
      >
        <ClientProjectStats summaries={projectSummaries} />
      </WidgetCard>

      {projectSummaries.length === 0 ? (
        <WidgetCard
          icon={ClipboardList}
          title="No projects yet"
          description="Your projects will appear here once delivery begins."
        >
          <Button asChild>
            <Link href="/dashboard/services/new">Start a service request</Link>
          </Button>
        </WidgetCard>
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {projectSummaries.map((summary) => (
            <ClientProjectCard
              key={summary.project.id}
              summary={summary}
            />
          ))}
        </section>
      )}
    </div>
  );
}
