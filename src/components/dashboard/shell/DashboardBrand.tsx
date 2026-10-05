import Link from 'next/link';
import { Braces } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function DashboardBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="h-12 px-1.5 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0!"
        >
          <Link
            href="/dashboard"
            aria-label="fanaticCoders dashboard"
          >
            <span className="shrink-0 text-[1.2rem] font-bold tracking-[-0.02em] no-underline transition-opacity hover:opacity-80 group-data-[collapsible=icon]:hidden">
              <span className="text-sidebar-foreground">{'{'}</span>
              <span className="logo-gradient">fanaticCoders</span>
              <span className="text-sidebar-foreground">{'}'}</span>
            </span>
            <span className="hidden size-8 items-center justify-center rounded-lg text-sidebar-primary group-data-[collapsible=icon]:flex">
              <Braces
                className="size-4"
                aria-hidden
              />
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
