import type { NextRequest } from 'next/server';

import { authApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { NotificationsResponse } from '@/modules/notifications/types';

export async function GET(request: NextRequest) {
  try {
    const response = await authApi.get<NotificationsResponse>('/api/v1/notifications', {
      params: request.nextUrl.searchParams,
    });

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
