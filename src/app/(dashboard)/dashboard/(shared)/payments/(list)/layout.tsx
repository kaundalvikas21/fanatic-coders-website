import type { ReactNode } from 'react';

import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { PaymentsFilters } from '@/modules/payments';

export default function PaymentsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Payments"
          description="Review Stripe invoices and payment status."
          showBackButton
        />
      }
    >
      <PaymentsFilters />
      {children}
    </ListsLayout>
  );
}
