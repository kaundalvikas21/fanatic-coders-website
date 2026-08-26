'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetTaskCommentsInput,
  Task,
  TaskCommentsResponse,
  TasksResponse,
} from '@/types';

export async function getProjectTasks(projectId: string): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get(`/api/v1/projects/${projectId}/tasks`));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getProjectTaskById(projectId: string, taskId: string): Promise<Task | null> {
  const response = await getProjectTasks(projectId);

  if (!response.success || !Array.isArray(response.data)) {
    return null;
  }

  return (
    (response.data as Task[]).find((task) => task.id === taskId && task.projectId === projectId) ??
    null
  );
}

export async function getTasks(): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get('/api/v1/tasks'));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getTaskComments(
  taskId: string,
  query: GetTaskCommentsInput = {},
): Promise<TaskCommentsResponse> {
  try {
    return await unwrap<TaskCommentsResponse>(
      authApi.get(`/api/v1/tasks/${encodeURIComponent(taskId)}/comments`, { params: query }),
    );
  } catch (error) {
    return getApiError(error) as TaskCommentsResponse;
  }
}
