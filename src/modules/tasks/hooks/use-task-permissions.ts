'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import { hasAnyRole, Role } from '@/lib/auth/roles';
import type { Task } from '@/types';

export function useTaskPermissions(task?: Task) {
  const { can, role, memberId } = usePermissions();
  const canUpdate = can('task', 'update');
  const isManagement = hasAnyRole(role, [Role.ADMIN, Role.MANAGER]);
  const isAssigned = task?.assignees.some((assignee) => assignee.memberId === memberId) ?? false;

  return {
    canCreate: can('task', 'create'),
    canRead: can('task', 'read'),
    canUpdate,
    canDelete: can('task', 'delete'),
    canManageAddOns: canUpdate && isManagement,
    canUpdateAddOnCompletion: canUpdate && (isManagement || isAssigned),
  };
}
