'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type SectionTabItem = {
  value: string;
  label: string;
  Icon: LucideIcon;
  href?: string;
  count?: ReactNode;
  compactLabel?: boolean;
};

type SectionTabsProps = Omit<ComponentProps<typeof Tabs>, 'children'> & {
  items: readonly SectionTabItem[];
  ariaLabel: string;
  children?: ReactNode;
  fill?: boolean;
};

function SectionTabContent({ item }: { item: SectionTabItem }) {
  return (
    <>
      <item.Icon
        className="size-4"
        aria-hidden="true"
      />
      <span className={cn(item.compactLabel && 'hidden sm:inline')}>{item.label}</span>
      {item.count !== undefined ? (
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none tabular-nums text-muted-foreground group-data-[state=active]:bg-primary-foreground/15 group-data-[state=active]:text-primary-foreground">
          {item.count}
        </span>
      ) : null}
    </>
  );
}

export function SectionTabs({
  items,
  ariaLabel,
  children,
  fill = false,
  className,
  ...props
}: SectionTabsProps) {
  return (
    <Tabs
      className={cn('gap-5', className)}
      {...props}
    >
      <TabsList
        aria-label={ariaLabel}
        className={cn('h-auto gap-1 border-b-0', fill && 'grid w-full')}
        style={
          fill ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined
        }
      >
        {items.map((item) => {
          const triggerClassName =
            'group rounded-md px-3 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:after:hidden';

          return item.href ? (
            <TabsTrigger
              key={item.value}
              value={item.value}
              asChild
              className={triggerClassName}
            >
              <Link href={item.href}>
                <SectionTabContent item={item} />
              </Link>
            </TabsTrigger>
          ) : (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={triggerClassName}
            >
              <SectionTabContent item={item} />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
}
