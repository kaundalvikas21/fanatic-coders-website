'use client';

import { adminRoutes, userRoutes } from '@/config/routes';
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
import { useSession } from '@/lib/auth/client';
import { getUserRole } from '@/lib/auth/role';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar>;

export function DashboardSidebar(props: DashboardSidebarProps) {
  const { data: session } = useSession();
  const role = getUserRole(session?.user);
  const routes = role === 'ADMIN' ? adminRoutes : userRoutes;

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
