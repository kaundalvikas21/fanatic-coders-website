import type { GetPortfoliosInput } from '@/types';

export type PortfoliosSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: PortfoliosSearchParams, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parsePortfoliosSearchParams(params: PortfoliosSearchParams): GetPortfoliosInput {
  const title = getParam(params, 'title')?.trim();
  const status = getParam(params, 'status');
  const rawPage = Number(getParam(params, 'page'));

  return {
    title: title || undefined,
    isPublished: status === 'published' ? true : status === 'draft' ? false : undefined,
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: 10,
  };
}
