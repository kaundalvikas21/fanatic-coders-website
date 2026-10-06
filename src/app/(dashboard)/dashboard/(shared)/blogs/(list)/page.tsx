import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { DataTableSkeleton } from '@/components/shared/skeleton/DataTableSkeleton';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { BlogsTableLoader } from '@/modules/blogs';
import {
  parseBlogsSearchParams,
  type BlogsSearchParams,
} from '@/modules/blogs/config/search-params';

export const metadata = {
  title: 'Blogs | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type BlogsPageProps = {
  searchParams: Promise<BlogsSearchParams>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const access = await getCurrentAccess();

  if (!access?.can('blog', 'read')) {
    redirect('/unauthorized');
  }

  const filters = parseBlogsSearchParams(await searchParams);

  return (
    <Suspense
      key={JSON.stringify(filters)}
      fallback={
        <DataTableSkeleton
          rows={10}
          cols={6}
          showPagination
          tableClassName="min-w-[1100px]"
        />
      }
    >
      <BlogsTableLoader filters={filters} />
    </Suspense>
  );
}
