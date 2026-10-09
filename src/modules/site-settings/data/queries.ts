'use server';

import { publicApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, GetSiteSettingResponse } from '@/types';

export async function getSiteSetting(): Promise<GetSiteSettingResponse | ApiResponse> {
  try {
    return await unwrap<GetSiteSettingResponse>(publicApi.get('/api/v1/site-settings'));
  } catch (error) {
    return getApiError(error);
  }
}
