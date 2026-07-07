export const Role = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const ALL_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;
export const USER_ROLES = [Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;

const routeAccess = [
  {
    prefix: '/dashboard/admin',
    roles: [Role.ADMIN],
  },
  {
    prefix: '/dashboard/client',
    roles: USER_ROLES,
  },
  {
    prefix: '/dashboard/leads',
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    prefix: '/dashboard/projects',
    roles: ALL_ROLES,
  },
  {
    prefix: '/dashboard/tasks',
    roles: [Role.ADMIN, Role.MANAGER, Role.MEMBER],
  },
] satisfies readonly { prefix: string; roles: readonly Role[] }[];

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
  return hasAnyRole(role, [Role.ADMIN]) ? '/dashboard/admin' : '/dashboard/client';
}

export function canAccessDashboardPath(role: string | null | undefined, pathname: string) {
  if (pathname === '/dashboard') {
    return true;
  }

  const match = routeAccess.find(
    (item) => pathname === item.prefix || pathname.startsWith(`${item.prefix}/`),
  );

  return match ? hasAnyRole(role, match.roles) : true;
}
