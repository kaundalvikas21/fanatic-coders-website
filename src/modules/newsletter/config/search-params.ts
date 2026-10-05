import type { GetNewsletterSubscriptionsInput } from '@/types';

export type NewsletterSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: NewsletterSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

export function parseNewsletterSearchParams(
  params: NewsletterSearchParams,
): GetNewsletterSubscriptionsInput {
  const email = getParam(params, 'email')?.trim().toLowerCase();
  const rawPage = Number(getParam(params, 'page'));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    email: email || undefined,
    page,
    pageSize: 10,
  };
}
