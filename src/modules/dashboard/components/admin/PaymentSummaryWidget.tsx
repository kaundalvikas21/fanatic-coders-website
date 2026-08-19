import Link from 'next/link';
import { ArrowUpRight, CreditCard, FileText, ReceiptText } from 'lucide-react';

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
          <div className="divide-y divide-border/60">
            {summary.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3.5 text-sm transition-colors hover:bg-muted/30 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted/70 text-muted-foreground">
                  <FileText
                    className="size-4"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{transaction.clientName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {transaction.description}
                    {transaction.stripeInvoiceNumber && ` · ${transaction.stripeInvoiceNumber}`}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                  {formatDate(transaction.paidAt)}
                </p>
                <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-auto">
                  <p className="shrink-0 font-semibold tabular-nums text-emerald-500">
                    +{formatMoney(transaction.amount, transaction.currency)}
                  </p>
                  <Link
                    href={`/dashboard/services/${transaction.serviceRequestId}`}
                    aria-label={`Open ${transaction.clientName} service request`}
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowUpRight
                      className="size-4"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
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
