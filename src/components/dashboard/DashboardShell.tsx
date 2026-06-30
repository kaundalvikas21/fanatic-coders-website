'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { DashboardContent } from '@/components/dashboard/shell/DashboardContent';
import { DashboardLoading } from '@/components/dashboard/shell/DashboardLoading';
import { DashboardSidebar } from '@/components/dashboard/shell/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/shell/DashboardHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useSession } from '@/lib/auth/client';

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [isPending, router, session]);

  if (isPending || !session) {
    return <DashboardLoading />;
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="dashboard-shell">
          <DashboardHeader />
          <DashboardContent>{children}</DashboardContent>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
