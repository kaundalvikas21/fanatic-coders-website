'use server';

import { authApi, publicApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import { normalizePublicPortfolioPage } from '@/modules/portfolios/utils/normalize-public-portfolio';
import type {
  ApiResponse,
  GetPortfolioByIdResponse,
  GetPortfoliosInput,
  GetPortfoliosResponse,
  GetPublishedPortfolioBySlugResponse,
  GetPublishedPortfoliosInput,
  GetPublishedPortfoliosResponse,
  Portfolio,
} from '@/types';

export async function getPortfolios(
  filters: GetPortfoliosInput = {},
): Promise<GetPortfoliosResponse | ApiResponse> {
  try {
    return await unwrap<GetPortfoliosResponse>(
      authApi.get('/api/v1/portfolios', { params: filters }),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getPortfolioById(
  id: string,
): Promise<GetPortfolioByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetPortfolioByIdResponse>(
      authApi.get(`/api/v1/portfolios/${encodeURIComponent(id)}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getPublishedPortfolios(
  filters: GetPublishedPortfoliosInput = {},
): Promise<GetPublishedPortfoliosResponse | ApiResponse> {
  try {
    return await unwrap<GetPublishedPortfoliosResponse>(
      publicApi.get('/api/v1/portfolios/published', { params: filters }),
    );
  } catch (error) {
    return getApiError(error);
  }
}

export async function getAllPublishedPortfolios(): Promise<Portfolio[] | null> {
  const firstResponse = await getPublishedPortfolios({ page: 1, pageSize: 100 });
  const firstPage = firstResponse.success ? normalizePublicPortfolioPage(firstResponse.data) : null;
  if (!firstPage) return null;

  const remainingResponses = await Promise.all(
    Array.from({ length: Math.max(firstPage.totalPages - 1, 0) }, (_, index) =>
      getPublishedPortfolios({ page: index + 2, pageSize: 100 }),
    ),
  );
  const remainingPages = remainingResponses.map((response) =>
    response.success ? normalizePublicPortfolioPage(response.data) : null,
  );
  if (remainingPages.some((page) => page === null)) return null;

  return [...firstPage.portfolios, ...remainingPages.flatMap((page) => page?.portfolios ?? [])];
}

export async function getPublishedPortfolioBySlug(
  slug: string,
): Promise<GetPublishedPortfolioBySlugResponse | ApiResponse> {
  try {
    return await unwrap<GetPublishedPortfolioBySlugResponse>(
      publicApi.get(`/api/v1/portfolios/published/${encodeURIComponent(slug)}`),
    );
  } catch (error) {
    return getApiError(error);
  }
}
