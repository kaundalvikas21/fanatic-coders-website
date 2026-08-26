import { Suspense, type ReactNode } from 'react';

import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { isAdmin } from '@/lib/auth/roles';
import { PaymentAnalyticsOverviewLoader, PaymentsFilters } from '@/modules/payments';

export default async function PaymentsLayout({ children }: { children: ReactNode }) {
  const access = await getCurrentAccess();

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Payments"
          description="Monitor collected revenue, invoice status, and client payments."
        />
      }
    >
      {isAdmin(access?.role) ? (
        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
              <div className="grid gap-8 border-y border-border/60 py-6 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)]">
                <Skeleton className="h-[25rem] w-full" />
                <Skeleton className="h-[25rem] w-full" />
              </div>
            </div>
          }
        >
          <PaymentAnalyticsOverviewLoader />
        </Suspense>
      ) : null}
      <FilterLayout filters={<PaymentsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
