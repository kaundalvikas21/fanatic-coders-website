import type { GetTagsInput } from '@/types';

export type TagsSearchParams = Record<string, string | string[] | undefined>;

export function parseTagsSearchParams(params: TagsSearchParams): GetTagsInput {
  const value = params.page;
  const rawPage = Number(Array.isArray(value) ? value[0] : value);
  return { page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1, pageSize: 10 };
}
