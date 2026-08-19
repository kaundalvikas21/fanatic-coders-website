'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';

import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { LeadInviteForm } from '../details/LeadInviteForm';
import { LeadStatusForm } from '../details/LeadStatusForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WidgetCard } from '@/components/shared/widget-card';
import {
  LEAD_STATUS_BADGE_VARIANTS,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_OPTIONS,
  type Lead,
  type LeadStatus,
} from '@/types';
import { leadServiceLabels, leadSourceLabels } from '../../config/labels';
import { TypographyMuted } from '@/components/ui/typography';

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const option = LEAD_STATUS_OPTIONS.find((item) => item.value === status);

  return (
    <Badge
      variant={LEAD_STATUS_BADGE_VARIANTS[status]}
      color={LEAD_STATUS_COLORS[status]}
    >
      {option?.label ?? status}
    </Badge>
  );
}

function formatRelativeDate(value: string) {
  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays <= 0) {
    return 'Today';
  }

  if (diffDays === 1) {
    return '1 day ago';
  }

  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(date);
}

function LeadMessage({ lead }: { lead: Lead }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-1 text-muted-foreground">
      <p>Service: {leadServiceLabels[lead.serviceInterest]}</p>
      <p>Budget: {lead.budgetRange || 'Not shared'}</p>
    </div>
  );
}

export const leadColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Lead
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <div className="flex flex-col gap-1.5">
          <Link
            href={`/dashboard/leads/${lead.id}`}
            className="font-medium leading-none hover:underline"
          >
            {lead.name}
          </Link>
          <TypographyMuted>{lead.email}</TypographyMuted>
        </div>
      );
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        <Badge
          variant="outline"
          className="w-fit"
        >
          {leadSourceLabels[row.original.source]}
        </Badge>
        <span className="text-muted-foreground">
          {row.original.companyName || 'No company added'}
        </span>
      </div>
    ),
  },
  {
    id: 'message',
    header: 'Message',
    cell: ({ row }) => <LeadMessage lead={row.original} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <LeadStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Received
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatRelativeDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: 'actions',
    enableSorting: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <div className="flex justify-center">
          <ActionSheet
            title={lead.name}
            description={lead.companyName || 'Lead details'}
            contentClassName="sm:max-w-2xl"
            trigger={
              <ActionSheetButton
                variant="ghost"
                size="icon"
                aria-label={`View ${lead.name}`}
                title={`View ${lead.name}`}
              >
                <Eye />
              </ActionSheetButton>
            }
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <WidgetCard
                  title="Invite"
                  description="Send client access to this lead."
                  titleClassName="text-xl font-semibold"
                >
                  <LeadInviteForm
                    leadEmail={lead.email}
                    serviceInterest={lead.serviceInterest}
                  />
                </WidgetCard>
                <WidgetCard
                  title="Update status"
                  description="Move this lead to another stage."
                  titleClassName="text-xl font-semibold"
                  className="overflow-visible"
                >
                  <LeadStatusForm
                    leadId={lead.id}
                    initialStatus={lead.status}
                  />
                </WidgetCard>
              </div>
            </div>
          </ActionSheet>
        </div>
      );
    },
  },
];
