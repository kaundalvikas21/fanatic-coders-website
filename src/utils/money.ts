import { DEFAULT_PROJECT_CURRENCY, type ProjectCurrency } from '@/types';

type FormatMoneyOptions = {
  fallback?: string;
};

const CURRENCY_LOCALES = {
  USD: 'en-US',
  AED: 'en-AE',
} satisfies Record<ProjectCurrency, string>;

export function formatMoney(
  amount?: number | string | null,
  currency: ProjectCurrency = DEFAULT_PROJECT_CURRENCY,
  options: FormatMoneyOptions = {},
) {
  if (amount === undefined || amount === null || amount === '') {
    return options.fallback ?? 'Not set';
  }

  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: 'currency',
    currency,
  }).format(Number(amount));
}
