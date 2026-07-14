'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetServiceRequestByIdResponse,
  GetServiceRequestsResponse,
} from '@/types';

/**
 * Fetch service requests visible to the signed-in client.
 */
export async function getServiceRequests(): Promise<GetServiceRequestsResponse | ApiResponse> {
  try {
    return await unwrap<GetServiceRequestsResponse>(authApi.get('/api/v1/service-requests'));
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Fetch one service request by ID for the signed-in client.
 */
export async function getServiceRequestById(
  id: string,
): Promise<GetServiceRequestByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetServiceRequestByIdResponse>(
      authApi.get(`/api/v1/service-requests/${id}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}
