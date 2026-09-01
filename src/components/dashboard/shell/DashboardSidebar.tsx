'use client';

import { DashboardBrand } from '@/components/dashboard/shell/DashboardBrand';
import { NavMain } from '@/components/dashboard/shell/NavMain';
import { getAccessibleDashboardRouteGroups } from '@/components/dashboard/shell/nav-utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import packageJson from '../../../../package.json';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role?: string | null;
};

export function DashboardSidebar({ role, ...props }: DashboardSidebarProps) {
  const routeGroups = getAccessibleDashboardRouteGroups(role);

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="[&_[data-sidebar=sidebar]]:relative [&_[data-sidebar=sidebar]]:isolate [&_[data-sidebar=sidebar]]:overflow-hidden [&_[data-sidebar=sidebar]]:rounded-xl [&_[data-sidebar=sidebar]]:border [&_[data-sidebar=sidebar]]:border-sidebar-border/80 [&_[data-sidebar=sidebar]]:bg-sidebar/90 [&_[data-sidebar=sidebar]]:shadow-[0_6px_8px_rgb(0_0_0/0.08)] [&_[data-sidebar=sidebar]]:ring-0 [&_[data-sidebar=sidebar]]:backdrop-blur-xl"
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
      <SidebarFooter className="relative z-10 px-3 py-2 group-data-[collapsible=icon]:p-0">
        <p className="text-center font-mono text-xs text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden">
          v{packageJson.version}
        </p>
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-sidebar-primary/50" />
    </Sidebar>
  );
}
