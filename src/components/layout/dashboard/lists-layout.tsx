import type { ReactNode } from 'react';

type ListsLayoutProps = {
  header?: ReactNode;
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
