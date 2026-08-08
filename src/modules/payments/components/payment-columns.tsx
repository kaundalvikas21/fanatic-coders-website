'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Download, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Payment } from '@/types';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    id: 'invoice',
    header: 'Invoice',
    cell: ({ row }) => (
      <div className="flex min-w-40 flex-col gap-1">
        <span className="font-medium">{row.original.stripeInvoiceNumber ?? 'Pending number'}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {row.original.stripeInvoiceId}
        </span>
      </div>
    ),
  },
  {
    id: 'client',
    header: 'Client',
    cell: ({ row }) => (
      <div className="flex min-w-48 flex-col gap-1">
        <span className="font-medium">{row.original.client.name}</span>
        <span className="text-sm text-muted-foreground">{row.original.client.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {formatMoney(row.original.amount, row.original.currency)}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className="bg-primary text-primary-foreground">
        {row.original.status === 'PAID' ? 'Paid' : 'Unpaid'}
      </Badge>
    ),
  },
  {
    accessorKey: 'paidAt',
    header: 'Paid on',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.paidAt ? formatDate(row.original.paidAt) : 'Not paid'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        {row.original.stripeHostedInvoiceUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <a
              href={row.original.stripeHostedInvoiceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink />
              View
            </a>
          </Button>
        )}
        {row.original.stripeInvoicePdfUrl && (
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
          >
            <a
              href={row.original.stripeInvoicePdfUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Download invoice ${row.original.stripeInvoiceNumber ?? ''}`.trim()}
            >
              <Download />
            </a>
          </Button>
        )}
      </div>
    ),
  },
];
