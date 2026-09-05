import type { ComponentType } from 'react';
import {
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  House,
  Inbox,
  LayoutDashboard,
  ListChecks,
  MailPlus,
  Settings,
  UsersRound,
} from 'lucide-react';
import { Role, type Role as DashboardRole } from '@/lib/auth/roles';

export type DashboardRoute = {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
  roles: readonly DashboardRole[];
  comingSoon?: boolean;
  subItems?: Array<{
    title: string;
    url: string;
    roles: readonly DashboardRole[];
  }>;
};

export type DashboardRouteGroup = {
  label: string;
  items: DashboardRoute[];
};

const LEAD_ROLES = [Role.ADMIN, Role.MANAGER] as const;
const OVERVIEW_ROLES = [Role.ADMIN] as const;
const PROJECT_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;
const TASK_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER] as const;
const TASK_DETAIL_ROLES = [...TASK_ROLES, Role.CLIENT] as const;
const PAYMENT_ROLES = [Role.ADMIN, Role.MANAGER, Role.CLIENT] as const;
const SERVICE_REQUEST_ROLES = [Role.ADMIN, Role.MANAGER, Role.CLIENT] as const;
const SETTINGS_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER, Role.CLIENT] as const;

// Authorize shared dashboard destinations that do not belong in navigation.
const dashboardUtilityRoutes = [
  {
    url: '/dashboard/photo',
    roles: SETTINGS_ROLES,
  },
] as const;

export const dashboardRouteGroups: DashboardRouteGroup[] = [
  {
    label: 'Business',
    items: [
      {
        title: 'Home',
        url: '/dashboard/client',
        icon: House,
        roles: [Role.CLIENT],
      },
      {
        title: 'Overview',
        url: '/dashboard/admin',
        icon: LayoutDashboard,
        roles: OVERVIEW_ROLES,
      },
      {
        title: 'Leads',
        url: '/dashboard/leads',
        icon: Inbox,
        roles: LEAD_ROLES,
      },
      {
        title: 'Services',
        url: '/dashboard/services',
        icon: ClipboardList,
        roles: SERVICE_REQUEST_ROLES,
      },
    ],
  },
  {
    label: 'Delivery',
    items: [
      {
        title: 'Projects',
        url: '/dashboard/projects',
        icon: BriefcaseBusiness,
        roles: PROJECT_ROLES,
      },
      {
        title: 'Tasks',
        url: '/dashboard/tasks',
        icon: ListChecks,
        roles: TASK_ROLES,
      },
      {
        title: 'Payments',
        url: '/dashboard/payments',
        icon: CreditCard,
        roles: PAYMENT_ROLES,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: Settings,
        roles: SETTINGS_ROLES,
      },
    ],
  },
  {
    label: 'Administration',
    items: [
      {
        title: 'Users',
        url: '/dashboard/admin/user',
        icon: UsersRound,
        roles: [Role.ADMIN],
      },
      {
        title: 'Invitations',
        url: '/dashboard/admin/invitations',
        icon: MailPlus,
        roles: [Role.ADMIN],
      },
    ],
  },
];

function matchesDashboardPath(pathname: string, routeUrl: string) {
  if (routeUrl === '/dashboard') {
    return pathname === routeUrl || pathname === `${routeUrl}/`;
  }

  return pathname === routeUrl || pathname.startsWith(`${routeUrl}/`);
}

export function getDashboardRouteRoles(pathname: string) {
  // Let clients open project task details without exposing the staff task board.
  if (/^\/dashboard\/tasks\/[^/]+\/?$/.test(pathname)) {
    return TASK_DETAIL_ROLES;
  }

  const routes = [
    ...dashboardUtilityRoutes,
    ...dashboardRouteGroups.flatMap((group) =>
      group.items.flatMap((item) => [
        { url: item.url, roles: item.roles },
        ...(item.subItems?.map((subItem) => ({
          url: subItem.url,
          roles: subItem.roles,
        })) ?? []),
      ]),
    ),
  ];

  return routes
    .filter((route) => matchesDashboardPath(pathname, route.url))
    .sort((a, b) => b.url.length - a.url.length)[0]?.roles;
}
