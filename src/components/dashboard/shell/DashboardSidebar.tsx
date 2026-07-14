'use client';

import { DashboardBrand } from '@/components/dashboard/shell/DashboardBrand';
import { NavMain } from '@/components/dashboard/shell/NavMain';
import { NavUser } from '@/components/dashboard/shell/NavUser';
import { getAccessibleDashboardRouteGroups } from '@/components/dashboard/shell/nav-utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role?: string | null;
};

export function DashboardSidebar({ role, ...props }: DashboardSidebarProps) {
  const routeGroups = getAccessibleDashboardRouteGroups(role);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <DashboardBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={routeGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
