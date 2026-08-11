'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import type { Notification } from '@/modules/notifications/types';

type UseNotificationPageRefreshInput = {
  notifications: Notification[];
  isLoading: boolean;
};

export function useNotificationPageRefresh({
  notifications,
  isLoading,
}: UseNotificationPageRefreshInput) {
  const pathname = usePathname();
  const router = useRouter();
  const seenNotificationIdsRef = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (seenNotificationIdsRef.current === null) {
      seenNotificationIdsRef.current = new Set(
        notifications.map((notification) => notification.id),
      );
      return;
    }

    const newNotifications = notifications.filter(
      (notification) => !seenNotificationIdsRef.current?.has(notification.id),
    );

    notifications.forEach((notification) => {
      seenNotificationIdsRef.current?.add(notification.id);
    });

    // Refresh server data when a new notification affects the page currently being viewed.
    if (newNotifications.some((notification) => notification.link === pathname)) {
      router.refresh();
    }
  }, [isLoading, notifications, pathname, router]);
}
