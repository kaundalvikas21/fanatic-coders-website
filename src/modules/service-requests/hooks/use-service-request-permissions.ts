'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import type { ServiceRequestPermissions } from '@/modules/service-requests/utils/permissions';

export function useServiceRequestPermissions(): ServiceRequestPermissions {
  const { can } = usePermissions();
  const canUpdate = can('serviceRequest', 'update');

  return {
    canCreate: can('serviceRequest', 'create'),
    canRead: can('serviceRequest', 'read'),
    canUpdate,
    canDelete: can('serviceRequest', 'delete'),
    isManagementView: canUpdate,
  } satisfies ServiceRequestPermissions;
}
