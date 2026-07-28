import type { ReactNode } from 'react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectsFilters } from '@/modules/projects';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Projects"
          description="Track delivery workspaces created from service requests."
          showBackButton
        />
      }
    >
      <ProjectsFilters />
      {children}
    </ListsLayout>
  );
}
