'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, GetPaymentsInput, GetPaymentsResponse } from '@/types';

export async function getPayments(
  filters: GetPaymentsInput = {},
): Promise<GetPaymentsResponse | ApiResponse> {
  try {
    return await unwrap<GetPaymentsResponse>(authApi.get('/api/v1/payments', { params: filters }));
  } catch (error) {
    return getApiError(error);
  }
}
