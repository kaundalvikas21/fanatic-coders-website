import {
  LEAD_STATUSES,
  SERVICE_INTERESTS,
  type GetLeadsInput,
  type LeadStatus,
  type ServiceInterest,
} from '@/types';

export type LeadsSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: LeadsSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function includesValue<TValue extends string>(
  values: readonly TValue[],
  value: string | undefined,
): value is TValue {
  return values.includes(value as TValue);
}

export function parseLeadsSearchParams(params: LeadsSearchParams): GetLeadsInput {
  const email = getParam(params, 'email')?.trim().toLowerCase();
  const status = getParam(params, 'status');
  const serviceType = getParam(params, 'serviceType');
  const rawPage = Number(getParam(params, 'page'));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    email: email || undefined,
    status: includesValue(LEAD_STATUSES, status) ? (status as LeadStatus) : undefined,
    serviceType: includesValue(SERVICE_INTERESTS, serviceType)
      ? (serviceType as ServiceInterest)
      : undefined,
    page,
    pageSize: 10,
  };
}
