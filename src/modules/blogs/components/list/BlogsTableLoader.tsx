import { FileText } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetBlogsInput, PaginatedBlogs } from '@/types';
import { getBlogs } from '../../data/queries';
import { blogColumns } from './blog-columns';

export async function BlogsTableLoader({ filters }: { filters: GetBlogsInput }) {
  const response = await getBlogs(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load blogs"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedBlogs | null | undefined;
  const blogs = data?.items ?? [];
  const pagination = data?.pagination;

  if (!blogs.length) {
    return (
      <EmptyState
        entity="blogs"
        description={
          filters.isPublished === undefined
            ? 'Blogs you create will appear here.'
            : 'No blogs match this status.'
        }
        Icon={FileText}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={blogColumns}
        data={blogs}
        pageSize={blogs.length}
        tableClassName="min-w-[1100px]"
      />
      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={pagination.totalItems === 1 ? 'blog' : 'blogs'}
        />
      )}
    </div>
  );
}
