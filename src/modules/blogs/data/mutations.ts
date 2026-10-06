'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateBlogRequest,
  CreateBlogResponse,
  DeleteBlogByIdResponse,
  UpdateBlogByIdRequest,
  UpdateBlogByIdResponse,
} from '@/types';

function revalidateBlogs(id?: string) {
  revalidatePath('/dashboard/blogs');
  if (id) revalidatePath(`/dashboard/blogs/${id}`);
  revalidatePath('/blog', 'layout');
}

export async function createBlog(
  payload: CreateBlogRequest,
): Promise<CreateBlogResponse | ApiResponse> {
  try {
    const response = await unwrap<CreateBlogResponse>(authApi.post('/api/v1/blogs', payload));
    revalidateBlogs();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateBlogById(
  id: string,
  payload: UpdateBlogByIdRequest,
): Promise<UpdateBlogByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateBlogByIdResponse>(
      authApi.put(`/api/v1/blogs/${encodeURIComponent(id)}`, payload),
    );
    revalidateBlogs(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteBlogById(id: string): Promise<DeleteBlogByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteBlogByIdResponse>(
      authApi.delete(`/api/v1/blogs/${encodeURIComponent(id)}`),
    );
    revalidateBlogs(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
