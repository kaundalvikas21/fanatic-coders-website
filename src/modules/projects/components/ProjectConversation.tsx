'use client';

import { LiveChatThread } from '@/modules/chat';
import { useProjectChatCapabilities } from '@/modules/projects/hooks/use-project-chat-capabilities';

type ProjectConversationProps = {
  projectId: string;
};

export function ProjectConversation({ projectId }: ProjectConversationProps) {
  const capabilities = useProjectChatCapabilities();

  return (
    <LiveChatThread
      channel={{ type: 'project', id: projectId }}
      capabilities={capabilities}
      ariaLabel="Project chat messages"
    />
  );
}
