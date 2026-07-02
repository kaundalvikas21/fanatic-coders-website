import { DashboardThemeToggle } from '@/components/dashboard/shell/DashboardThemeToggle';
import { BreadCrumb } from '@/components/shared/BreadCrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
      />
      <BreadCrumb />
      <div className="ml-auto">
        <DashboardThemeToggle />
      </div>
    </header>
  );
}
