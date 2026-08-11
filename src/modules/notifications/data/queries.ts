import axios from 'axios';

import { unwrap } from '@/lib/axios/utils';
import type { GetNotificationsInput, NotificationsResponse } from '@/modules/notifications/types';

export function getNotifications(input: GetNotificationsInput = {}) {
  return unwrap(
    axios.get<NotificationsResponse>('/api/notifications', {
      params: input,
    }),
  );
}
