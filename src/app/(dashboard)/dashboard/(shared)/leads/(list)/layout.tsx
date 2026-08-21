import { Suspense, type ReactNode } from 'react';
import { OverviewStatsSkeleton } from '@/components/dashboard/OverviewStatsCard';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { LeadsFilters, LeadStatusStatsLoader } from '@/modules/leads';

export default function LeadsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Leads"
          description="Review contact requests and track follow-up."
        />
      }
    >
      <Suspense fallback={<OverviewStatsSkeleton />}>
        <LeadStatusStatsLoader />
      </Suspense>
      <FilterLayout filters={<LeadsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
