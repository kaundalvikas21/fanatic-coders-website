import type { CurrentAccess } from '@/types';

export type ProjectPermissions = {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isManagementView: boolean;
};

export function createProjectPermissions(access: CurrentAccess | null): ProjectPermissions {
  const canUpdate = access?.can('project', 'update') ?? false;

  return {
    canCreate: access?.can('project', 'create') ?? false,
    canRead: access?.can('project', 'read') ?? false,
    canUpdate,
    canDelete: access?.can('project', 'delete') ?? false,
    isManagementView: canUpdate,
  };
}
