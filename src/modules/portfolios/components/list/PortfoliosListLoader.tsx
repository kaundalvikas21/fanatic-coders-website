import { Images } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetPortfoliosInput, PaginatedPortfolios } from '@/types';
import { getPortfolios } from '../../data/queries';
import { portfolioColumns } from './portfolio-columns';

export async function PortfoliosListLoader({ filters }: { filters: GetPortfoliosInput }) {
  const response = await getPortfolios(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load portfolios"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedPortfolios | null | undefined;
  const portfolios = data?.items ?? [];
  const pagination = data?.pagination;

  if (!portfolios.length) {
    return (
      <EmptyState
        entity="portfolios"
        description={
          filters.isPublished === undefined && !filters.title
            ? 'Portfolio projects will appear here.'
            : 'No portfolios match your filters.'
        }
        Icon={Images}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={portfolioColumns}
        data={portfolios}
        pageSize={portfolios.length}
        tableClassName="min-w-[1100px]"
      />
      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={pagination.totalItems === 1 ? 'portfolio' : 'portfolios'}
        />
      )}
    </div>
  );
}
