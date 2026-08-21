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
      className="border-sidebar-border/70 [&_[data-sidebar=sidebar]]:relative [&_[data-sidebar=sidebar]]:isolate [&_[data-sidebar=sidebar]]:overflow-hidden [&_[data-sidebar=sidebar]]:rounded-r-lg"
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_28%_at_20%_0%,color-mix(in_srgb,var(--sidebar-primary)_15%,transparent),transparent_72%),radial-gradient(ellipse_70%_24%_at_100%_100%,color-mix(in_srgb,var(--aurora-cyan)_7%,transparent),transparent_76%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px bg-gradient-to-b from-transparent via-sidebar-primary/35 to-transparent"
      />
      <SidebarHeader className="relative z-10 border-b border-sidebar-border/60 p-3 group-data-[collapsible=icon]:p-2">
        <DashboardBrand />
      </SidebarHeader>
      <SidebarContent className="relative z-10 py-2">
        <NavMain groups={routeGroups} />
      </SidebarContent>
      <SidebarFooter className="relative z-10 border-t border-sidebar-border/60 p-3 group-data-[collapsible=icon]:p-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-sidebar-primary/50" />
    </Sidebar>
  );
}
