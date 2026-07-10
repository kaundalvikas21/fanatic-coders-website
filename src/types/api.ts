import type { components } from './backend-types';

export type Schemas = components['schemas'];

export type ApiResponse = Schemas['ApiResponse'];

export type SuccessResponse<TData> = Omit<ApiResponse, 'data' | 'error' | 'success'> & {
  success: true;
  data: TData;
  error?: never;
};

export type FailureResponse = Omit<ApiResponse, 'data' | 'success'> & {
  success: false;
  data?: null;
  error: NonNullable<ApiResponse['error']>;
};

export type Response<TData> = SuccessResponse<TData> | FailureResponse;

export type HealthData = Schemas['HealthData'];
export type HealthResponse = Response<HealthData>;
export type GetHealthResponse = Response<HealthData>;
export type RequestPasswordResetRequest = Schemas['RequestPasswordResetRequest'];
export type RequestPasswordResetResponse = Response<null>;
