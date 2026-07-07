'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { DashboardContent } from '@/components/dashboard/shell/DashboardContent';
import { DashboardLoading } from '@/components/dashboard/shell/DashboardLoading';
import { DashboardSidebar } from '@/components/dashboard/shell/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/shell/DashboardHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useActiveMemberRole, useActiveOrganization, useSession } from '@/lib/auth/client';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { setFcopOrganizationActive } from '@/lib/auth/organization-client';
import { canAccessDashboardPath, getRoleHomePath } from '@/lib/auth/roles';

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [activeOrganizationAttempted, setActiveOrganizationAttempted] = useState(false);
  const { data: activeOrganization, isPending: activeOrganizationPending } =
    useActiveOrganization();
  const { data: activeMemberRole, isPending: activeMemberRolePending } = useActiveMemberRole();
  const activeRole = activeMemberRole?.role ?? null;
  const activeOrganizationReady = activeOrganization?.slug === FCOP_ORGANIZATION_SLUG;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [isPending, router, session]);

  useEffect(() => {
    if (
      isPending ||
      activeOrganizationPending ||
      !session ||
      activeOrganizationReady ||
      activeOrganizationAttempted
    ) {
      return;
    }

    void setFcopOrganizationActive().finally(() => {
      setActiveOrganizationAttempted(true);
    });
  }, [
    activeOrganizationAttempted,
    activeOrganizationPending,
    activeOrganizationReady,
    isPending,
    session,
  ]);

  useEffect(() => {
    if (
      isPending ||
      activeOrganizationPending ||
      activeMemberRolePending ||
      !session ||
      !activeOrganizationReady
    ) {
      return;
    }

    if (!activeRole) {
      router.replace('/unauthorized');
      return;
    }

    if (pathname === '/dashboard') {
      router.replace(getRoleHomePath(activeRole));
      return;
    }

    if (!canAccessDashboardPath(activeRole, pathname)) {
      router.replace(getRoleHomePath(activeRole));
    }
  }, [
    activeRole,
    activeMemberRolePending,
    activeOrganizationPending,
    activeOrganizationReady,
    isPending,
    pathname,
    router,
    session,
  ]);

  if (
    isPending ||
    !session ||
    activeOrganizationPending ||
    !activeOrganizationReady ||
    activeMemberRolePending ||
    !activeRole ||
    pathname === '/dashboard' ||
    !canAccessDashboardPath(activeRole, pathname)
  ) {
    return <DashboardLoading />;
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar role={activeRole} />
        <SidebarInset className="dashboard-shell">
          <DashboardHeader role={activeRole} />
          <DashboardContent>{children}</DashboardContent>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
