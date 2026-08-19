import type { ReactNode } from 'react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectsFilters } from '@/modules/projects';

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
      <FilterLayout filters={<ProjectsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
