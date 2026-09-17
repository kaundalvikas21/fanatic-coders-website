'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { ActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { parseRoles, Role } from '@/lib/auth/roles';
import { usePermissions } from '@/providers/PermissionProvider';
import type { UserListItem } from '@/types';
import { DeleteUserActions } from './DeleteUserActions';
import { EditMemberRoleForm } from './EditMemberRoleForm';

export function UserRowActions({ member }: { member: UserListItem }) {
  const { role, memberId } = usePermissions();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const canEdit =
    parseRoles(role).includes(Role.ADMIN) && !parseRoles(member.role).includes(Role.ADMIN);
  const canDelete = parseRoles(role).includes(Role.ADMIN) && memberId !== member.id;

  return (
    <>
      <ActionDropdown
        triggerRef={trigger}
        ariaLabel={`Actions for ${member.user.name}`}
        onCloseAutoFocus={(event) => {
          if (deleteOpen || editOpen) event.preventDefault();
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
        {canEdit && (
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil /> Edit role
          </DropdownMenuItem>
        )}
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
      {canEdit && (
        <ActionDialog
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title="Edit role"
          description="Change this member's organization role."
        >
          <EditMemberRoleForm memberId={member.id} />
        </ActionDialog>
      )}
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
