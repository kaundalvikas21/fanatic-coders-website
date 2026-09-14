'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Eye, Trash2 } from 'lucide-react';
import { ActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { parseRoles, Role } from '@/lib/auth/roles';
import { usePermissions } from '@/providers/PermissionProvider';
import type { UserListItem } from '@/types';
import { DeleteUserActions } from './DeleteUserActions';

export function UserRowActions({ member }: { member: UserListItem }) {
  const { role, memberId } = usePermissions();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const canDelete = parseRoles(role).includes(Role.ADMIN) && memberId !== member.id;

  return (
    <>
      <ActionDropdown
        triggerRef={trigger}
        ariaLabel={`Actions for ${member.user.name}`}
        onCloseAutoFocus={(event) => {
          if (deleteOpen) event.preventDefault();
        }}
      >
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/admin/user/${member.id}`}
            prefetch={false}
          >
            <Eye /> View details
          </Link>
        </DropdownMenuItem>
        {canDelete ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 /> Delete user
            </DropdownMenuItem>
          </>
        ) : null}
      </ActionDropdown>
      {canDelete ? (
        <ActionDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title={`Delete ${member.user.name}?`}
          description="Deletes this account and any client-owned data. Work created for other clients is kept. This cannot be undone."
        >
          <DeleteUserActions member={member} />
        </ActionDialog>
      ) : null}
    </>
  );
}
