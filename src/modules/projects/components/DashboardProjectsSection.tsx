import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  parseProjectsSearchParams,
  type ProjectsSearchParams,
} from '@/modules/projects/config/search-params';
import { FilteredProjectsLoader } from './FilteredProjectsLoader';
import { ProjectsFilters } from './ProjectsFilters';

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
    <section
      className="space-y-4"
      aria-labelledby="filtered-projects-title"
    >
      <header>
        <h2
          id="filtered-projects-title"
          className="text-lg font-semibold tracking-[-0.01em]"
        >
          Projects
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Filter projects and review status, team, and delivery progress.
        </p>
      </header>

      <ProjectsFilters showServiceFilter={false} />

      <Suspense
        key={JSON.stringify(filters)}
        fallback={<Skeleton className="h-80 rounded-xl" />}
      >
        <FilteredProjectsLoader filters={filters} />
      </Suspense>
    </section>
  );
}
