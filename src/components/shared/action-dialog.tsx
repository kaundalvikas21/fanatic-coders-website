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

type DialogContextValue = {
  close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

type ActionDialogProps = {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  description?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
};

export function ActionDialog({
  title,
  children,
  trigger,
  description,
  defaultOpen = false,
  onOpenChange,
  contentClassName,
}: ActionDialogProps) {
  const isClient = useClient();
  const [open, setOpenState] = useState(defaultOpen);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      setOpenState(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
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
        <DialogContent className={contentClassName}>
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

export function useOptionalDialog() {
  return useContext(DialogContext);
}
