import type { GetCategoriesInput } from '@/types';

export type CategoriesSearchParams = Record<string, string | string[] | undefined>;

export function parseCategoriesSearchParams(params: CategoriesSearchParams): GetCategoriesInput {
  const value = params.page;
  const rawPage = Number(Array.isArray(value) ? value[0] : value);
  return { page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1, pageSize: 10 };
}
