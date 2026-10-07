import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { DataTableSkeleton } from '@/components/shared/skeleton/DataTableSkeleton';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { CategoriesTableLoader } from '@/modules/categories';
import {
  parseCategoriesSearchParams,
  type CategoriesSearchParams,
} from '@/modules/categories/config/search-params';

export const metadata = { title: 'Categories | fanaticCoders' };
export const dynamic = 'force-dynamic';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<CategoriesSearchParams>;
}) {
  const access = await getCurrentAccess();
  if (!access?.can('blog', 'read')) redirect('/unauthorized');

  const filters = parseCategoriesSearchParams(await searchParams);
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
      <CategoriesTableLoader filters={filters} />
    </Suspense>
  );
}
