'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateServiceRequestRequest,
  CreateServiceRequestResponse,
  UpdateServiceRequestByIdRequest,
  UpdateServiceRequestByIdResponse,
} from '@/types';

export async function createServiceRequest(
  payload: CreateServiceRequestRequest,
): Promise<CreateServiceRequestResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateServiceRequestResponse>(
      authApi.post('/api/v1/service-requests', payload),
    );

    revalidatePath('/dashboard/services');
    revalidatePath('/dashboard/services/new');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateServiceRequestById(
  id: string,
  payload: UpdateServiceRequestByIdRequest,
): Promise<UpdateServiceRequestByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateServiceRequestByIdResponse>(
      authApi.put(`/api/v1/service-requests/${id}`, payload),
    );

    revalidatePath('/dashboard/services');
    revalidatePath(`/dashboard/services/${id}`);

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
