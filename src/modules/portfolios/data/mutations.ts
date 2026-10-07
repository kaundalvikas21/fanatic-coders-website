'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  DeletePortfolioByIdResponse,
  UpdatePortfolioByIdRequest,
  UpdatePortfolioByIdResponse,
} from '@/types';

function revalidatePortfolios() {
  revalidatePath('/dashboard/portfolios');
  revalidatePath('/dashboard/portfolios/[portfolioId]', 'page');
  revalidatePath('/portfolio');
  revalidatePath('/portfolio/[id]', 'page');
}

export async function createPortfolio(
  payload: CreatePortfolioRequest,
): Promise<CreatePortfolioResponse | ApiResponse> {
  try {
    const response = await unwrap<CreatePortfolioResponse>(
      authApi.post('/api/v1/portfolios', payload),
    );
    revalidatePortfolios();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updatePortfolioById(
  id: string,
  payload: UpdatePortfolioByIdRequest,
): Promise<UpdatePortfolioByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdatePortfolioByIdResponse>(
      authApi.put(`/api/v1/portfolios/${encodeURIComponent(id)}`, payload),
    );
    revalidatePortfolios();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deletePortfolioById(
  id: string,
): Promise<DeletePortfolioByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeletePortfolioByIdResponse>(
      authApi.delete(`/api/v1/portfolios/${encodeURIComponent(id)}`),
    );
    revalidatePortfolios();
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
