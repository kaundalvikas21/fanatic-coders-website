import { CircleCheckBig, CircleDashed, CreditCard } from 'lucide-react';
import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminPaymentSummary } from '@/modules/dashboard/data/queries';
import type { AdminPaymentSummary } from '@/types';

type PaymentStatusStatsProps = {
  summary: AdminPaymentSummary;
};

export function PaymentStatusStats({ summary }: PaymentStatusStatsProps) {
  const total = summary.paidTransactions + summary.unpaidTransactions;
  const stats: OverviewStat[] = [
    {
      label: 'Paid',
      value: summary.paidTransactions,
      supportingText: 'Invoices paid by clients',
      icon: CircleCheckBig,
      tone: 'emerald',
    },
    {
      label: 'Unpaid',
      value: summary.unpaidTransactions,
      supportingText: 'Invoices waiting for payment',
      icon: CircleDashed,
      tone: 'amber',
    },
    {
      label: 'Total',
      value: total,
      supportingText: `${total} total ${total === 1 ? 'invoice' : 'invoices'}`,
      icon: CreditCard,
      tone: 'blue',
    },
  ];

  return (
    <OverviewStatsCard
      stats={stats}
      className="xl:grid-cols-3"
    />
  );
}

export async function PaymentStatusStatsLoader() {
  const response = await getAdminPaymentSummary();

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load payment totals"
        message={response.message}
      />
    );
  }

  return <PaymentStatusStats summary={response.data} />;
}
