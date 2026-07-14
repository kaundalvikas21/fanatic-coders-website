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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { DashboardRoute } from '@/config/routes';
import { cn } from '@/lib/utils';

type NavMainItemProps = {
  item: DashboardRoute;
  pathname: string;
  activeItemUrl?: string;
};

function isActive(pathname: string, href: string) {
  if (href === '/dashboard/admin') {
    return pathname === '/dashboard/admin' || pathname === '/dashboard/admin/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getActiveSubItemUrl(item: DashboardRoute, pathname: string) {
  const activeSubItems = item.subItems?.filter((subItem) => isActive(pathname, subItem.url)) ?? [];

  return activeSubItems.sort((a, b) => b.url.length - a.url.length)[0]?.url;
}

function getActiveItemUrl(items: DashboardRoute[], pathname: string) {
  const activeItems = items.filter((item) => isActive(pathname, item.url));

  return activeItems.sort((a, b) => b.url.length - a.url.length)[0]?.url;
}

function NavMainItem({ item, pathname, activeItemUrl }: NavMainItemProps) {
  const hasSubItems = Boolean(item.subItems?.length);
  const activeSubItemUrl = getActiveSubItemUrl(item, pathname);
  const isItemActive = activeItemUrl === item.url;
  const shouldOpen = isItemActive || Boolean(activeSubItemUrl);
  const [isOpen, setIsOpen] = useState(shouldOpen);

  if (!hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={isItemActive}
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
          >
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight
              className={cn('ml-auto transition-transform duration-200', isOpen && 'rotate-90')}
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

export function NavMain({ items }: { items: DashboardRoute[] }) {
  const pathname = usePathname();
  const activeItemUrl = getActiveItemUrl(items, pathname);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavMainItem
            key={item.title}
            item={item}
            pathname={pathname}
            activeItemUrl={activeItemUrl}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
