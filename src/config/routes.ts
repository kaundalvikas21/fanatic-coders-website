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

export type DashboardRoute = {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
};

export const adminRoutes = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Leads',
    url: '/dashboard/leads',
    icon: Inbox,
  },
  {
    title: 'Projects',
    url: '/dashboard/projects',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: ListChecks,
  },
  {
    title: 'Admin',
    url: '/dashboard/admin',
    icon: ShieldCheck,
  },
  {
    title: 'Team',
    url: '/dashboard/team',
    icon: UsersRound,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
] satisfies DashboardRoute[];

export const userRoutes = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'User scaffolding',
    url: '/dashboard/user/scaffolding',
    icon: Blocks,
  },
  {
    title: 'Projects',
    url: '/dashboard/projects',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: ListChecks,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
] satisfies DashboardRoute[];
