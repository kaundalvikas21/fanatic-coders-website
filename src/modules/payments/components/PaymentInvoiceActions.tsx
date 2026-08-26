import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Payment } from '@/types';

type PaymentInvoiceActionsProps = Pick<
  Payment,
  'status' | 'stripeHostedInvoiceUrl' | 'stripeInvoicePdfUrl' | 'stripeInvoiceNumber'
>;

export function PaymentInvoiceActions({
  status,
  stripeHostedInvoiceUrl,
  stripeInvoicePdfUrl,
  stripeInvoiceNumber,
}: PaymentInvoiceActionsProps) {
  const invoiceLabel = stripeInvoiceNumber ? ' ' + stripeInvoiceNumber : '';

  if (!stripeHostedInvoiceUrl && !stripeInvoicePdfUrl) {
    return <span className="text-xs text-muted-foreground">No document</span>;
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {stripeHostedInvoiceUrl && (
        <Button
          asChild
          variant={status === 'UNPAID' ? 'default' : 'outline'}
          size="sm"
        >
          <a
            href={stripeHostedInvoiceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={(status === 'UNPAID' ? 'Pay' : 'View') + ' invoice' + invoiceLabel}
          >
            {status === 'UNPAID' ? 'Pay invoice' : 'View invoice'}
            <ExternalLink data-icon="inline-end" />
          </a>
        </Button>
      )}

      {stripeInvoicePdfUrl && (
        <Button
          asChild
          variant="ghost"
          size="icon-sm"
        >
          <a
            href={stripeInvoicePdfUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={'Download invoice' + invoiceLabel}
          >
            <Download />
          </a>
        </Button>
      )}
    </div>
  );
}
