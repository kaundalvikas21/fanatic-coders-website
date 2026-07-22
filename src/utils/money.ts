import { DEFAULT_PROJECT_CURRENCY } from '@/types';

type FormatMoneyOptions = {
  fallback?: string;
};

export function formatMoney(
  amount?: number | string | null,
  currency = DEFAULT_PROJECT_CURRENCY,
  options: FormatMoneyOptions = {},
) {
  if (amount === undefined || amount === null || amount === '') {
    return options.fallback ?? 'Not set';
  }

  return `${currency} ${Number(amount).toLocaleString()}`;
}
