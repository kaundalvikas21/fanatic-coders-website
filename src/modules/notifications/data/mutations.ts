import axios from 'axios';

import { unwrap } from '@/lib/axios/utils';
import type {
  MarkAllNotificationsReadResponse,
  NotificationResponse,
} from '@/modules/notifications/types';

export function markNotificationAsRead(notificationId: string) {
  return unwrap(
    axios.patch<NotificationResponse>(
      `/api/notifications/${encodeURIComponent(notificationId)}/read`,
    ),
  );
}

export function markAllNotificationsAsRead() {
  return unwrap(axios.patch<MarkAllNotificationsReadResponse>('/api/notifications/read-all'));
}
