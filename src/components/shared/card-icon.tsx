import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type CardIconProps = {
  icon: LucideIcon;
  variant?: 'default' | 'destructive';
  className?: string;
};

export function CardIcon({ icon: Icon, variant = 'default', className }: CardIconProps) {
  const isDestructive = variant === 'destructive';

  return (
    <div
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-[background-color,box-shadow] duration-200',
        isDestructive
          ? 'bg-destructive/10 shadow-sm shadow-destructive/20 ring-destructive/25 group-hover/card:bg-destructive/15 group-hover/card:shadow-md group-hover/card:shadow-destructive/25 group-hover/card:ring-destructive/40'
          : 'bg-primary/10 shadow-sm shadow-primary/20 ring-primary/25 group-hover/card:bg-primary/15 group-hover/card:shadow-md group-hover/card:shadow-primary/25 group-hover/card:ring-primary/40',
        className,
      )}
    >
      <Icon
        className={cn('size-5', isDestructive ? 'text-destructive' : 'text-primary')}
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </div>
  );
}
