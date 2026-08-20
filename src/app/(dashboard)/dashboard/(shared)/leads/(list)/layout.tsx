import type { ReactNode } from 'react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { LeadsFilters, LeadStatusStats } from '@/modules/leads';
import { getAdminDashboardLeadDistribution } from '@/modules/dashboard/data/queries';

export default async function LeadsLayout({ children }: { children: ReactNode }) {
  const response = await getAdminDashboardLeadDistribution();

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Leads"
          description="Review contact requests and track follow-up."
        />
      }
    >
      {response.success ? (
        <LeadStatusStats distribution={response.data} />
      ) : (
        <ErrorState
          title="Could not load lead totals"
          message={response.message}
        />
      )}
      <FilterLayout filters={<LeadsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
