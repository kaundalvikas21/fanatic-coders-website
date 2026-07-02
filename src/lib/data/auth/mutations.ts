'use server';

import { publicApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
} from '@/types';

export async function requestPasswordReset(
  payload: RequestPasswordResetRequest,
): Promise<RequestPasswordResetResponse | ApiResponse> {
  try {
    return await unwrap<RequestPasswordResetResponse>(
      publicApi.post('/api/v1/auth/request-password-reset', payload),
    );
  } catch (error) {
    return getApiError(error);
  }
}
