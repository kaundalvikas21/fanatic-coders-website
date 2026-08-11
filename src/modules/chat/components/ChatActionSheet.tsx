'use client';

import { MessageSquareText } from 'lucide-react';
import type { ReactNode } from 'react';

import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { cn } from '@/lib/utils';
import { useChat } from './ChatProvider';

const MAX_VISIBLE_UNREAD_COUNT = 99;

type ChatActionSheetProps = {
  title: string;
  description: string;
  triggerLabel: string;
  children: ReactNode;
};

export function ChatActionSheet({
  title,
  description,
  triggerLabel,
  children,
}: ChatActionSheetProps) {
  const { unreadCount, isAttentionActive, handleOpenChange } = useChat();
  const unreadLabel =
    unreadCount > MAX_VISIBLE_UNREAD_COUNT ? `${MAX_VISIBLE_UNREAD_COUNT}+` : unreadCount;

  return (
    <ActionSheet
      title={title}
      description={description}
      onOpenChange={handleOpenChange}
      trigger={
        <ActionSheetButton
          className={cn(
            'fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 rounded-full px-4 transition-[box-shadow,transform] duration-200 ease-out sm:right-6 sm:bottom-6',
            isAttentionActive &&
              'scale-[1.03] shadow-[0_0_0_5px_color-mix(in_oklch,var(--primary)_18%,transparent)]',
          )}
          aria-label={
            unreadCount > 0 ? `${triggerLabel}, ${unreadCount} unread messages` : triggerLabel
          }
        >
          <MessageSquareText data-icon="inline-start" />
          {triggerLabel}
          {unreadCount > 0 && (
            <span className="ml-1 flex min-w-5 items-center justify-center rounded-full bg-primary-foreground px-1 text-[10px] leading-5 font-semibold text-primary">
              {unreadLabel}
            </span>
          )}
        </ActionSheetButton>
      }
    >
      {children}
    </ActionSheet>
  );
}
