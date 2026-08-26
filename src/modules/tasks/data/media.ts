'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { GetTaskMediaInput, TaskMediaListResponse, TaskMediaResponse } from '@/types';

const taskPath = (projectId: string, taskId: string) =>
  `/dashboard/projects/${projectId}/tasks/${taskId}`;

export async function uploadTaskMedia(
  projectId: string,
  taskId: string,
  formData: FormData,
): Promise<TaskMediaResponse> {
  try {
    const response = await unwrap<TaskMediaResponse>(
      authApi.post(`/api/v1/tasks/${encodeURIComponent(taskId)}/media`, formData, {
        timeout: 60_000,
      }),
    );
    revalidatePath(taskPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as TaskMediaResponse;
  }
}

export async function getTaskMedia(
  taskId: string,
  filters: GetTaskMediaInput = {},
): Promise<TaskMediaListResponse> {
  try {
    return await unwrap<TaskMediaListResponse>(
      authApi.get(`/api/v1/tasks/${encodeURIComponent(taskId)}/media`, { params: filters }),
    );
  } catch (error) {
    return getApiError(error) as TaskMediaListResponse;
  }
}

export async function deleteTaskMedia(
  projectId: string,
  taskId: string,
  mediaId: string,
): Promise<TaskMediaResponse> {
  try {
    const response = await unwrap<TaskMediaResponse>(
      authApi.delete(
        `/api/v1/tasks/${encodeURIComponent(taskId)}/media/${encodeURIComponent(mediaId)}`,
        { timeout: 60_000 },
      ),
    );
    revalidatePath(taskPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as TaskMediaResponse;
  }
}
