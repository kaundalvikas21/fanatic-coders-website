'use client';

import useSWR from 'swr';
import type { OrganizationMemberOptionsResponse, OrganizationMemberRole } from '@/types';

const ORGANIZATION_MEMBER_OPTIONS_PATH = '/api/organization/members/options';

export function useOrganizationMemberOptions(
  roles: readonly OrganizationMemberRole[] = [],
  memberId?: string,
) {
  const roleQuery = [...new Set(roles)].sort().join(',');
  const query = new URLSearchParams();
  if (roleQuery) query.set('roles', roleQuery);
  if (memberId) query.set('memberId', memberId);
  const key = query.size
    ? `${ORGANIZATION_MEMBER_OPTIONS_PATH}?${query}`
    : ORGANIZATION_MEMBER_OPTIONS_PATH;
  const swr = useSWR<OrganizationMemberOptionsResponse>(key);

  return {
    ...swr,
    memberOptions: swr.data?.success ? swr.data.data : [],
  };
}
