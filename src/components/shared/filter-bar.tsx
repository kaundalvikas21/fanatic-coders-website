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
        'dashboard-glow-surface rounded-xl px-3 py-6 transition-[border-color,background-color,box-shadow] duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
}
