import Link from 'next/link';
import { ArrowUpRight, CreditCard } from 'lucide-react';

import { WidgetCard } from '@/components/shared/widget-card';
import { ErrorState } from '@/components/shared/error-state';
import { Button } from '@/components/ui/button';
import { getAdminPaymentSummary } from '@/modules/dashboard/data/queries';
import { PaymentRevenueOverview } from '@/modules/payments/components/PaymentRevenueOverview';
import { PaymentStatusOverview } from '@/modules/payments/components/PaymentStatusOverview';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';
import type { AdminPaymentSummary } from '@/types';

function PaymentSummaryContent({ summary }: { summary: AdminPaymentSummary }) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)]">
        <PaymentRevenueOverview
          currencies={summary.byCurrency}
          trend={summary.revenueTrend}
        />
        <PaymentStatusOverview
          paidInvoices={summary.paidTransactions}
          unpaidInvoices={summary.unpaidTransactions}
        />
      </div>

      <section
        aria-labelledby="recent-paid-invoices-heading"
        className="mt-8 border-t border-border/60 pt-6"
      >
        <div>
          <h3
            id="recent-paid-invoices-heading"
            className="text-sm font-semibold"
          >
            Recent paid invoices
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Most recently settled client invoices.
          </p>
        </div>

        {summary.recentTransactions.length > 0 ? (
          <div className="mt-4 divide-y divide-border/60 border-y border-border/60">
            {summary.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-3 text-sm transition-colors hover:bg-muted/30 md:grid-cols-[minmax(0,1fr)_auto_auto_auto] md:items-center md:gap-x-6"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{transaction.clientName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {transaction.description}
                    {transaction.stripeInvoiceNumber && ` · ${transaction.stripeInvoiceNumber}`}
                  </p>
                </div>
                <p className="col-start-1 row-start-2 text-xs text-muted-foreground md:col-start-2 md:row-start-1 md:text-sm">
                  {formatDate(transaction.paidAt)}
                </p>
                <p className="col-start-2 row-start-1 shrink-0 text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400 md:col-start-3">
                  +{formatMoney(transaction.amount, transaction.currency)}
                </p>
                <Link
                  href={`/dashboard/services/${transaction.serviceRequestId}`}
                  aria-label={`Open ${transaction.clientName} service request`}
                  className="col-start-2 row-start-2 inline-flex size-9 items-center justify-center justify-self-end rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:col-start-4 md:row-start-1"
                >
                  <ArrowUpRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 border-y border-border/60 py-6 text-sm text-muted-foreground">
            Paid invoices will appear here after the first settlement.
          </p>
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
      title="Payments"
      description="Collected revenue and invoice activity across the workspace."
      actionSlot={
        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <Link href="/dashboard/payments">
            View invoices
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      }
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
