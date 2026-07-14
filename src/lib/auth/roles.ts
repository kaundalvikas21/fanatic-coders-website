import { authClient } from '@/lib/auth/client';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';

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
  label: `${role.charAt(0)}${role.slice(1).toLowerCase()}`,
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
      headers,
      cache: 'no-store',
    },
  });

  return result.data?.role ?? null;
}
