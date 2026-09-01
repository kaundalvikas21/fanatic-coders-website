import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DetailPageLayoutProps = {
  children: ReactNode;
  className?: string;
};

type DetailPageLayoutSlotProps = {
  children: ReactNode;
  className?: string;
};

function DetailPageLayoutRoot({ children, className }: DetailPageLayoutProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function DetailPageLayoutMain({ children, className }: DetailPageLayoutSlotProps) {
  return <div className={cn('flex min-w-0 flex-col gap-6', className)}>{children}</div>;
}

function DetailPageLayoutAside({ children, className }: DetailPageLayoutSlotProps) {
  return <aside className={cn('flex h-full min-w-0 flex-col gap-6', className)}>{children}</aside>;
}

export const DetailPageLayout = Object.assign(DetailPageLayoutRoot, {
  Main: DetailPageLayoutMain,
  Aside: DetailPageLayoutAside,
});
