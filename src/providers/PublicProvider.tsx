'use client';

import type { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AppToaster } from '@/components/shared/app-toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/providers/AuthProvider';

type PublicProviderProps = {
  children: ReactNode;
};

export function PublicProvider({ children }: PublicProviderProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </AuthProvider>
        <AppToaster />
      </ThemeProvider>
    </>
  );
}
