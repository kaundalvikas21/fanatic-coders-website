import { authApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { ProjectOptionsResponse } from '@/types';

export async function GET() {
  try {
    const response = await authApi.get<ProjectOptionsResponse>('/api/v1/projects/options');

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
