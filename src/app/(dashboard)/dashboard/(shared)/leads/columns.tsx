'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Mail, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LEAD_STATUS_BADGE_VARIANTS,
  LEAD_STATUS_OPTIONS,
  type Lead,
  type LeadSource,
  type LeadStatus,
  type ServiceInterest,
} from '@/types';

const serviceLabels = {
  WEB_DEVELOPMENT: 'Web development',
  MOBILE_APP_DEVELOPMENT: 'Mobile app development',
  SEO: 'SEO',
  GOOGLE_ADS: 'Google Ads',
  GENERAL_MARKETING: 'General marketing',
  OTHER: 'Other',
} satisfies Record<ServiceInterest, string>;

const sourceLabels = {
  CONTACT_FORM: 'Contact form',
} satisfies Record<LeadSource, string>;

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const option = LEAD_STATUS_OPTIONS.find((item) => item.value === status);

  return <Badge variant={LEAD_STATUS_BADGE_VARIANTS[status]}>{option?.label ?? status}</Badge>;
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

function getLeadMailHref(lead: Lead) {
  const subject = encodeURIComponent(`Project inquiry from ${lead.name}`);

  return `mailto:${lead.email}?subject=${subject}`;
}

function LeadMessage({ lead }: { lead: Lead }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-1 text-muted-foreground">
      <p>Service: {serviceLabels[lead.serviceInterest]}</p>
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
          <a
            href={getLeadMailHref(lead)}
            className="text-muted-foreground hover:text-primary hover:underline"
          >
            {lead.email}
          </a>
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
          {sourceLabels[row.original.source]}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Open actions for ${lead.name}`}
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/leads/${lead.id}`}>
                    <Eye />
                    View lead
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={getLeadMailHref(lead)}>
                    <Mail />
                    Email lead
                  </a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
