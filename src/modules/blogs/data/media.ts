'use server';

import { revalidatePath } from 'next/cache';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  DeleteBlogFeatureImageByIdParams,
  DeleteBlogFeatureImageByIdResponse,
  UpdateBlogFeatureImageByIdParams,
  UpdateBlogFeatureImageByIdResponse,
} from '@/types';

function revalidateBlogImage(id: string) {
  revalidatePath('/dashboard/blogs');
  revalidatePath(`/dashboard/blogs/${id}`);
  revalidatePath('/blog', 'layout');
}

export async function uploadBlogFeatureImageById(
  id: UpdateBlogFeatureImageByIdParams['id'],
  formData: FormData,
): Promise<UpdateBlogFeatureImageByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateBlogFeatureImageByIdResponse>(
      authApi.put(`/api/v1/blogs/${encodeURIComponent(id)}/feature-image`, formData, {
        timeout: 60_000,
      }),
    );
    revalidateBlogImage(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteBlogFeatureImageById(
  id: DeleteBlogFeatureImageByIdParams['id'],
): Promise<DeleteBlogFeatureImageByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteBlogFeatureImageByIdResponse>(
      authApi.delete(`/api/v1/blogs/${encodeURIComponent(id)}/feature-image`),
    );
    revalidateBlogImage(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
