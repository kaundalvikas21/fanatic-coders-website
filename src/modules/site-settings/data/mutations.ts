'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, UpdateSiteSettingRequest, UpdateSiteSettingResponse } from '@/types';

export async function updateSiteSetting(
  payload: UpdateSiteSettingRequest,
): Promise<UpdateSiteSettingResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateSiteSettingResponse>(
      authApi.put('/api/v1/site-settings', payload),
    );

    // Refresh public pages so edited contact details appear across the site.
    revalidatePath('/(frontend)', 'layout');
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
