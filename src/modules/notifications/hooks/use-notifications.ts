'use client';

import useSWR from 'swr';

import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@/modules/notifications/data/mutations';
import { getNotifications } from '@/modules/notifications/data/queries';
import type { GetNotificationsInput, NotificationsResponse } from '@/modules/notifications/types';

const NOTIFICATIONS_REFRESH_INTERVAL = 5_000;

export function useNotifications(input: GetNotificationsInput = {}) {
  const query = {
    page: input.page ?? 1,
    pageSize: input.pageSize ?? 20,
    unreadOnly: input.unreadOnly ?? false,
  } satisfies GetNotificationsInput;

  const swr = useSWR<NotificationsResponse>(
    ['/api/v1/notifications', query],
    () => getNotifications(query),
    {
      refreshInterval: NOTIFICATIONS_REFRESH_INTERVAL,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      keepPreviousData: true,
    },
  );

  const markAsRead = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    await swr.mutate();
  };

  const markAllAsRead = async () => {
    await markAllNotificationsAsRead();
    await swr.mutate();
  };

  return {
    ...swr,
    notifications: swr.data?.data.items ?? [],
    pagination: swr.data?.data.pagination,
    unreadCount: swr.data?.data.unreadCount ?? 0,
    markAsRead,
    markAllAsRead,
  };
}
