import type { GetUsersInput, UserSortField } from '@/types';
import { USER_SORT_FIELDS } from '@/types';

export type UsersSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: UsersSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function includesValue<TValue extends string | number>(
  values: readonly TValue[],
  value: string | number | undefined,
): value is TValue {
  return values.includes(value as TValue);
}

export function parseUsersSearchParams(params: UsersSearchParams): GetUsersInput {
  const sortBy = getParam(params, 'sortBy');
  const sortDirection = getParam(params, 'sortDirection');
  const name = getParam(params, 'name')?.trim();

  return {
    sortBy: includesValue(USER_SORT_FIELDS, sortBy) ? (sortBy as UserSortField) : undefined,
    sortDirection: sortDirection === 'asc' || sortDirection === 'desc' ? sortDirection : undefined,
    name: name || undefined,
  };
}
