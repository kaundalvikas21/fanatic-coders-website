'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateTagRequest,
  CreateTagResponse,
  DeleteTagByIdResponse,
  UpdateTagByIdRequest,
  UpdateTagByIdResponse,
} from '@/types';

function revalidateTags() {
  revalidatePath('/dashboard/blogs', 'layout');
  revalidatePath('/blog', 'layout');
}

export async function createTag(
  payload: CreateTagRequest,
): Promise<CreateTagResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateTagResponse>(authApi.post('/api/v1/tags', payload));
    revalidateTags();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateTagById(
  id: string,
  payload: UpdateTagByIdRequest,
): Promise<UpdateTagByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateTagByIdResponse>(
      authApi.put(`/api/v1/tags/${encodeURIComponent(id)}`, payload),
    );
    revalidateTags();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteTagById(id: string): Promise<DeleteTagByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteTagByIdResponse>(
      authApi.delete(`/api/v1/tags/${encodeURIComponent(id)}`),
    );
    revalidateTags();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
