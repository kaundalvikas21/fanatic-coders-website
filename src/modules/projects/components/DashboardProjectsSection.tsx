import { Suspense } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import { FilterLayout } from '@/components/layout/dashboard/lists-layout';
import { WidgetCard } from '@/components/shared/widget-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  parseProjectsSearchParams,
  type ProjectsSearchParams,
} from '@/modules/projects/config/search-params';
import { FilteredProjectsLoader } from './list/FilteredProjectsLoader';
import { ProjectsFilters } from './list/ProjectsFilters';

export function DashboardProjectsSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-14 rounded-lg" />
      <Skeleton className="h-36 rounded-xl" />
      <Skeleton className="h-80 rounded-xl" />
    </div>
  );
}

export async function DashboardProjectsSection({
  searchParams,
}: {
  searchParams: Promise<ProjectsSearchParams>;
}) {
  const filters = {
    ...parseProjectsSearchParams(await searchParams),
    serviceType: undefined,
  };

  return (
    <WidgetCard
      icon={BriefcaseBusiness}
      title="Projects"
      description="Filter projects and review status, team, and delivery progress."
      contentClassNames="p-0"
    >
      <FilterLayout filters={<ProjectsFilters showServiceFilter={false} />}>
        <Suspense
          key={JSON.stringify(filters)}
          fallback={<Skeleton className="h-80 rounded-xl" />}
        >
          <FilteredProjectsLoader filters={filters} />
        </Suspense>
      </FilterLayout>
    </WidgetCard>
  );
}
