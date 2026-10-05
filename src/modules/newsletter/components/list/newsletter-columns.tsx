'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { NewsletterSubscriber } from '@/types';

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
});

export const newsletterColumns: ColumnDef<NewsletterSubscriber>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Subscriber
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const email = row.original.email;

      return (
        <a
          href={`mailto:${email}`}
          title={email}
          className="block max-w-[32rem] truncate font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {email}
        </a>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Subscribed
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <time
        dateTime={row.original.createdAt}
        className="tabular-nums text-muted-foreground"
      >
        {dateFormatter.format(new Date(row.original.createdAt))} UTC
      </time>
    ),
  },
];
