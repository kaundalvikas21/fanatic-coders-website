import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectListLoader } from '@/modules/projects';
import {
  parseProjectsSearchParams,
  type ProjectsSearchParams,
} from '@/modules/projects/config/search-params';

export const metadata = {
  title: 'Projects | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type ProjectsPageProps = {
  searchParams: Promise<ProjectsSearchParams>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const filters = parseProjectsSearchParams(await searchParams);
  const suspenseKey = JSON.stringify(filters);

  return (
    <Suspense
      key={suspenseKey}
      fallback={
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-28 rounded-xl"
            />
          ))}
        </div>
      }
    >
      <ProjectListLoader filters={filters} />
    </Suspense>
  );
}
