export function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || 'User';

  return source
    .split(/[ @._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
