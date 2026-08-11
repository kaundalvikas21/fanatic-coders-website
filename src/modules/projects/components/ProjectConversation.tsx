'use client';

import { LiveChatThread } from '@/modules/chat';
import { useProjectChatCapabilities } from '@/modules/projects/hooks/use-project-chat-capabilities';

export function ProjectConversation() {
  const capabilities = useProjectChatCapabilities();

  return (
    <LiveChatThread
      capabilities={capabilities}
      ariaLabel="Project chat messages"
    />
  );
}
