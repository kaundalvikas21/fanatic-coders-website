'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetTaskCommentsInput,
  TaskCommentsResponse,
  TaskResponse,
  TaskStatsResponse,
  TasksResponse,
} from '@/types';

export async function getProjectTasks(projectId: string): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get(`/api/v1/projects/${projectId}/tasks`));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getTaskById(taskId: string): Promise<TaskResponse> {
  try {
    return await unwrap<TaskResponse>(authApi.get(`/api/v1/tasks/${encodeURIComponent(taskId)}`));
  } catch (error) {
    return getApiError(error) as TaskResponse;
  }
}

export async function getTasks(): Promise<TasksResponse | ApiResponse> {
  try {
    return await unwrap<TasksResponse>(authApi.get('/api/v1/tasks'));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getTasksByMemberId(memberId: string): Promise<TasksResponse> {
  try {
    return await unwrap<TasksResponse>(
      authApi.get(`/api/v1/tasks/member/${encodeURIComponent(memberId)}`),
    );
  } catch (error) {
    return getApiError(error) as TasksResponse;
  }
}

export async function getTaskStatsByMemberId(memberId: string): Promise<TaskStatsResponse> {
  try {
    return await unwrap<TaskStatsResponse>(
      authApi.get(`/api/v1/tasks/member/${encodeURIComponent(memberId)}/stats`),
    );
  } catch (error) {
    return getApiError(error) as TaskStatsResponse;
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
