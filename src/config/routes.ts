import type { ComponentType } from 'react';
import {
  Blocks,
  BriefcaseBusiness,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { ALL_ROLES, Role, USER_ROLES, type Role as DashboardRole } from '@/lib/auth/roles';

export type DashboardRoute = {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
  roles: readonly DashboardRole[];
};

export const dashboardRoutes = [
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
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    title: 'Projects',
    url: '/dashboard/projects',
    icon: BriefcaseBusiness,
    roles: ALL_ROLES,
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: ListChecks,
    roles: [Role.ADMIN, Role.MANAGER, Role.MEMBER],
  },
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
    title: 'Settings',
    url: '/dashboard/admin/settings',
    icon: Settings,
    roles: [Role.ADMIN],
  },
  {
    title: 'Client',
    url: '/dashboard/client',
    icon: Blocks,
    roles: USER_ROLES,
  },
] satisfies DashboardRoute[];
