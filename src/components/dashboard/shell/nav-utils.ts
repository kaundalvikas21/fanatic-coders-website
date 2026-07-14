import { dashboardRouteGroups, type DashboardRoute } from '@/config/routes';
import { hasAnyRole } from '@/lib/auth/roles';

export function isDashboardRouteActive(pathname: string, href: string) {
  if (href === '/dashboard/admin') {
    return pathname === '/dashboard/admin' || pathname === '/dashboard/admin/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveSubItemUrl(item: DashboardRoute, pathname: string) {
  const activeSubItems =
    item.subItems?.filter((subItem) => isDashboardRouteActive(pathname, subItem.url)) ?? [];

  return activeSubItems.sort((a, b) => b.url.length - a.url.length)[0]?.url;
}

export function getActiveDashboardRouteUrl(items: DashboardRoute[], pathname: string) {
  const activeItems = items.filter((item) => isDashboardRouteActive(pathname, item.url));

  return activeItems.sort((a, b) => b.url.length - a.url.length)[0]?.url;
}

export function getAccessibleDashboardRouteGroups(role?: string | null) {
  return dashboardRouteGroups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => hasAnyRole(role, item.roles))
        .map((item) => ({
          ...item,
          subItems: item.subItems?.filter((subItem) => hasAnyRole(role, subItem.roles)),
        })),
    }))
    .filter((group) => group.items.length > 0);
}
