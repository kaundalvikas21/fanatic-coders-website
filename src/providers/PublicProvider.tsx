'use client';

import type { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SWRConfig } from 'swr';
import { AppToaster } from '@/components/shared/app-toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { swrConfig } from '@/lib/swr-fetcher';
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
          <SWRConfig value={swrConfig}>
            <NuqsAdapter>{children}</NuqsAdapter>
          </SWRConfig>
        </AuthProvider>
        <AppToaster />
      </ThemeProvider>
    </>
  );
}
