'use client';

import type { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type ActionCollapsibleProps = {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
};

export function ActionCollapsible({
  trigger,
  children,
  defaultOpen = false,
  className,
  contentClassName,
  onOpenChange,
}: ActionCollapsibleProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className={cn('group/collapsible', className)}
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      <CollapsibleContent className={contentClassName}>{children}</CollapsibleContent>
    </Collapsible>
  );
}
