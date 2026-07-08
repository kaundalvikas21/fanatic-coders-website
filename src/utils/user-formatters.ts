export function getUserRoleBadgeVariant(role: string) {
  if (role === 'ADMIN') {
    return 'default';
  }

  if (role === 'CLIENT') {
    return 'secondary';
  }

  return 'outline';
}
