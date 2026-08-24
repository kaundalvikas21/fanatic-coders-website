import { Suspense, type ReactNode } from 'react';

import { OverviewStatsSkeleton } from '@/components/dashboard/OverviewStatsCard';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { isAdmin } from '@/lib/auth/roles';
import { PaymentsFilters, PaymentStatusStatsLoader } from '@/modules/payments';

export default async function PaymentsLayout({ children }: { children: ReactNode }) {
  const access = await getCurrentAccess();

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Payments"
          description="Review Stripe invoices and payment status."
        />
      }
    >
      {/* CURRENT USER IS ADMIN THEN HE CAN ACCESS  */}
      {isAdmin(access?.role) ? (
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
      ) : null}
      <FilterLayout filters={<PaymentsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
