import 'server-only';

import { cache } from 'react';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  AccessModel,
  AccessOperation,
  ApiResponse,
  CurrentAccess,
  CurrentAccessData,
  GetCurrentAccessResponse,
} from '@/types';

export function createCurrentAccess(access: CurrentAccessData): CurrentAccess {
  return {
    ...access,
    can(model: AccessModel, operation: AccessOperation) {
      return access.permissions[model]?.includes(operation) ?? false;
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
