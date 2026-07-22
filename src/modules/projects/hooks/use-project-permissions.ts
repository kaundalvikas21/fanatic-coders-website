'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import type { ProjectPermissions } from '@/modules/projects/utils/permissions';

export function useProjectPermissions(): ProjectPermissions {
  const { can } = usePermissions();
  const canUpdate = can('project', 'update');

  return {
    canCreate: can('project', 'create'),
    canRead: can('project', 'read'),
    canUpdate,
    canDelete: can('project', 'delete'),
    isManagementView: canUpdate,
  };
}
