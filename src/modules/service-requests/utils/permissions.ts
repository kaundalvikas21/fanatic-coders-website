import type { CurrentAccess } from '@/types';

export type ServiceRequestPermissions = Readonly<{
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isManagementView: boolean;
}>;

export function createServiceRequestPermissions(
  access: CurrentAccess | null | undefined,
): ServiceRequestPermissions {
  const canCreate = access?.role === 'CLIENT' && access.can('serviceRequest', 'create');
  const canUpdate = access?.can('serviceRequest', 'update') ?? false;

  return {
    canCreate,
    canRead: access?.can('serviceRequest', 'read') ?? false,
    canUpdate,
    canDelete: access?.can('serviceRequest', 'delete') ?? false,
    isManagementView: canUpdate,
  } satisfies ServiceRequestPermissions;
}
