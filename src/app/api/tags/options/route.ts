import { publicApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { TagOptionsResponse } from '@/types';

export async function GET() {
  try {
    const response = await publicApi.get<TagOptionsResponse>('/api/v1/tags/options');

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
