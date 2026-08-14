import {
  SERVICE_INTERESTS,
  SERVICE_REQUEST_STATUSES,
  type GetServiceRequestsInput,
  type ServiceInterest,
  type ServiceRequestStatus,
} from '@/types';

export type ServiceRequestsSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: ServiceRequestsSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function includesValue<TValue extends string>(
  values: readonly TValue[],
  value: string | undefined,
): value is TValue {
  return values.includes(value as TValue);
}

export function parseServiceRequestsSearchParams(
  params: ServiceRequestsSearchParams,
): GetServiceRequestsInput {
  const client = getParam(params, 'client')?.trim();
  const status = getParam(params, 'status');
  const serviceType = getParam(params, 'serviceType');

  return {
    client: client || undefined,
    status: includesValue(SERVICE_REQUEST_STATUSES, status)
      ? (status as ServiceRequestStatus)
      : undefined,
    serviceType: includesValue(SERVICE_INTERESTS, serviceType)
      ? (serviceType as ServiceInterest)
      : undefined,
  };
}
