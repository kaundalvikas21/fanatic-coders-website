'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryByIdResponse,
  UpdateCategoryByIdRequest,
  UpdateCategoryByIdResponse,
} from '@/types';

function revalidateCategories() {
  revalidatePath('/dashboard/blogs', 'layout');
  revalidatePath('/blog', 'layout');
}

export async function createCategory(
  payload: CreateCategoryRequest,
): Promise<CreateCategoryResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateCategoryResponse>(
      authApi.post('/api/v1/categories', payload),
    );
    revalidateCategories();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateCategoryById(
  id: string,
  payload: UpdateCategoryByIdRequest,
): Promise<UpdateCategoryByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateCategoryByIdResponse>(
      authApi.put(`/api/v1/categories/${encodeURIComponent(id)}`, payload),
    );
    revalidateCategories();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteCategoryById(
  id: string,
): Promise<DeleteCategoryByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteCategoryByIdResponse>(
      authApi.delete(`/api/v1/categories/${encodeURIComponent(id)}`),
    );
    revalidateCategories();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
