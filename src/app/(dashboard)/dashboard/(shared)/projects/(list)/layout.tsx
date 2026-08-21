import { Suspense, type ReactNode } from 'react';
import { OverviewStatsSkeleton } from '@/components/dashboard/OverviewStatsCard';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectsFilters, ProjectTaskStatsLoader } from '@/modules/projects';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Projects"
          description="Track delivery workspaces created from service requests."
        />
      }
    >
      <Suspense fallback={<OverviewStatsSkeleton />}>
        <ProjectTaskStatsLoader />
      </Suspense>
      <FilterLayout filters={<ProjectsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
