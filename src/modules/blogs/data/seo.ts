'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  DeleteBlogSeoByBlogIdParams,
  DeleteBlogSeoByBlogIdResponse,
  GetBlogSeoByBlogIdParams,
  GetBlogSeoByBlogIdResponse,
  UpsertBlogSeoByBlogIdParams,
  UpsertBlogSeoByBlogIdRequest,
  UpsertBlogSeoByBlogIdResponse,
} from '@/types';

function revalidateBlogSeo(id: string) {
  revalidatePath(`/dashboard/blogs/${id}`);
  revalidatePath('/blog', 'layout');
}

export async function getBlogSeoByBlogId(
  id: GetBlogSeoByBlogIdParams['id'],
): Promise<GetBlogSeoByBlogIdResponse | ApiResponse> {
  try {
    return await unwrap<GetBlogSeoByBlogIdResponse>(
      authApi.get(`/api/v1/blogs/${encodeURIComponent(id)}/seo`),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function upsertBlogSeoByBlogId(
  id: UpsertBlogSeoByBlogIdParams['id'],
  payload: UpsertBlogSeoByBlogIdRequest,
): Promise<UpsertBlogSeoByBlogIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpsertBlogSeoByBlogIdResponse>(
      authApi.put(`/api/v1/blogs/${encodeURIComponent(id)}/seo`, payload),
    );
    revalidateBlogSeo(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteBlogSeoByBlogId(
  id: DeleteBlogSeoByBlogIdParams['id'],
): Promise<DeleteBlogSeoByBlogIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteBlogSeoByBlogIdResponse>(
      authApi.delete(`/api/v1/blogs/${encodeURIComponent(id)}/seo`),
    );
    revalidateBlogSeo(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
