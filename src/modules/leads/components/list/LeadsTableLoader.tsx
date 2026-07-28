import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import type { GetLeadsInput, PaginatedLeads } from '@/types';
import { getLeads } from '../../data/queries';
import { DataTable } from '@/components/ui/data-table';
import { leadColumns } from './lead-columns';
import { Pagination } from '@/components/shared/Pagination';

export async function LeadsTableLoader({ filters }: { filters: GetLeadsInput }) {
  const response = await getLeads(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load leads"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedLeads;

  if (data.pagination.totalItems === 0) {
    const hasFilters = Boolean(filters.email || filters.status || filters.serviceType);

    return (
      <EmptyState
        entity="leads"
        description={
          hasFilters
            ? 'No leads match the selected filters.'
            : 'Contact form submissions will appear here.'
        }
      />
    );
  }

  return (
    <>
      <DataTable
        columns={leadColumns}
        data={data.items}
        tableClassName="min-w-[920px]"
      />

      <Pagination
        pagination={data.pagination}
        itemLabel={data.pagination.totalItems === 1 ? 'lead' : 'leads'}
      />
    </>
  );
}
