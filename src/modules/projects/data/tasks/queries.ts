'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, TasksResponse } from '@/types';

export async function getProjectTasks(projectId: string): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get(`/api/v1/projects/${projectId}/tasks`));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getTasks(): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get('/api/v1/tasks'));
  } catch (error) {
    return getApiError(error);
  }
}
