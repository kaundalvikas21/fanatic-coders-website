'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, PortfolioAddonResponse, PortfolioAddonWriteRequest } from '@/types';

function revalidatePortfolioPages() {
  revalidatePath('/dashboard/portfolios');
  revalidatePath('/dashboard/portfolios/[portfolioId]', 'page');
  revalidatePath('/portfolio');
  revalidatePath('/portfolio/[id]', 'page');
}

export async function createPortfolioAddon(
  portfolioId: string,
  payload: PortfolioAddonWriteRequest,
): Promise<PortfolioAddonResponse | ApiResponse> {
  try {
    const response = await unwrap<PortfolioAddonResponse>(
      authApi.post(`/api/v1/portfolios/${encodeURIComponent(portfolioId)}/addons`, payload),
    );
    revalidatePortfolioPages();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updatePortfolioAddon(
  portfolioId: string,
  addonId: string,
  payload: PortfolioAddonWriteRequest,
): Promise<PortfolioAddonResponse | ApiResponse> {
  try {
    const response = await unwrap<PortfolioAddonResponse>(
      authApi.put(
        `/api/v1/portfolios/${encodeURIComponent(portfolioId)}/addons/${encodeURIComponent(addonId)}`,
        payload,
      ),
    );
    revalidatePortfolioPages();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deletePortfolioAddon(
  portfolioId: string,
  addonId: string,
): Promise<PortfolioAddonResponse | ApiResponse> {
  try {
    const response = await unwrap<PortfolioAddonResponse>(
      authApi.delete(
        `/api/v1/portfolios/${encodeURIComponent(portfolioId)}/addons/${encodeURIComponent(addonId)}`,
      ),
    );
    revalidatePortfolioPages();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
