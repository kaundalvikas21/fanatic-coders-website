// Defines organization roles and helpers for role-based dashboard routing.
import { authClient } from '@/lib/auth/client';
import { withBearerAuthorizationFromCookies } from '@/lib/auth/bearer-token';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { OrganizationMemberRole } from '@/types';

export const Role = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const ALL_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;
export const USER_ROLES = [Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;
export const USER_ROLE_OPTIONS = USER_ROLES.map((role) => ({
  value: role,
  label: getRoleLabel(role),
}));

export function parseRoles(role?: string | null): Role[] {
  if (!role) {
    return [];
  }

  return role
    .split(',')
    .map((item) => item.trim())
    .filter((item): item is Role => Object.values(Role).includes(item as Role));
}

export function getRoleLabel(role?: string | null) {
  const [primaryRole] = parseRoles(role);

  if (!primaryRole) {
    return 'User';
  }

  return `${primaryRole.charAt(0)}${primaryRole.slice(1).toLowerCase()}`;
}

export function hasAnyRole(role: string | null | undefined, allowedRoles: readonly Role[]) {
  const roles = parseRoles(role);

  return roles.some((item) => allowedRoles.includes(item));
}

export function getRoleHomePath(role: string | null | undefined) {
  switch (role) {
    case Role.ADMIN:
      return '/dashboard/admin';
    case Role.MANAGER:
      return '/dashboard/leads';
    case Role.MEMBER:
      return '/dashboard/tasks';
    case Role.CLIENT:
      return '/dashboard/client';
    default:
      return '/unauthorized';
  }
}

export async function getRole(headers: Headers) {
  const result = await authClient.organization.getActiveMemberRole({
    query: {
      organizationSlug: FCOP_ORGANIZATION_SLUG,
    },
    fetchOptions: {
      headers: withBearerAuthorizationFromCookies(headers),
      cache: 'no-store',
    },
  });

  return result.data?.role ?? null;
}

export function isOrganizationMemberRole(role: string): role is OrganizationMemberRole {
  return role === 'ADMIN' || role === 'MANAGER' || role === 'MEMBER' || role === 'CLIENT';
}
