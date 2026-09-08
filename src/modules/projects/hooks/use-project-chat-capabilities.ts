'use client';

import type { LiveChatCapabilities } from '@/modules/chat';
import { usePermissions } from '@/providers/PermissionProvider';

export function useProjectChatCapabilities(): LiveChatCapabilities {
  const { can } = usePermissions();

  return {
    canSend: can('project', 'read') && can('chat', 'read') && can('chat', 'create'),
    canSendInternal: can('project', 'update'),
  };
}
