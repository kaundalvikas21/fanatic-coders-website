import { PaymentStatusBarChart } from './PaymentStatusBarChart';

type PaymentStatusOverviewProps = {
  paidInvoices: number;
  unpaidInvoices: number;
};

export function PaymentStatusOverview({
  paidInvoices,
  unpaidInvoices,
}: PaymentStatusOverviewProps) {
  const totalInvoices = paidInvoices + unpaidInvoices;
  const collectionRate = totalInvoices === 0 ? 0 : Math.round((paidInvoices / totalInvoices) * 100);

  return (
    <section
      aria-labelledby="invoice-status-heading"
      className="h-full"
    >
      <div>
        <h3
          id="invoice-status-heading"
          className="text-sm font-semibold"
        >
          Invoice status
        </h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Collection progress across issued Stripe invoices.
        </p>
      </div>

      <div className="mt-4 border-y border-border/60 py-3">
        <PaymentStatusBarChart
          paidInvoices={paidInvoices}
          unpaidInvoices={unpaidInvoices}
        />
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {collectionRate}% of issued invoices collected
        </p>
      </div>

      {/* {unpaidInvoices > 0 ? (
        <Button
          asChild
          variant="outline"
          className="mt-5 w-full justify-between border-amber-300 bg-amber-50 text-amber-950 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/60"
        >
          <Link href="/dashboard/payments?status=UNPAID">
            Review {unpaidInvoices} unpaid {unpaidInvoices === 1 ? 'invoice' : 'invoices'}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      ) : (
        <p className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100">
          Every issued invoice is paid.
        </p>
      )} */}
    </section>
  );
}
