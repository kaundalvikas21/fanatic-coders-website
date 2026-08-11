import { BreadCrumb } from '@/components/shared/BreadCrumb';
import { ThemeToggle } from '@/components/shared/Toggle';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getRoleLabel } from '@/lib/auth/roles';
import { NotificationMenu } from '@/modules/notifications';

type DashboardHeaderProps = {
  organizationSlug?: string | null;
  role?: string | null;
};

export function DashboardHeader({ role }: DashboardHeaderProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[left,height] duration-200 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:left-(--sidebar-width) group-has-data-[collapsible=icon]/sidebar-wrapper:md:left-(--sidebar-width-icon)">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <BreadCrumb />
        <div className="ml-auto flex items-center gap-2">
          <Badge
            variant="outline"
            className="hidden font-mono sm:inline-flex"
          >
            {getRoleLabel(role)}
          </Badge>
          <NotificationMenu />
          <ThemeToggle />
        </div>
      </header>
      <div
        aria-hidden="true"
        className="h-16 shrink-0 transition-[height] duration-200 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      />
    </>
  );
}
