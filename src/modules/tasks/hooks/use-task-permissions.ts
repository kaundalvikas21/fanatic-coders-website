'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import type { TaskPermissions } from '@/modules/tasks/utils/permissions';

export function useTaskPermissions(): TaskPermissions {
  const { can } = usePermissions();

  return {
    canCreate: can('task', 'create'),
    canRead: can('task', 'read'),
    canUpdate: can('task', 'update'),
    canDelete: can('task', 'delete'),
  };
}
