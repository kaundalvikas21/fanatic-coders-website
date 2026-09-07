'use client';

import { MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { cn } from '@/lib/utils';
import { useChat } from './ChatProvider';
import styles from './ChatActionSheet.module.css';

const MAX_VISIBLE_UNREAD_COUNT = 99;

type ChatActionSheetProps = {
  title: string;
  description: string;
  triggerLabel: string;
  deepLinkTargetId?: string;
  children: ReactNode;
};

export function ChatActionSheet({
  title,
  description,
  triggerLabel,
  deepLinkTargetId,
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
          id={deepLinkTargetId}
          size="icon-lg"
          title={triggerLabel}
          className={cn(
            'fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 size-14 overflow-visible rounded-full p-0 transition-[background-color,box-shadow,transform] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]',
            deepLinkTargetId && styles.deepLinkTarget,
            isAttentionActive &&
              'scale-[1.03] shadow-[0_0_0_5px_color-mix(in_oklch,var(--primary)_18%,transparent)]',
          )}
          aria-label={
            unreadCount > 0 ? `${triggerLabel}, ${unreadCount} unread messages` : triggerLabel
          }
        >
          <MessageCircle
            className="size-6"
            aria-hidden="true"
          />
          {unreadCount > 0 && (
            <span
              className="pointer-events-none absolute -top-1 -right-1 z-10 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs leading-none font-semibold text-white ring-2 ring-background tabular-nums"
              aria-hidden="true"
            >
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
