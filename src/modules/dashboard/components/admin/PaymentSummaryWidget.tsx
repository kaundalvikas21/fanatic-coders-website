import Link from 'next/link';
import { ArrowUpRight, CreditCard, ReceiptText } from 'lucide-react';

import { PaymentStatusBarChart } from '@/components/dashboard/charts/PaymentStatusBarChart';
import { WidgetCard } from '@/components/shared/widget-card';
import { ErrorState } from '@/components/shared/error-state';
import { getAdminPaymentSummary } from '@/modules/dashboard/data/queries';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';
import type { AdminPaymentSummary } from '@/types';

function PaymentSummaryContent({ summary }: { summary: AdminPaymentSummary }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-xl border border-border/70 bg-muted/[0.18] p-4">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">Payment status</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Paid and pending invoices across the workspace.
            </p>
          </div>
          <CreditCard
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <PaymentStatusBarChart
          data={[
            { status: 'Paid', payments: summary.paidTransactions },
            { status: 'Pending', payments: summary.unpaidTransactions },
          ]}
        />
        {summary.byCurrency.length > 0 && (
          <div className="grid gap-2 border-t border-border/60 pt-4">
            {summary.byCurrency.map((currencySummary) => (
              <div
                key={currencySummary.currency}
                className="flex items-center justify-between gap-3 text-xs text-muted-foreground"
              >
                <span>
                  {currencySummary.currency} · {currencySummary.transactionCount} payments
                </span>
                <span className="font-medium text-foreground">
                  Avg. {formatMoney(currencySummary.averageAmount, currencySummary.currency)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ReceiptText
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <h3 className="text-sm font-semibold">Latest transactions</h3>
          </div>
          <Link
            href="/dashboard/payments"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all
            <ArrowUpRight
              className="size-3.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        {summary.recentTransactions.length > 0 ? (
          <div className="divide-y divide-border/60 rounded-xl border border-border/70">
            {summary.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 px-3.5 py-3.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{transaction.clientName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {transaction.description} · {formatDate(transaction.paidAt)}
                  </p>
                </div>
                <p className="shrink-0 font-semibold tabular-nums">
                  {formatMoney(transaction.amount, transaction.currency)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recent transactions.</p>
        )}
      </section>
    </div>
  );
}

export async function PaymentSummaryWidget() {
  const response = await getAdminPaymentSummary();

  return response.success ? (
    <WidgetCard
      icon={CreditCard}
      title="Payment analytics"
      description="Revenue and recent invoice activity across the workspace."
    >
      <PaymentSummaryContent summary={response.data} />
    </WidgetCard>
  ) : (
    <ErrorState
      title="Could not load payment analytics"
      message={response.message}
    />
  );
}
