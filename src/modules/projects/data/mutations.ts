'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateProjectFromServiceRequestRequest,
  CreateProjectFromServiceRequestResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  UpdateProjectByIdRequest,
  UpdateProjectByIdResponse,
} from '@/types';

export async function createProject(
  payload: CreateProjectRequest,
): Promise<CreateProjectResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateProjectResponse>(authApi.post('/api/v1/projects', payload));

    revalidatePath('/dashboard/projects');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function createProjectFromServiceRequest(
  serviceRequestId: string,
  payload: CreateProjectFromServiceRequestRequest,
): Promise<CreateProjectFromServiceRequestResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateProjectFromServiceRequestResponse>(
      authApi.post(`/api/v1/service-requests/${serviceRequestId}/project`, payload),
    );

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/services');
    revalidatePath(`/dashboard/services/${serviceRequestId}`);

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateProjectById(
  id: string,
  payload: UpdateProjectByIdRequest,
): Promise<UpdateProjectByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateProjectByIdResponse>(
      authApi.put(`/api/v1/projects/${id}`, payload),
    );

    revalidatePath('/dashboard/projects');
    revalidatePath(`/dashboard/projects/${id}`);

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
