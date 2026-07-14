import { redirect } from 'next/navigation';
import { DashboardContent } from '@/components/dashboard/shell/DashboardContent';
import { DashboardHeader } from '@/components/dashboard/shell/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/shell/DashboardSidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { requireAuth } from '@/lib/auth/server';
import { DashboardProvider } from '@/providers/DashboardProvider';
import './global.css';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  const access = await getCurrentAccess();
  const role = access?.role;

  if (!role) {
    redirect('/unauthorized');
  }

  return (
    <DashboardProvider>
      <DashboardSidebar role={role} />
      <SidebarInset className="dashboard-shell">
        <DashboardHeader
          organizationSlug={FCOP_ORGANIZATION_SLUG}
          role={role}
        />
        <DashboardContent>{children}</DashboardContent>
      </SidebarInset>
    </DashboardProvider>
  );
}
