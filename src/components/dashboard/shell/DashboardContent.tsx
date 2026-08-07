import type { ReactNode } from 'react';

export function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      {children}
    </main>
  );
}
