'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  GetNewsletterSubscriptionsInput,
  GetNewsletterSubscriptionsResponse,
} from '@/types';

/**
 * Get newsletter subscriptions.
 * Requires newsletter:read permission in the active organization.
 */
export async function getNewsletterSubscriptions(
  filters: GetNewsletterSubscriptionsInput = {},
): Promise<GetNewsletterSubscriptionsResponse | ApiResponse> {
  try {
    return await unwrap<GetNewsletterSubscriptionsResponse>(
      authApi.get('/api/v1/newsletter/subscriptions', {
        params: filters,
      }),
    );
  } catch (error) {
    return getApiError(error);
  }
}
