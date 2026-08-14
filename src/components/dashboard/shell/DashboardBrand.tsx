import { Braces } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function DashboardBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="h-12 cursor-default gap-3 px-1 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0!"
        >
          <div className="relative flex aspect-square size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-aurora-violet via-aurora-blue to-aurora-cyan text-white shadow-[0_6px_18px_rgb(124_58_237/0.24)] group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-lg">
            <Braces className="size-4" />
            <span className="absolute inset-x-1 top-px h-px bg-white/35" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold tracking-[-0.01em] text-sidebar-foreground">
              Fanatic Coders
            </span>
            <span className="mt-0.5 truncate font-mono text-[0.6rem] tracking-[0.12em] text-sidebar-foreground/50 uppercase">
              Ops platform
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
