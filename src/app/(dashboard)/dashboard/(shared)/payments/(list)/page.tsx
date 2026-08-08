import { Suspense } from 'react';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';
import { PaymentsTableLoader } from '@/modules/payments';
import {
  parsePaymentsSearchParams,
  type PaymentsSearchParams,
} from '@/modules/payments/config/search-params';

export const metadata = { title: 'Payments | fanaticCoders' };
export const dynamic = 'force-dynamic';

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<PaymentsSearchParams>;
}) {
  const filters = parsePaymentsSearchParams(await searchParams);

  return (
    <Suspense
      key={JSON.stringify(filters)}
      fallback={
        <DataTableSkelton
          rows={10}
          cols={6}
          showPagination
          tableClassName="min-w-[980px]"
        />
      }
    >
      <PaymentsTableLoader filters={filters} />
    </Suspense>
  );
}
