import axios, { type AxiosResponse } from 'axios';

import type { ApiResponse } from '@/types';

export async function unwrap<TData>(request: Promise<AxiosResponse<TData>>) {
  const response = await request;
  return response.data;
}

export function getApiError(error: unknown): ApiResponse {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data as ApiResponse;
  }

  throw error;
}
