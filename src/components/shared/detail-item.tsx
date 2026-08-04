import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type DetailItemProps = {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
};

export function DetailItem({
  label,
  value,
  icon: Icon,
  className,
  iconClassName,
  contentClassName,
}: DetailItemProps) {
  return (
    <div className={cn('flex flex-col gap-1 rounded-lg border p-4', className)}>
      {Icon && (
        <div
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary',
            iconClassName,
          )}
        >
          <Icon
            className="size-4"
            aria-hidden="true"
          />
        </div>
      )}
      <div className={cn('min-w-0 flex-1', contentClassName)}>
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="mt-1 break-words font-medium">{value}</dd>
      </div>
    </div>
  );
}
