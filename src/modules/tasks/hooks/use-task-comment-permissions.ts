'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import { hasAnyRole, Role } from '@/lib/auth/roles';
import type { TaskComment } from '@/types';

export function useTaskCommentPermissions(comment?: TaskComment) {
  const { can, role, memberId } = usePermissions();
  const isAuthor = comment?.memberId === memberId;
  const isModerator = hasAnyRole(role, [Role.ADMIN, Role.MANAGER]);
  const canEditComment = isAuthor || isModerator;

  return {
    canCreate: can('taskComment', 'create'),
    canRead: can('taskComment', 'read'),
    canUpdate: can('taskComment', 'update') && canEditComment,
    canDelete: can('taskComment', 'delete') && canEditComment,
  };
}
