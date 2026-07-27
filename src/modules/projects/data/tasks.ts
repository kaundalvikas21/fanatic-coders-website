'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateTaskRequest,
  TaskResponse,
  TasksResponse,
  UpdateTaskRequest,
} from '@/types';

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

export async function createProjectTask(
  projectId: string,
  payload: CreateTaskRequest,
): Promise<TaskResponse | ApiResponse> {
  try {
    const response = await unwrap<TaskResponse>(
      authApi.post(`/api/v1/projects/${projectId}/tasks`, payload),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateTaskById(
  taskId: string,
  projectId: string,
  payload: UpdateTaskRequest,
): Promise<TaskResponse | ApiResponse> {
  try {
    const response = await unwrap<TaskResponse>(authApi.put(`/api/v1/tasks/${taskId}`, payload));

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteTaskById(
  taskId: string,
  projectId: string,
): Promise<TaskResponse | ApiResponse> {
  try {
    const response = await unwrap<TaskResponse>(authApi.delete(`/api/v1/tasks/${taskId}`));

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
