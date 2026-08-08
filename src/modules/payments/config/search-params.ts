import type { GetPaymentsInput, PaymentStatus } from '@/types';

export const PAYMENT_STATUSES = ['UNPAID', 'PAID'] as const satisfies readonly PaymentStatus[];

export type PaymentsSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: PaymentsSearchParams, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function includesValue<TValue extends string>(
  values: readonly TValue[],
  value: string | undefined,
): value is TValue {
  return values.includes(value as TValue);
}

export function parsePaymentsSearchParams(params: PaymentsSearchParams): GetPaymentsInput {
  const search = getParam(params, 'search')?.trim();
  const status = getParam(params, 'status');
  const rawPage = Number(getParam(params, 'page'));

  return {
    search: search || undefined,
    status: includesValue(PAYMENT_STATUSES, status) ? status : undefined,
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: 10,
  };
}
