'use client';

import { dashboardRoutes } from '@/config/routes';
import { DashboardBrand } from '@/components/dashboard/shell/DashboardBrand';
import { NavMain } from '@/components/dashboard/shell/NavMain';
import { NavUser } from '@/components/dashboard/shell/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { hasAnyRole } from '@/lib/auth/roles';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role?: string | null;
};

export function DashboardSidebar({ role, ...props }: DashboardSidebarProps) {
  const routes = dashboardRoutes.filter((item) => hasAnyRole(role, item.roles));

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <DashboardBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
