import type { CurrentAccess } from '@/types';

export type TaskPermissions = {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export function createTaskPermissions(access: CurrentAccess | null): TaskPermissions {
  return {
    canCreate: access?.can('task', 'create') ?? false,
    canRead: access?.can('task', 'read') ?? false,
    canUpdate: access?.can('task', 'update') ?? false,
    canDelete: access?.can('task', 'delete') ?? false,
  };
}
