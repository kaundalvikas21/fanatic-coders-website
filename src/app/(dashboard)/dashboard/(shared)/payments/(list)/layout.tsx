import { Suspense, type ReactNode } from 'react';

import { OverviewStatsSkeleton } from '@/components/dashboard/OverviewStatsCard';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { PaymentsFilters, PaymentStatusStatsLoader } from '@/modules/payments';

export default function PaymentsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Payments"
          description="Review Stripe invoices and payment status."
        />
      }
    >
      <Suspense
        fallback={
          <OverviewStatsSkeleton
            count={3}
            className="xl:grid-cols-3"
          />
        }
      >
        <PaymentStatusStatsLoader />
      </Suspense>
      <FilterLayout filters={<PaymentsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
