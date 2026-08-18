import { PROJECT_STATUSES, type GetProjectsInput, type ProjectStatus } from '@/types';

export type ProjectsSearchParams = Record<string, string | string[] | undefined>;

function getParam(params: ProjectsSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function includesValue<TValue extends string>(
  values: readonly TValue[],
  value: string | undefined,
): value is TValue {
  return values.includes(value as TValue);
}

export function parseProjectsSearchParams(params: ProjectsSearchParams): GetProjectsInput {
  const name = getParam(params, 'name')?.trim();
  const status = getParam(params, 'status');
  const rawPage = Number(getParam(params, 'page'));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    name: name || undefined,
    status: includesValue(PROJECT_STATUSES, status) ? (status as ProjectStatus) : undefined,
    page,
    pageSize: 10,
  };
}
