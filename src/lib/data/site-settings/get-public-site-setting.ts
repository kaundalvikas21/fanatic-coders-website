import 'server-only';

import { cache } from 'react';
import { publicApi } from '@/lib/axios/client';
import { unwrap } from '@/lib/axios/utils';
import type { GetSiteSettingResponse, SiteSetting } from '@/types';

export const getSiteSettingData = cache(async (): Promise<SiteSetting | null> => {
  const response = await unwrap<GetSiteSettingResponse>(publicApi.get('/api/v1/site-settings'));
  if (!response.success) throw new Error('Could not load site settings.');
  return response.data;
});

export const getPublicSiteSetting = cache(async (): Promise<SiteSetting | null> => {
  try {
    return await getSiteSettingData();
  } catch {
    // Keep public pages available while contact settings or the API are unavailable.
    return null;
  }
});
