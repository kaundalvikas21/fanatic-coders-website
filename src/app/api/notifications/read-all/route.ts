import { authApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { MarkAllNotificationsReadResponse } from '@/modules/notifications/types';

export async function PATCH() {
  try {
    const response = await authApi.patch<MarkAllNotificationsReadResponse>(
      '/api/v1/notifications/read-all',
    );

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
