import { ErrorState } from '@/components/shared/error-state';
import { getAdminPaymentSummary } from '@/modules/dashboard/data/queries';
import type { AdminPaymentSummary } from '@/types';
import { PaymentRevenueOverview } from './PaymentRevenueOverview';
import { PaymentStatusOverview } from './PaymentStatusOverview';
import { PaymentStatusStats } from './list/PaymentStatusStats';
import { WidgetCard } from '@/components/shared/widget-card';
import { DollarSign } from 'lucide-react';

type PaymentAnalyticsOverviewProps = {
  summary: AdminPaymentSummary;
};

export function PaymentAnalyticsOverview({ summary }: PaymentAnalyticsOverviewProps) {
  return (
    <section
      aria-label="Payment analytics"
      className="space-y-6"
    >
      <PaymentStatusStats summary={summary} />

      <WidgetCard
        title="Total Revenue"
        description="Statistics about all item"
        icon={DollarSign}
        contentClassNames="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)]"
      >
        <PaymentRevenueOverview
          currencies={summary.byCurrency}
          trend={summary.revenueTrend}
        />
        <PaymentStatusOverview
          paidInvoices={summary.paidTransactions}
          unpaidInvoices={summary.unpaidTransactions}
        />
      </WidgetCard>
    </section>
  );
}

export async function PaymentAnalyticsOverviewLoader() {
  const response = await getAdminPaymentSummary();

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load payment analytics"
        message={response.message}
      />
    );
  }

  return <PaymentAnalyticsOverview summary={response.data} />;
}
