import { ThemeToggle } from '@/components/shared/Toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationMenu } from '@/modules/notifications';
import { DashboardCommandSearch } from './DashboardCommandSearch';
import { NavUser } from './NavUser';

type DashboardHeaderProps = {
  organizationSlug?: string | null;
  role?: string | null;
};

export function DashboardHeader({ role }: DashboardHeaderProps) {
  return (
    <>
      <header className="fixed top-3 right-3 left-3 z-30 mx-auto flex h-14 w-auto max-w-[105rem] shrink-0 items-center gap-2 rounded-xl border border-border/80 bg-card/90 px-3 shadow-[0_6px_8px_rgb(0_0_0/0.08)] backdrop-blur-xl transition-[left] duration-200 ease-out md:left-[calc(var(--sidebar-width)+0.75rem)] group-has-data-[collapsible=icon]/sidebar-wrapper:md:left-[calc(var(--sidebar-width-icon)+0.75rem)] motion-reduce:transition-none">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-1 data-vertical:h-4 data-vertical:self-auto"
        />
        <DashboardCommandSearch role={role} />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <NotificationMenu />
          <ThemeToggle variant="default" />
          <NavUser variant="header" />
        </div>
      </header>
      <div
        aria-hidden="true"
        className="h-20 shrink-0"
      />
    </>
  );
}
