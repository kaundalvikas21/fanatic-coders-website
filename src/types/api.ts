import type { components, operations } from './backend-types';

export type Schemas = components['schemas'];

export type ApiResponse = Schemas['ApiResponse'];

export type SuccessResponse<TData> = ApiResponse & {
  data: TData;
  error?: never;
};

export type FailureResponse = ApiResponse & {
  success: false;
  data?: never;
  error: NonNullable<ApiResponse['error']>;
};

export type Response<TData> = SuccessResponse<TData> | FailureResponse;

export type HealthData = Schemas['HealthData'];
export type HealthResponse = Schemas['HealthResponse'];
export type GetHealthResponse =
  operations['getHealth']['responses'][200]['content']['application/json'];
