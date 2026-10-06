'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetCategoriesInput,
  GetCategoriesResponse,
  GetCategoryByIdResponse,
} from '@/types';

export async function getCategories(
  filters: GetCategoriesInput = {},
): Promise<GetCategoriesResponse | ApiResponse> {
  try {
    return await unwrap<GetCategoriesResponse>(
      authApi.get('/api/v1/categories', { params: filters }),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getCategoryById(id: string): Promise<GetCategoryByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetCategoryByIdResponse>(
      authApi.get(`/api/v1/categories/${encodeURIComponent(id)}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}
