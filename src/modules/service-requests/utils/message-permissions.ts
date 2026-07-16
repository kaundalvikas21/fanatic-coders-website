import type { CurrentAccess } from '@/types';

export type ServiceRequestMessagePermissions = Readonly<{
  canCreate: boolean;
  canRead: boolean;
  canCreateInternal: boolean;
}>;

export function createServiceRequestMessagePermissions(
  access: CurrentAccess | null | undefined,
): ServiceRequestMessagePermissions {
  return {
    canCreate: access?.can('serviceRequestMessage', 'create') ?? false,
    canRead: access?.can('serviceRequestMessage', 'read') ?? false,
    canCreateInternal: access?.can('serviceRequestMessage', 'update') ?? false,
  } satisfies ServiceRequestMessagePermissions;
}
