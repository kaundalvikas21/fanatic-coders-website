'use client';

import useSWR from 'swr';
import type { CategoryOptionsResponse } from '@/types';

const CATEGORY_OPTIONS_KEY = '/api/categories/options';

export function useCategories() {
  const swr = useSWR<CategoryOptionsResponse>(CATEGORY_OPTIONS_KEY);

  return {
    ...swr,
    categories: swr.data?.success ? swr.data.data : [],
    isUnavailable: Boolean(swr.error || (swr.data && !swr.data.success)),
  };
}
