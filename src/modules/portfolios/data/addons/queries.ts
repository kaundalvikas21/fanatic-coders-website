'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, PortfolioAddonResponse } from '@/types';

export async function getPortfolioAddon(
  portfolioId: string,
  addonId: string,
): Promise<PortfolioAddonResponse | ApiResponse> {
  try {
    return await unwrap<PortfolioAddonResponse>(
      authApi.get(
        `/api/v1/portfolios/${encodeURIComponent(portfolioId)}/addons/${encodeURIComponent(addonId)}`,
      ),
    );
  } catch (error) {
    return getApiError(error);
  }
}
