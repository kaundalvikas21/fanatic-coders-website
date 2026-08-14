'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { DashboardRoute, DashboardRouteGroup } from '@/config/routes';
import { cn } from '@/lib/utils';
import { getActiveDashboardRouteUrl, getActiveSubItemUrl } from './nav-utils';

type NavMainItemProps = {
  item: DashboardRoute;
  pathname: string;
  activeItemUrl?: string;
};

function NavMainItem({ item, pathname, activeItemUrl }: NavMainItemProps) {
  const hasSubItems = Boolean(item.subItems?.length);
  const activeSubItemUrl = getActiveSubItemUrl(item, pathname);
  const isItemActive = activeItemUrl === item.url;
  const shouldOpen = isItemActive || Boolean(activeSubItemUrl);
  const [isOpen, setIsOpen] = useState(shouldOpen);

  if (!hasSubItems) {
    if (item.comingSoon) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={`${item.title} — Coming soon`}
            disabled
            aria-disabled
          >
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
          <SidebarMenuBadge className="right-2 bg-sidebar-accent px-1.5 text-[10px] uppercase">
            Soon
          </SidebarMenuBadge>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={isItemActive}
          className="h-9 gap-2.5 border border-transparent px-2.5 font-medium text-sidebar-foreground/70 transition-[color,background-color,border-color] duration-150 hover:border-sidebar-border/60 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-[active=true]:border-sidebar-primary/30 data-[active=true]:bg-sidebar-primary/12 data-[active=true]:text-sidebar-foreground data-[active=true]:shadow-[inset_2px_0_0_var(--sidebar-primary)] data-[active=true]:[&_svg]:text-sidebar-primary group-data-[collapsible=icon]:data-[active=true]:shadow-none"
        >
          <Link href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      asChild
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={shouldOpen}
            className="h-9 gap-2.5 border border-transparent px-2.5 font-medium text-sidebar-foreground/70 transition-[color,background-color,border-color] duration-150 hover:border-sidebar-border/60 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-[active=true]:border-sidebar-primary/30 data-[active=true]:bg-sidebar-primary/12 data-[active=true]:text-sidebar-foreground data-[active=true]:shadow-[inset_2px_0_0_var(--sidebar-primary)] data-[active=true]:[&_svg]:text-sidebar-primary group-data-[collapsible=icon]:data-[active=true]:shadow-none"
          >
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight
              className={cn(
                'ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden',
                isOpen && 'rotate-90',
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subItems?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={activeSubItemUrl === subItem.url}
                  className="text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary/10 data-[active=true]:font-medium data-[active=true]:text-sidebar-primary"
                >
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({ groups }: { groups: DashboardRouteGroup[] }) {
  const pathname = usePathname();
  const items = groups.flatMap((group) => group.items);
  const activeItemUrl = getActiveDashboardRouteUrl(items, pathname);

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup
          key={group.label}
          className="py-2"
        >
          <SidebarGroupLabel className="h-7 px-2.5 font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-sidebar-foreground/40 uppercase">
            {group.label}
          </SidebarGroupLabel>
          <SidebarMenu className="gap-0.5">
            {group.items.map((item) => (
              <NavMainItem
                key={item.title}
                item={item}
                pathname={pathname}
                activeItemUrl={activeItemUrl}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
