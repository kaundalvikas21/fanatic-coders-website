'use client';

import useSWR from 'swr';
import type { ProjectOptionsResponse } from '@/types';

const PROJECT_OPTIONS_KEY = '/api/projects/options';

export function useProjectOptions() {
  const swr = useSWR<ProjectOptionsResponse>(PROJECT_OPTIONS_KEY);

  return {
    ...swr,
    projectOptions: swr.data?.success ? swr.data.data : [],
  };
}
