import { Suspense } from 'react';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';
import { LeadsTableSection } from '@/modules/leads';

export const metadata = {
  title: 'Leads | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <DataTableSkelton
          rows={5}
          cols={6}
          tableClassName="min-w-[920px]"
        />
      }
    >
      <LeadsTableSection />
    </Suspense>
  );
}
