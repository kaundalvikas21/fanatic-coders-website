'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useClient } from '@/hooks/useClient';
import { cn } from '@/lib/utils';

type DialogContextValue = {
  close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

type ActionDialogProps = {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  description?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
};

export function ActionDialog({
  title,
  children,
  trigger,
  description,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  contentClassName,
}: ActionDialogProps) {
  const isClient = useClient();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );
  const close = useCallback(() => setOpen(false), [setOpen]);
  const value = useMemo(() => ({ close }), [close]);

  if (!isClient) return trigger ?? null;

  return (
    <DialogContext.Provider value={value}>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
        <DialogContent className={cn('dashboard-glow-surface ring-0', contentClassName)}>
          <DialogHeader className="pr-8">
            <DialogTitle>{title}</DialogTitle>
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}

export function useActionDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useActionDialog must be used within ActionDialog.');
  }

  return context;
}
