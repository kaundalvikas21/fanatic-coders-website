'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, GetProjectByIdResponse, GetProjectsResponse } from '@/types';

export async function getProjects(): Promise<GetProjectsResponse | ApiResponse> {
  try {
    return await unwrap<GetProjectsResponse>(authApi.get('/api/v1/projects'));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getProjectById(id: string): Promise<GetProjectByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetProjectByIdResponse>(authApi.get(`/api/v1/projects/${id}`));
  } catch (error) {
    return getApiError(error);
  }
}
