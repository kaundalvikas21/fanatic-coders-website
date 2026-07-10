import { BreadCrumb } from '@/components/shared/BreadCrumb';
import { ThemeToggle } from '@/components/shared/Toggle';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

type DashboardHeaderProps = {
  organizationSlug?: string | null;
  role?: string | null;
};

export function DashboardHeader({ organizationSlug, role }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
          {organizationSlug ?? 'no-org'} / {role ?? 'no-role'}
        </Badge>
        <ThemeToggle />
      </div>
    </header>
  );
}
