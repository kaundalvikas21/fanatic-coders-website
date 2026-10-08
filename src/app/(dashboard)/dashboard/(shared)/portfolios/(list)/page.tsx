import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { DataTableSkeleton } from '@/components/shared/skeleton/DataTableSkeleton';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { PortfoliosListLoader } from '@/modules/portfolios/components/list/PortfoliosListLoader';
import {
  parsePortfoliosSearchParams,
  type PortfoliosSearchParams,
} from '@/modules/portfolios/config/search-params';

export const metadata = { title: 'Portfolio | fanaticCoders' };
export const dynamic = 'force-dynamic';

type PortfoliosPageProps = {
  searchParams: Promise<PortfoliosSearchParams>;
};

export default async function PortfoliosPage({ searchParams }: PortfoliosPageProps) {
  const access = await getCurrentAccess();
  if (!access?.can('portfolio', 'read')) redirect('/unauthorized');

  const filters = parsePortfoliosSearchParams(await searchParams);

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
      <PortfoliosListLoader filters={filters} />
    </Suspense>
  );
}
