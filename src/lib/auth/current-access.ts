// Loads the current user's backend access role and permission set for dashboard gates.
import 'server-only';

import { cache } from 'react';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CurrentAccess,
  CurrentAccessData,
  GetCurrentAccessResponse,
} from '@/types';

export function createCurrentAccess(access: CurrentAccessData): CurrentAccess {
  return {
    ...access,
    can(model, operation) {
      return (
        (access.permissions[model] as readonly string[] | undefined)?.includes(operation) ?? false
      );
    },
  };
}

export const getCurrentAccess = cache(async (): Promise<CurrentAccess | null> => {
  try {
    const response = await unwrap<GetCurrentAccessResponse>(authApi.get('/api/v1/me'));

    if (!response.success) {
      return null;
    }

    return createCurrentAccess(response.data);
  } catch (error) {
    const apiError = getApiError(error) as ApiResponse;

    if (!apiError.success) {
      return null;
    }

    throw error;
  }
});
