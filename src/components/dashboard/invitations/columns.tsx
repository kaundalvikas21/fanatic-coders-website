'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { InvitationListItem } from '@/types';
import { formatDate } from '@/utils/date';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

function getInvitationStatusVariant(status: string) {
  if (status === 'accepted') {
    return 'default';
  }

  if (status === 'pending') {
    return 'secondary';
  }

  return 'outline';
}

export const invitationColumns: ColumnDef<InvitationListItem>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.email}</span>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={getUserRoleBadgeVariant(row.original.role)}>{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={getInvitationStatusVariant(row.original.status)}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Sent
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expires',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDate(row.original.expiresAt)}</span>
    ),
  },
];
