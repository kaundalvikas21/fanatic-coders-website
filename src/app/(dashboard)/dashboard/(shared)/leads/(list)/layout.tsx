import type { ReactNode } from 'react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { LeadsFilters } from '@/modules/leads';

export default function LeadsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Leads"
          description="Review contact requests and track follow-up."
          showBackButton
        />
      }
    >
      <FilterLayout filters={<LeadsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
