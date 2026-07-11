'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateServiceRequestRequest,
  CreateServiceRequestResponse,
} from '@/types';

export async function createServiceRequest(
  payload: CreateServiceRequestRequest,
): Promise<CreateServiceRequestResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateServiceRequestResponse>(
      authApi.post('/api/v1/service-requests', payload),
    );

    revalidatePath('/dashboard/client/service-requests');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
