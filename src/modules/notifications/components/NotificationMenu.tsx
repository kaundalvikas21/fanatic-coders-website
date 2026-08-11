'use client';

import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, Inbox, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/modules/notifications/hooks/use-notifications';
import type { Notification } from '@/modules/notifications/types';

const MAX_VISIBLE_UNREAD_COUNT = 99;

function NotificationMenuSkeleton() {
  return (
    <div className="space-y-3 p-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="space-y-2"
        >
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
};

function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const isUnread = notification.readAt === null;
  const className = cn(
    'flex w-full gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
    isUnread && 'bg-primary/5',
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full bg-transparent',
          isUnread && 'bg-primary',
        )}
      />
      <span className="min-w-0 flex-1">
        <span className={cn('block text-sm', isUnread && 'font-medium')}>{notification.title}</span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">
          {notification.message}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </span>
      </span>
    </>
  );

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        className={className}
        onClick={() => {
          if (isUnread) {
            onMarkAsRead(notification.id);
          }
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (isUnread) {
          onMarkAsRead(notification.id);
        }
      }}
    >
      {content}
    </button>
  );
}

export function NotificationMenu() {
  const {
    notifications,
    unreadCount,
    error,
    isLoading,
    isValidating,
    markAsRead,
    markAllAsRead,
    mutate,
  } = useNotifications();
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const unreadLabel =
    unreadCount > MAX_VISIBLE_UNREAD_COUNT ? `${MAX_VISIBLE_UNREAD_COUNT}+` : String(unreadCount);

  function handleMarkAsRead(notificationId: string) {
    void markAsRead(notificationId).catch(() => {
      toast.error('Could not mark notification as read.');
    });
  }

  async function handleMarkAllAsRead() {
    setIsMarkingAll(true);

    try {
      await markAllAsRead();
    } catch {
      toast.error('Could not mark all notifications as read.');
    } finally {
      setIsMarkingAll(false);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground">
              {unreadLabel}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(24rem,calc(100vw-2rem))] gap-0 overflow-hidden p-0"
      >
        <PopoverHeader className="flex-row items-center justify-between gap-3 px-3 py-3">
          <div>
            <PopoverTitle>Notifications</PopoverTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            disabled={unreadCount === 0 || isMarkingAll}
            onClick={handleMarkAllAsRead}
          >
            <CheckCheck />
            Mark all read
          </Button>
        </PopoverHeader>

        <Separator />

        {isLoading ? (
          <NotificationMenuSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 px-5 py-8 text-center">
            <p className="text-sm font-medium">Could not load notifications</p>
            <Button
              variant="outline"
              size="sm"
              disabled={isValidating}
              onClick={() => void mutate()}
            >
              <RefreshCw className={cn(isValidating && 'animate-spin')} />
              Try again
            </Button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-10 text-center">
            <Inbox className="mb-3 size-8 text-muted-foreground" />
            <p className="text-sm font-medium">No notifications yet</p>
            <p className="mt-1 max-w-56 text-xs leading-5 text-muted-foreground">
              Task assignments and project updates will appear here.
            </p>
          </div>
        ) : (
          <div className="max-h-[min(28rem,70vh)] divide-y overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
