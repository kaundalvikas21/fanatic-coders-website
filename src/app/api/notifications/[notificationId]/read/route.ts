import { authApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { NotificationResponse } from '@/modules/notifications/types';

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ notificationId: string }> },
) {
  const { notificationId } = await params;

  try {
    const response = await authApi.patch<NotificationResponse>(
      `/api/v1/notifications/${encodeURIComponent(notificationId)}/read`,
    );

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
