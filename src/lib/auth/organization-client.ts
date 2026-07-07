import { authClient } from '@/lib/auth/client';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';

export function listOrganizations() {
  return authClient.organization.list({});
}

export function setActiveOrganization(input: {
  organizationId?: string | null;
  organizationSlug?: string;
}) {
  return authClient.organization.setActive(input);
}

export async function setFcopOrganizationActive() {
  const { data: organizations } = await listOrganizations();
  const organization = organizations?.find((item) => item.slug === FCOP_ORGANIZATION_SLUG);

  if (!organization) {
    return null;
  }

  return setActiveOrganization({
    organizationId: organization.id,
  });
}
