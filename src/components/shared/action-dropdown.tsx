'use client';

import type { ComponentProps, ReactNode, Ref } from 'react';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type ActionDropdownProps = {
  children: ReactNode;
  trigger?: ReactNode;
  triggerRef?: Ref<HTMLButtonElement>;
  label?: string;
  ariaLabel?: string;
  align?: ComponentProps<typeof DropdownMenuContent>['align'];
  contentClassName?: string;
  onCloseAutoFocus?: ComponentProps<typeof DropdownMenuContent>['onCloseAutoFocus'];
};

export function ActionDropdown({
  children,
  trigger,
  triggerRef,
  label = 'Actions',
  ariaLabel = 'Open actions',
  align = 'end',
  contentClassName,
  onCloseAutoFocus,
}: ActionDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer disabled:cursor-default"
      >
        {trigger ?? (
          <Button
            ref={triggerRef}
            type="button"
            variant="ghost"
            size="icon"
            aria-label={ariaLabel}
          >
            <Ellipsis />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn(
          'w-44 [&_[role^=menuitem]:not([data-disabled])]:cursor-pointer',
          contentClassName,
        )}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        {label ? (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
