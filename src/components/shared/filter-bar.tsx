import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FilterBarProps = {
  children: ReactNode;
  className?: string;
};

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/80 bg-card/80 px-3 py-6 shadow-sm transition-colors duration-200',
        'rounded-b-none border-b-0 shadow-none',
        className,
      )}
    >
      {children}
    </div>
  );
}
