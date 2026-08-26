'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import { getTaskDetailPath } from '@/modules/tasks/utils/task-path';
import type {
  AddOnTaskResponse,
  ApiResponse,
  CreateAddOnTaskRequest,
  CreateTaskCommentRequest,
  CreateTaskRequest,
  TaskResponse,
  TaskCommentResponse,
  UpdateAddOnTaskRequest,
  UpdateTaskCommentRequest,
  UpdateTaskRequest,
} from '@/types';

export async function createTaskComment(
  projectId: string,
  taskId: string,
  payload: CreateTaskCommentRequest,
): Promise<TaskCommentResponse> {
  try {
    const response = await unwrap<TaskCommentResponse>(
      authApi.post(`/api/v1/tasks/${encodeURIComponent(taskId)}/comments`, payload),
    );
    revalidatePath(getTaskDetailPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as TaskCommentResponse;
  }
}

export async function updateTaskComment(
  projectId: string,
  taskId: string,
  commentId: string,
  payload: UpdateTaskCommentRequest,
): Promise<TaskCommentResponse> {
  try {
    const response = await unwrap<TaskCommentResponse>(
      authApi.put(
        `/api/v1/tasks/${encodeURIComponent(taskId)}/comments/${encodeURIComponent(commentId)}`,
        payload,
      ),
    );
    revalidatePath(getTaskDetailPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as TaskCommentResponse;
  }
}

export async function deleteTaskComment(
  projectId: string,
  taskId: string,
  commentId: string,
): Promise<TaskCommentResponse> {
  try {
    const response = await unwrap<TaskCommentResponse>(
      authApi.delete(
        `/api/v1/tasks/${encodeURIComponent(taskId)}/comments/${encodeURIComponent(commentId)}`,
      ),
    );
    revalidatePath(getTaskDetailPath(projectId, taskId));
    return response;
  } catch (error) {
    return getApiError(error) as TaskCommentResponse;
  }
}

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
