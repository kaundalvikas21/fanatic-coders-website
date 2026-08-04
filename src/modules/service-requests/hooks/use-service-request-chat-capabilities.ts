'use client';

import type { LiveChatCapabilities } from '@/modules/chat';
import { usePermissions } from '@/providers/PermissionProvider';

export function useServiceRequestChatCapabilities(): LiveChatCapabilities {
  const { can } = usePermissions();

  return {
    canSend: can('serviceRequestMessage', 'create'),
    canSendInternal: can('serviceRequestMessage', 'update'),
  };
}
