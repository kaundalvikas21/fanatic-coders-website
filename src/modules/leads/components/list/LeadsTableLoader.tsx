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

  const data = response.data as PaginatedLeads | null | undefined;
  const leads = data?.items ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? leads.length;

  if (totalItems === 0) {
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
        data={leads}
        tableClassName="min-w-[920px]"
      />

      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={totalItems === 1 ? 'lead' : 'leads'}
        />
      )}
    </>
  );
}
