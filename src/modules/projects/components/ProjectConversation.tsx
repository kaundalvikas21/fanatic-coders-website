'use client';

import dynamic from 'next/dynamic';
import { useProjectChatCapabilities } from '@/modules/projects/hooks/use-project-chat-capabilities';

const LiveChatThread = dynamic(
  () => import('@/modules/chat/components/LiveChatThread').then((module) => module.LiveChatThread),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full min-h-72 flex-col gap-3 p-4"
        aria-label="Loading project chat"
      >
        <div className="h-16 w-3/4 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
        <div className="ml-auto h-16 w-2/3 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
        <div className="mt-auto h-10 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
      </div>
    ),
  },
);

export function ProjectConversation() {
  const capabilities = useProjectChatCapabilities();

  return (
    <LiveChatThread
      capabilities={capabilities}
      ariaLabel="Project chat messages"
    />
  );
}
