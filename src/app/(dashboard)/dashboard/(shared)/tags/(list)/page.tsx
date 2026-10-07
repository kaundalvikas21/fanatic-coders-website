import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { DataTableSkeleton } from '@/components/shared/skeleton/DataTableSkeleton';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { TagsTableLoader } from '@/modules/tags';
import { parseTagsSearchParams, type TagsSearchParams } from '@/modules/tags/config/search-params';

export const metadata = { title: 'Tags | fanaticCoders' };
export const dynamic = 'force-dynamic';

export default async function TagsPage({
  searchParams,
}: {
  searchParams: Promise<TagsSearchParams>;
}) {
  const access = await getCurrentAccess();
  if (!access?.can('blog', 'read')) redirect('/unauthorized');

  const filters = parseTagsSearchParams(await searchParams);
  return (
    <Suspense
      key={JSON.stringify(filters)}
      fallback={
        <DataTableSkeleton
          rows={10}
          cols={4}
          showPagination
          tableClassName="min-w-[700px]"
        />
      }
    >
      <TagsTableLoader filters={filters} />
    </Suspense>
  );
}
