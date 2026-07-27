'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useSession } from '@/lib/auth/client';

type SessionQuery = ReturnType<typeof useSession>;

type AuthContextValue = {
  session: SessionQuery['data'];
  isPending: SessionQuery['isPending'];
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const value = useMemo(
    () => ({
      session,
      isPending,
      isAuthenticated: Boolean(session?.user),
    }),
    [isPending, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}
