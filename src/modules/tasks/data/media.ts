'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { GetProjectMediaInput, ProjectMediaListResponse, ProjectMediaResponse } from '@/types';

const taskPath = (projectId: string, taskId: string) =>
  `/dashboard/projects/${projectId}/tasks/${taskId}`;

export async function uploadTaskMedia(
  projectId: string,
  taskId: string,
  formData: FormData,
): Promise<ProjectMediaResponse> {
  try {
    const response = await unwrap<ProjectMediaResponse>(
      authApi.post(`/api/v1/tasks/${encodeURIComponent(taskId)}/media`, formData, {
        timeout: 60_000,
      }),
    );
    revalidatePath(taskPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as ProjectMediaResponse;
  }
}

export async function getTaskMedia(
  taskId: string,
  filters: GetProjectMediaInput = {},
): Promise<ProjectMediaListResponse> {
  try {
    return await unwrap<ProjectMediaListResponse>(
      authApi.get(`/api/v1/tasks/${encodeURIComponent(taskId)}/media`, { params: filters }),
    );
  } catch (error) {
    return getApiError(error) as ProjectMediaListResponse;
  }
}

export async function deleteTaskMedia(
  projectId: string,
  taskId: string,
  mediaId: string,
): Promise<ProjectMediaResponse> {
  try {
    const response = await unwrap<ProjectMediaResponse>(
      authApi.delete(
        `/api/v1/tasks/${encodeURIComponent(taskId)}/media/${encodeURIComponent(mediaId)}`,
        { timeout: 60_000 },
      ),
    );
    revalidatePath(taskPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as ProjectMediaResponse;
  }
}
