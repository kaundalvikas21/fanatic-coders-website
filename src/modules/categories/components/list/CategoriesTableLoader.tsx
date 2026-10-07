import { FolderOpen } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetCategoriesInput, PaginatedCategories } from '@/types';
import { getCategories } from '../../data/queries';
import { categoryColumns } from './category-columns';

export async function CategoriesTableLoader({ filters }: { filters: GetCategoriesInput }) {
  const response = await getCategories(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load categories"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedCategories | null | undefined;
  const categories = data?.items ?? [];

  if (!categories.length) {
    return (
      <EmptyState
        entity="categories"
        description="Categories you create will appear here."
        Icon={FolderOpen}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        key={`${data?.pagination?.page ?? 1}:${categories.map((category) => category.id).join(',')}`}
        columns={categoryColumns}
        data={categories}
        pageSize={categories.length}
        tableClassName="min-w-[700px]"
      />
      {data?.pagination && (
        <Pagination
          pagination={data.pagination}
          itemLabel={data.pagination.totalItems === 1 ? 'category' : 'categories'}
        />
      )}
    </div>
  );
}
