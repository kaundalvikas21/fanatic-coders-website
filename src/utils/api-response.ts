import type { Response } from '@/types';

type ApiError = {
  code: string;
  details?: string;
};

type ApiResponseParams<TData> = {
  success: boolean;
  status: number;
  message: string;
  data?: TData | null;
  error?: ApiError;
};

export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export const ApiResponse = <TData>(params: ApiResponseParams<TData>): Response<TData> =>
  ({
    success: params.success,
    status: params.status,
    message: params.message,
    data: params.data ?? null,
    error: params.error,
  }) as Response<TData>;
