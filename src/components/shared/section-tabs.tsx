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
  variant?: 'default' | 'iconFocus';
};

function SectionTabContent({
  item,
  variant,
}: {
  item: SectionTabItem;
  variant: NonNullable<SectionTabsProps['variant']>;
}) {
  return (
    <>
      <item.Icon
        className={cn(
          'size-4',
          variant === 'iconFocus' &&
            'size-7 rounded-md bg-muted p-1.5 text-muted-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
        )}
        aria-hidden="true"
      />
      <span className={cn(item.compactLabel && 'hidden sm:inline')}>{item.label}</span>
      {item.count !== undefined ? (
        <span
          className={cn(
            'rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none tabular-nums text-muted-foreground',
            variant === 'iconFocus'
              ? 'group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary'
              : 'group-data-[state=active]:bg-primary-foreground/15 group-data-[state=active]:text-primary-foreground',
          )}
        >
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
  variant = 'default',
  className,
  ...props
}: SectionTabsProps) {
  return (
    <Tabs
      className={cn('min-w-0 max-w-full gap-5', className)}
      {...props}
    >
      <TabsList
        aria-label={ariaLabel}
        className={cn(
          'scrollbar-none h-auto max-w-full overflow-x-auto overscroll-x-contain',
          variant === 'iconFocus' ? 'w-fit items-end gap-0.5 border-b-0 pt-1' : 'gap-1 border-b-0',
          fill && 'grid w-full',
        )}
        style={
          fill ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined
        }
      >
        {items.map((item) => {
          const triggerClassName = cn(
            'group px-3',
            variant === 'iconFocus'
              ? 'h-13 rounded-t-[10px] rounded-b-none border-b-2 border-border pl-2.5 pr-4 text-muted-foreground transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:bg-primary/5 hover:text-foreground data-[state=active]:border-x-2 data-[state=active]:border-t-2 data-[state=active]:border-b-0 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:after:hidden dark:data-[state=active]:text-[color-mix(in_oklch,var(--primary)_35%,white)]'
              : 'rounded-md data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:after:hidden',
          );

          return item.href ? (
            <TabsTrigger
              key={item.value}
              value={item.value}
              asChild
              className={triggerClassName}
            >
              <Link href={item.href}>
                <SectionTabContent
                  item={item}
                  variant={variant}
                />
              </Link>
            </TabsTrigger>
          ) : (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={triggerClassName}
            >
              <SectionTabContent
                item={item}
                variant={variant}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
}
