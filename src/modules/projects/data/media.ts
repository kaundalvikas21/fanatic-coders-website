'use server';

import { revalidatePath } from 'next/cache';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { GetProjectMediaInput, ProjectMediaListResponse, ProjectMediaResponse } from '@/types';

export async function uploadProjectMedia(
  projectId: string,
  formData: FormData,
): Promise<ProjectMediaResponse> {
  try {
    const response = await unwrap<ProjectMediaResponse>(
      authApi.post(`/api/v1/projects/${encodeURIComponent(projectId)}/media`, formData, {
        timeout: 60_000,
      }),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);

    return response;
  } catch (error) {
    return getApiError(error) as ProjectMediaResponse;
  }
}

export async function getProjectMedia(
  projectId: string,
  filters: GetProjectMediaInput = {},
): Promise<ProjectMediaListResponse> {
  try {
    return await unwrap<ProjectMediaListResponse>(
      authApi.get(`/api/v1/projects/${encodeURIComponent(projectId)}/media`, {
        params: filters,
      }),
    );
  } catch (error) {
    return getApiError(error) as ProjectMediaListResponse;
  }
}

export async function deleteProjectMedia(
  projectId: string,
  mediaId: string,
): Promise<ProjectMediaResponse> {
  try {
    const response = await unwrap<ProjectMediaResponse>(
      authApi.delete(
        `/api/v1/projects/${encodeURIComponent(projectId)}/media/${encodeURIComponent(mediaId)}`,
        {
          timeout: 60_000,
        },
      ),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);

    return response;
  } catch (error) {
    return getApiError(error) as ProjectMediaResponse;
  }
}
