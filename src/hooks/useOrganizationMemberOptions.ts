'use client';

import useSWR from 'swr';
import type { OrganizationMemberOptionsResponse, OrganizationMemberRole } from '@/types';

const ORGANIZATION_MEMBER_OPTIONS_PATH = '/api/organization/members/options';

export function useOrganizationMemberOptions(roles: readonly OrganizationMemberRole[] = []) {
  const roleQuery = [...new Set(roles)].sort().join(',');
  const key = roleQuery
    ? `${ORGANIZATION_MEMBER_OPTIONS_PATH}?roles=${encodeURIComponent(roleQuery)}`
    : ORGANIZATION_MEMBER_OPTIONS_PATH;
  const swr = useSWR<OrganizationMemberOptionsResponse>(key);

  return {
    ...swr,
    memberOptions: swr.data?.success ? swr.data.data : [],
  };
}
