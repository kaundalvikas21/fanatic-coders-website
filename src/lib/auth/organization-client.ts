// Wraps Better Auth organization client calls for the FCOP workspace.
import { useCallback, useMemo } from 'react';
import { authClient } from '@/lib/auth/client';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';

type ListOrganizationsResult = Awaited<ReturnType<typeof authClient.organization.list>>;
type Organization = NonNullable<ListOrganizationsResult['data']>[number];
type InviteMemberBody = Parameters<typeof authClient.organization.inviteMember>[0];
type InviteFcopMemberBody = Omit<InviteMemberBody, 'organizationId' | 'role'> & {
  role: string;
};

export function listOrganizations() {
  return authClient.organization.list({});
}

export function getFcopOrganization(organizations?: readonly Organization[] | null) {
  return organizations?.find((item) => item.slug === FCOP_ORGANIZATION_SLUG) ?? null;
}

export async function getFcopOrganizationId() {
  const { data: organizations } = await listOrganizations();

  return getFcopOrganization(organizations)?.id ?? null;
}

export function useFcopOrganizationId() {
  const result = authClient.useListOrganizations();
  const organization = useMemo(() => getFcopOrganization(result.data), [result.data]);

  return {
    ...result,
    organization,
    organizationId: organization?.id ?? null,
  };
}

export function useFcopOrganizationInvitation() {
  const result = useFcopOrganizationId();

  const inviteMember = useCallback(
    (input: InviteFcopMemberBody) => {
      if (!result.organizationId) {
        throw new Error('FCOP organization was not found.');
      }

      return authClient.organization.inviteMember({
        ...input,
        role: input.role as InviteMemberBody['role'],
        organizationId: result.organizationId,
      });
    },
    [result.organizationId],
  );

  return {
    ...result,
    inviteMember,
  };
}

export function setActiveOrganization(input: {
  organizationId?: string | null;
  organizationSlug?: string;
}) {
  return authClient.organization.setActive(input);
}

export async function setFcopOrganizationActive() {
  const { data: organizations } = await listOrganizations();
  const organization = getFcopOrganization(organizations);

  if (!organization) {
    return null;
  }

  return setActiveOrganization({
    organizationId: organization.id,
  });
}
