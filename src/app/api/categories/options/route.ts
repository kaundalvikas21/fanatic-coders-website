import { publicApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { CategoryOptionsResponse } from '@/types';

export async function GET() {
  try {
    const response = await publicApi.get<CategoryOptionsResponse>('/api/v1/categories/options');

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
