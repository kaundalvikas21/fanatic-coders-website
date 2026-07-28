import { Suspense } from 'react';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';
import { LeadsTableLoader } from '@/modules/leads';
import { LeadsSearchParams, parseLeadsSearchParams } from '@/modules/leads/config/search-params';

export const metadata = {
  title: 'Leads | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type LeadsPageProps = {
  searchParams: Promise<LeadsSearchParams>;
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const filters = parseLeadsSearchParams(await searchParams);
  const suspenseKey = JSON.stringify(filters);

  return (
    <Suspense
      key={suspenseKey}
      fallback={
        <DataTableSkelton
          rows={10}
          cols={6}
          showPagination
          tableClassName="min-w-[920px]"
        />
      }
    >
      <LeadsTableLoader filters={filters} />
    </Suspense>
  );
}
