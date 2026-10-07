'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, GetTagsInput, GetTagsResponse, GetTagByIdResponse } from '@/types';

export async function getTags(filters: GetTagsInput = {}): Promise<GetTagsResponse | ApiResponse> {
  try {
    return await unwrap<GetTagsResponse>(authApi.get('/api/v1/tags', { params: filters }));
  } catch (error) {
    return getApiError(error);
  }
}

export async function getTagById(id: string): Promise<GetTagByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetTagByIdResponse>(authApi.get(`/api/v1/tags/${encodeURIComponent(id)}`));
  } catch (error) {
    return getApiError(error);
  }
}
