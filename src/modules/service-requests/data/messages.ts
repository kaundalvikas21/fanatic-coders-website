'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  CreateServiceRequestMessageRequest,
  ServiceRequestMessageResponse,
  ServiceRequestMessagesResponse,
} from '@/types';

export async function getServiceRequestMessages(
  serviceRequestId: string,
): Promise<ServiceRequestMessagesResponse> {
  try {
    return await unwrap<ServiceRequestMessagesResponse>(
      authApi.get(`/api/v1/service-requests/${serviceRequestId}/messages`),
    );
  } catch (error) {
    return getApiError(error) as ServiceRequestMessagesResponse;
  }
}

export async function createServiceRequestMessage(
  serviceRequestId: string,
  payload: CreateServiceRequestMessageRequest,
): Promise<ServiceRequestMessageResponse> {
  try {
    const response = await unwrap<ServiceRequestMessageResponse>(
      authApi.post(`/api/v1/service-requests/${serviceRequestId}/messages`, payload),
    );

    revalidatePath(`/dashboard/services/${serviceRequestId}`);

    return response;
  } catch (error) {
    return getApiError(error) as ServiceRequestMessageResponse;
  }
}
