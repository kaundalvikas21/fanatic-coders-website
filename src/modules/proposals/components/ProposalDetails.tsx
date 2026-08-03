import { CreditCard, Download, FileText } from 'lucide-react';

import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H3, Muted, Small } from '@/components/ui/typography';
import type { Proposal } from '@/types';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';

type ProposalDetailsProps = {
  proposal: Proposal;
};

const proposalStatusLabels = {
  DRAFT: 'Draft',
  SENT: 'Sent',
  ACCEPTED: 'Accepted',
} as const;

const proposalStatusVariants = {
  DRAFT: 'outline',
  SENT: 'secondary',
  ACCEPTED: 'default',
} as const;

export function ProposalDetails({ proposal }: ProposalDetailsProps) {
  return (
    <WidgetCard
      icon={FileText}
      title="Proposal and invoice"
      description="Review the agreed scope, commercial terms, and invoice status."
      titleClassName="text-xl font-semibold"
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Muted>Project fee</Muted>
            <H3 className="mt-1">{formatMoney(proposal.amount, proposal.currency)}</H3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={proposalStatusVariants[proposal.status]}>
              {proposalStatusLabels[proposal.status]}
            </Badge>
            {proposal.status === 'ACCEPTED' && (
              <Badge variant={proposal.paymentStatus === 'PAID' ? 'default' : 'outline'}>
                {proposal.paymentStatus === 'PAID' ? 'Paid' : 'Payment due'}
              </Badge>
            )}
          </div>
        </div>

        <div>
          <Small>Scope</Small>
          <Muted className="mt-1 whitespace-pre-wrap leading-6">{proposal.description}</Muted>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Updated</dt>
            <dd className="mt-1 font-medium">{formatDate(proposal.updatedAt)}</dd>
          </div>
          {proposal.acceptedAt && (
            <div>
              <dt className="text-muted-foreground">Accepted</dt>
              <dd className="mt-1 font-medium">{formatDate(proposal.acceptedAt)}</dd>
            </div>
          )}
          {proposal.stripeInvoiceNumber && (
            <div>
              <dt className="text-muted-foreground">Invoice</dt>
              <dd className="mt-1 font-medium">{proposal.stripeInvoiceNumber}</dd>
            </div>
          )}
          {proposal.paidAt && (
            <div>
              <dt className="text-muted-foreground">Paid</dt>
              <dd className="mt-1 font-medium">{formatDate(proposal.paidAt)}</dd>
            </div>
          )}
        </dl>
        {proposal.status === 'ACCEPTED' && (
          <div className="flex flex-wrap gap-2">
            {proposal.paymentStatus === 'UNPAID' && proposal.stripeHostedInvoiceUrl && (
              <Button asChild>
                <a
                  href={proposal.stripeHostedInvoiceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CreditCard data-icon="inline-start" />
                  Pay invoice
                </a>
              </Button>
            )}
            {proposal.stripeInvoicePdfUrl && (
              <Button
                asChild
                variant="outline"
              >
                <a
                  href={proposal.stripeInvoicePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download data-icon="inline-start" />
                  Download PDF
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
