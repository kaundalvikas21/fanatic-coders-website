'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import type { ServiceRequestMessagePermissions } from '@/modules/service-requests/utils/message-permissions';

export function useServiceRequestMessagePermissions(): ServiceRequestMessagePermissions {
  const { can } = usePermissions();

  return {
    canCreate: can('serviceRequestMessage', 'create'),
    canRead: can('serviceRequestMessage', 'read'),
    canCreateInternal: can('serviceRequestMessage', 'update'),
  } satisfies ServiceRequestMessagePermissions;
}
