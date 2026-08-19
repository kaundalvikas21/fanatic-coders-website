import type { ReactNode } from 'react';

type ListsLayoutProps = {
  header?: ReactNode;
  children: ReactNode;
};

type FilterLayoutProps = {
  filters: ReactNode;
  children: ReactNode;
};

export function ListsLayout({ header, children }: ListsLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {header}
      {children}
    </div>
  );
}

export function FilterLayout({ filters, children }: FilterLayoutProps) {
  return (
    <div className="flex flex-col gap-0">
      {filters}
      <div className="-mt-px [&_.overflow-hidden]:rounded-t-none">{children}</div>
    </div>
  );
}
