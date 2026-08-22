'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  AddOnTaskResponse,
  ApiResponse,
  CreateAddOnTaskRequest,
  CreateTaskRequest,
  TaskResponse,
  UpdateAddOnTaskRequest,
  UpdateTaskRequest,
} from '@/types';

export async function createTaskAddOn(
  taskId: string,
  projectId: string,
  payload: CreateAddOnTaskRequest,
): Promise<AddOnTaskResponse | ApiResponse> {
  try {
    const response = await unwrap<AddOnTaskResponse>(
      authApi.post(`/api/v1/tasks/${taskId}/addon`, payload),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
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

export async function updateTaskAddOnById(
  taskId: string,
  addOnTaskId: string,
  projectId: string,
  payload: UpdateAddOnTaskRequest,
): Promise<AddOnTaskResponse | ApiResponse> {
  try {
    const response = await unwrap<AddOnTaskResponse>(
      authApi.put(`/api/v1/tasks/${taskId}/addon/${addOnTaskId}`, payload),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteTaskAddOnById(
  taskId: string,
  addOnTaskId: string,
  projectId: string,
): Promise<AddOnTaskResponse | ApiResponse> {
  try {
    const response = await unwrap<AddOnTaskResponse>(
      authApi.delete(`/api/v1/tasks/${taskId}/addon/${addOnTaskId}`),
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard/tasks');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
