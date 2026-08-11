import 'server-only';

import axios, { type AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

import { ApiResponse } from '@/utils/api-response';

export function createProxyResponse(response: AxiosResponse) {
  return NextResponse.json(response.data, { status: response.status });
}

export function createProxyErrorResponse(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    return NextResponse.json(error.response.data, {
      status: error.response.status,
    });
  }

  return NextResponse.json(
    ApiResponse({
      success: false,
      status: 502,
      message: 'Could not reach the backend service.',
      error: { code: 'BACKEND_UNAVAILABLE' },
    }),
    { status: 502 },
  );
}
