import type { GetBlogsInput } from '@/types';

export type BlogsSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: BlogsSearchParams, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseBlogsSearchParams(params: BlogsSearchParams): GetBlogsInput {
  const status = getParam(params, 'status');
  const rawPage = Number(getParam(params, 'page'));

  return {
    isPublished: status === 'published' ? true : status === 'draft' ? false : undefined,
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: 10,
  };
}
