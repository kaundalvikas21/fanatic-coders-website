'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, PortfolioResponse } from '@/types';

function revalidatePortfolioImage(id: string) {
  revalidatePath('/dashboard/portfolios');
  revalidatePath(`/dashboard/portfolios/${id}`);
  revalidatePath('/portfolio');
  revalidatePath('/portfolio/[id]', 'page');
}

export async function uploadPortfolioCoverImageById(
  id: string,
  formData: FormData,
): Promise<PortfolioResponse | ApiResponse> {
  try {
    const response = await unwrap<PortfolioResponse>(
      authApi.put(`/api/v1/portfolios/${encodeURIComponent(id)}/cover-image`, formData, {
        timeout: 60_000,
      }),
    );
    revalidatePortfolioImage(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deletePortfolioCoverImageById(
  id: string,
): Promise<PortfolioResponse | ApiResponse> {
  try {
    const response = await unwrap<PortfolioResponse>(
      authApi.delete(`/api/v1/portfolios/${encodeURIComponent(id)}/cover-image`),
    );
    revalidatePortfolioImage(id);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
