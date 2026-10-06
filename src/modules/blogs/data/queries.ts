'use server';

import { authApi, publicApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetBlogByIdResponse,
  GetBlogsInput,
  GetBlogsResponse,
  GetPublishedBlogBySlugResponse,
  GetPublishedBlogsInput,
  GetPublishedBlogsResponse,
} from '@/types';

export async function getBlogs(
  filters: GetBlogsInput = {},
): Promise<GetBlogsResponse | ApiResponse> {
  try {
    return await unwrap<GetBlogsResponse>(authApi.get('/api/v1/blogs', { params: filters }));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getBlogById(id: string): Promise<GetBlogByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetBlogByIdResponse>(
      authApi.get(`/api/v1/blogs/${encodeURIComponent(id)}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getPublishedBlogs(
  filters: GetPublishedBlogsInput = {},
): Promise<GetPublishedBlogsResponse | ApiResponse> {
  try {
    return await unwrap<GetPublishedBlogsResponse>(
      publicApi.get('/api/v1/blogs/published', { params: filters }),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getPublishedBlogBySlug(
  slug: string,
): Promise<GetPublishedBlogBySlugResponse | ApiResponse> {
  try {
    return await unwrap<GetPublishedBlogBySlugResponse>(
      publicApi.get(`/api/v1/blogs/published/${encodeURIComponent(slug)}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}
