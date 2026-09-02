'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useClient } from '@/hooks/useClient';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

type ActionSheetProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
};

export function ActionSheet({
  trigger,
  title,
  description,
  children,
  onOpenChange,
  contentClassName,
}: ActionSheetProps) {
  const isClient = useClient();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const value = useMemo(
    () => ({
      open,
      setOpen,
      close,
    }),
    [open],
  );

  if (!isClient) {
    return trigger;
  }

  return (
    <SheetContext.Provider value={value}>
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
      >
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          className={cn(
            'dashboard-glow-surface data-[side=right]:inset-y-3 data-[side=right]:right-3 data-[side=right]:h-auto data-[side=right]:w-[calc(100%-1.5rem)] data-[side=right]:rounded-xl ease-[cubic-bezier(0.22,1,0.36,1)] sm:data-[side=right]:w-3/4 data-[side=right]:data-open:slide-in-from-right-full data-[side=right]:data-closed:slide-out-to-right-full data-open:duration-300 data-closed:duration-200 [[data-slot=sheet-overlay]:has(~_&)]:duration-100 motion-reduce:duration-0',
            contentClassName,
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const context = useContext(SheetContext);

  if (!context) {
    throw new Error('useSheet must be used inside ActionSheet.');
  }

  return context;
}

export function ActionSheetButton({
  children,
  type = 'button',
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
}
