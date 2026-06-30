import type { ReactNode } from 'react';

export function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="dashboard-shell__content"
    >
      {children}
    </main>
  );
}
