'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import type { Portfolio } from '@/types';
import { formatDate } from '@/utils/date';
import { PortfolioRowActions } from './PortfolioRowActions';

export const portfolioColumns: ColumnDef<Portfolio>[] = [
  {
    accessorKey: 'title',
    header: 'Portfolio',
    cell: ({ row }) => {
      const portfolio = row.original;

      return (
        <div className="flex min-w-64 items-start gap-3">
          {portfolio.imageUrl ? (
            <Image
              src={portfolio.imageUrl}
              alt=""
              width={64}
              height={48}
              unoptimized
              className="h-12 w-16 shrink-0 rounded-md object-cover"
            />
          ) : (
            <div
              className="h-12 w-16 shrink-0 rounded-md bg-muted"
              aria-hidden="true"
            />
          )}
          <div className="min-w-0">
            <Link
              href={`/dashboard/portfolios/${encodeURIComponent(portfolio.id)}`}
              className="font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {portfolio.title}
            </Link>
            <p className="mt-1 line-clamp-2 max-w-96 text-sm text-muted-foreground">
              {portfolio.description}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'client',
    header: 'Client',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.client || '—'}</span>
    ),
  },
  {
    accessorKey: 'isPublished',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.isPublished ? 'default' : 'secondary'}>
        {row.original.isPublished ? 'Published' : 'Draft'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <time
        dateTime={row.original.createdAt}
        className="whitespace-nowrap text-sm text-muted-foreground"
      >
        {formatDate(row.original.createdAt)}
      </time>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (
      <time
        dateTime={row.original.updatedAt}
        className="whitespace-nowrap text-sm text-muted-foreground"
      >
        {formatDate(row.original.updatedAt)}
      </time>
    ),
  },
  {
    id: 'actions',
    enableSorting: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <PortfolioRowActions portfolio={row.original} />
      </div>
    ),
  },
];
