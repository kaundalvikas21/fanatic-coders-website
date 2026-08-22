'use server';

import { cache } from 'react';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetServiceRequestsInput,
  GetServiceRequestByIdResponse,
  GetServiceRequestsResponse,
} from '@/types';

const getAllServiceRequests = cache(async (): Promise<GetServiceRequestsResponse | ApiResponse> => {
  try {
    return await unwrap<GetServiceRequestsResponse>(authApi.get('/api/v1/service-requests'));
  } catch (error) {
    return getApiError(error);
  }
});

/**
 * Fetch service requests visible to the signed-in client.
 */
export async function getServiceRequests(
  filters: GetServiceRequestsInput = {},
): Promise<GetServiceRequestsResponse | ApiResponse> {
  const hasFilters = Boolean(filters.client || filters.status || filters.serviceType);

  if (!hasFilters) {
    return getAllServiceRequests();
  }

  try {
    return await unwrap<GetServiceRequestsResponse>(
      authApi.get('/api/v1/service-requests', { params: filters }),
    );
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
