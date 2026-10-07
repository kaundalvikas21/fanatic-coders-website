import { Tags } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetTagsInput, PaginatedTags } from '@/types';
import { getTags } from '../../data/queries';
import { tagColumns } from './tag-columns';

export async function TagsTableLoader({ filters }: { filters: GetTagsInput }) {
  const response = await getTags(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load tags"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedTags | null | undefined;
  const tags = data?.items ?? [];

  if (!tags.length) {
    return (
      <EmptyState
        entity="tags"
        description="Tags you create will appear here."
        Icon={Tags}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        key={`${data?.pagination?.page ?? 1}:${tags.map((tag) => tag.id).join(',')}`}
        columns={tagColumns}
        data={tags}
        pageSize={tags.length}
        tableClassName="min-w-[700px]"
      />
      {data?.pagination && (
        <Pagination
          pagination={data.pagination}
          itemLabel={data.pagination.totalItems === 1 ? 'tag' : 'tags'}
        />
      )}
    </div>
  );
}
