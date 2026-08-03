'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import type { ProposalPermissions } from '@/modules/proposals/utils/permissions';

export function useProposalPermissions(): ProposalPermissions {
  const { can } = usePermissions();
  const canCreate = can('proposal', 'create');
  const canDelete = can('proposal', 'delete');
  const isManagementView = canCreate || canDelete;

  return {
    canCreate,
    canRead: can('proposal', 'read'),
    canUpdate: can('proposal', 'update'),
    canDelete,
    isManagementView,
    isClientView: !isManagementView,
  } satisfies ProposalPermissions;
}
