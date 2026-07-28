import type { ComponentType } from 'react';
import {
  Blocks,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  Inbox,
  LayoutDashboard,
  ListChecks,
  MailPlus,
  Settings,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { ALL_ROLES, Role, type Role as DashboardRole } from '@/lib/auth/roles';

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
const PROJECT_ROLES = [Role.ADMIN, Role.MANAGER, Role.CLIENT] as const;
const TASK_ROLES = [Role.ADMIN, Role.MANAGER, Role.MEMBER] as const;
const BILLING_ROLES = [Role.ADMIN, Role.MANAGER, Role.CLIENT] as const;
const SERVICE_REQUEST_ROLES = [Role.ADMIN, Role.MANAGER, Role.CLIENT] as const;

export const dashboardRouteGroups: DashboardRouteGroup[] = [
  {
    label: 'Business',
    items: [
      {
        title: 'Overview',
        url: '/dashboard',
        icon: LayoutDashboard,
        roles: ALL_ROLES,
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
        subItems: [
          {
            title: 'All Services',
            url: '/dashboard/services',
            roles: SERVICE_REQUEST_ROLES,
          },
          {
            title: 'New Request',
            url: '/dashboard/services/new',
            roles: [Role.CLIENT],
          },
        ],
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
        roles: BILLING_ROLES,
        comingSoon: true,
      },
    ],
  },
  {
    label: 'Administration',
    items: [
      {
        title: 'Admin',
        url: '/dashboard/admin',
        icon: ShieldCheck,
        roles: [Role.ADMIN],
      },
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
      {
        title: 'Settings',
        url: '/dashboard/admin/settings',
        icon: Settings,
        roles: [Role.ADMIN],
        comingSoon: true,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Client',
        url: '/dashboard/client',
        icon: Blocks,
        roles: [Role.CLIENT],
      },
    ],
  },
];
