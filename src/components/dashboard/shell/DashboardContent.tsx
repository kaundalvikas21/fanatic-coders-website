import type { ReactNode } from 'react';

export function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="dashboard-canvas mx-auto flex w-full max-w-[105rem] flex-1 flex-col gap-6 rounded-l-lg px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      {children}
    </main>
  );
}
