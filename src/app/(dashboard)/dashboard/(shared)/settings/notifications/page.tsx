'use client';

import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, Inbox, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useNotifications, type Notification } from '@/modules/notifications';

const PAGE_SIZE = 10;

type NotificationRowProps = {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
};

function NotificationRow({ notification, onMarkAsRead }: NotificationRowProps) {
  const isUnread = notification.readAt === null;
  const className = cn(
    'flex w-full gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
    isUnread && 'bg-primary/5',
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn('mt-2 size-2 shrink-0 rounded-full bg-transparent', isUnread && 'bg-primary')}
      />
      <span className="min-w-0 flex-1">
        <span className={cn('block text-sm', isUnread && 'font-semibold')}>
          {notification.title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {notification.message}
        </span>
        <span className="mt-2 block text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </span>
      </span>
      {isUnread && (
        <span className="mt-1 shrink-0 text-xs font-medium text-primary">Mark read</span>
      )}
    </>
  );

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        className={className}
        onClick={() => {
          if (isUnread) onMarkAsRead(notification.id);
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
        if (isUnread) onMarkAsRead(notification.id);
      }}
    >
      {content}
    </button>
  );
}

function NotificationListSkeleton() {
  return (
    <div className="divide-y">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 px-5 py-4"
        >
          <Skeleton className="mt-2 size-2 rounded-full" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-full max-w-xl" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default function NotificationSettings() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const {
    notifications,
    pagination,
    unreadCount,
    error,
    isLoading,
    isValidating,
    markAsRead,
    markAllAsRead,
    mutate,
  } = useNotifications({ page, pageSize: PAGE_SIZE, unreadOnly });
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  function handleMarkAsRead(notificationId: string) {
    // Keep the list and header count in sync after the user acknowledges an update.
    void markAsRead(notificationId).catch(() => {
      toast.error('Could not mark notification as read.');
    });
  }

  async function handleMarkAllAsRead() {
    setIsMarkingAll(true);

    try {
      // Clear unread state across the workspace so the settings list matches the header menu.
      await markAllAsRead();
      setPage(1);
    } catch {
      toast.error('Could not mark all notifications as read.');
    } finally {
      setIsMarkingAll(false);
    }
  }

  return (
    <WidgetCard
      icon={Bell}
      title="Notifications"
      description="Review task assignments and workspace updates."
      contentClassNames="p-0"
      actionSlot={
        <Button
          variant="outline"
          size="sm"
          disabled={unreadCount === 0 || isMarkingAll}
          onClick={() => void handleMarkAllAsRead()}
        >
          <CheckCheck />
          Mark all read
        </Button>
      }
    >
      <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={unreadOnly ? 'ghost' : 'secondary'}
            size="sm"
            onClick={() => {
              setUnreadOnly(false);
              setPage(1);
            }}
          >
            All
          </Button>
          <Button
            type="button"
            variant={unreadOnly ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              setUnreadOnly(true);
              setPage(1);
            }}
          >
            Unread
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
        </p>
      </div>

      {isLoading ? (
        <NotificationListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
          <p className="text-sm font-medium">Could not load notifications</p>
          <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
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
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <Inbox className="mb-3 size-9 text-muted-foreground" />
          <p className="text-sm font-medium">
            {unreadOnly ? 'No unread notifications' : 'No notifications yet'}
          </p>
          <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
            {unreadOnly
              ? 'You have reviewed every notification.'
              : 'Task assignments and project updates will appear here.'}
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {notifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && pagination && pagination.totalItems > 0 && (
        <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-sm text-muted-foreground"
            aria-live="polite"
          >
            {pagination.totalItems} notifications · Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1 || isValidating}
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isValidating}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </WidgetCard>
  );
}
