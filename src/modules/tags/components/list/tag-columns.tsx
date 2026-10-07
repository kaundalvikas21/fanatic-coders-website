'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import type { Tag } from '@/types';
import { TagRowActions } from './TagRowActions';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

export const tagColumns: ColumnDef<Tag>[] = [
  {
    accessorKey: 'name',
    header: 'Tag',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/tags/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => <span className="text-sm text-muted-foreground">/{row.original.slug}</span>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (
      <time
        dateTime={row.original.updatedAt}
        className="whitespace-nowrap text-sm text-muted-foreground"
      >
        {dateFormatter.format(new Date(row.original.updatedAt))}
      </time>
    ),
  },
  {
    id: 'actions',
    enableSorting: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <TagRowActions tag={row.original} />
      </div>
    ),
  },
];
