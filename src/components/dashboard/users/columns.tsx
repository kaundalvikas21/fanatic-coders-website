'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserListItem } from '@/types';
import { formatDate } from '@/utils/date';
import { getInitials } from '@/utils/string';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

export const userColumns: ColumnDef<UserListItem>[] = [
  {
    accessorKey: 'user.name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Member
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {member.user.image ? (
              <AvatarImage
                src={member.user.image}
                alt={member.user.name}
              />
            ) : null}
            <AvatarFallback>
              {getInitials(member.user.name, member.user.email) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link
              href={`/dashboard/admin/user/${member.id}`}
              prefetch={false}
              className="truncate font-medium hover:underline"
            >
              {member.user.name}
            </Link>
            <p className="truncate text-xs text-muted-foreground">{member.user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={getUserRoleBadgeVariant(row.original.role)}>{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.user.email}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Joined
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: 'actions',
    enableSorting: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="icon"
          >
            <Link
              href={`/dashboard/admin/user/${member.id}`}
              prefetch={false}
              aria-label={`View details for ${member.user.name}`}
              title={`View details for ${member.user.name}`}
            >
              <Eye />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
