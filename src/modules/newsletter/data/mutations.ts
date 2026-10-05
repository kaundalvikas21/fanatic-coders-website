import axios from 'axios';

import { env } from '@/config/env';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateNewsletterSubscriptionRequest,
  CreateNewsletterSubscriptionResponse,
} from '@/types';

export async function createNewsletterSubscription(
  payload: CreateNewsletterSubscriptionRequest,
): Promise<CreateNewsletterSubscriptionResponse | ApiResponse> {
  try {
    return await unwrap<CreateNewsletterSubscriptionResponse>(
      axios.post(`${env.NEXT_PUBLIC_API_URL}/api/v1/newsletter/subscriptions`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15_000,
      }),
    );
  } catch (error) {
    return getApiError(error);
  }
}
