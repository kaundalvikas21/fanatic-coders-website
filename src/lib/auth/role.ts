import { ROLES, type Role } from '@/types';

export function getUserRole(user: unknown): Role | null {
  if (!user || typeof user !== 'object' || !('role' in user)) {
    return null;
  }

  const role = (user as { role?: unknown }).role;

  return typeof role === 'string' && ROLES.includes(role as Role) ? (role as Role) : null;
}
