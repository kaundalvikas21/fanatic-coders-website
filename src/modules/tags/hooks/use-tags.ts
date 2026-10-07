'use client';

import useSWR from 'swr';
import type { TagOptionsResponse } from '@/types';

const TAG_OPTIONS_KEY = '/api/tags/options';

export function useTags() {
  const swr = useSWR<TagOptionsResponse>(TAG_OPTIONS_KEY);

  return {
    ...swr,
    tags: swr.data?.success ? swr.data.data : [],
    isUnavailable: Boolean(swr.error || (swr.data && !swr.data.success)),
  };
}
