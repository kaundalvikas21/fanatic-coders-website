'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { CurrentAccess, AccessPermissions } from '@/types';

type PermissionContextValue = {
  permissions: AccessPermissions;
  memberId: string;
  role: string;
  can: CurrentAccess['can'];
};

const PermissionContext = createContext<PermissionContextValue | null>(null);

type PermissionProviderProps = {
  permissions: AccessPermissions;
  memberId: string;
  role: string;
  children: ReactNode;
};

export function PermissionProvider({
  permissions,
  memberId,
  role,
  children,
}: PermissionProviderProps) {
  const value: PermissionContextValue = {
    permissions,
    memberId,
    role,
    can(model, operation) {
      return (permissions[model] as readonly string[] | undefined)?.includes(operation) ?? false;
    },
  };

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermissions() {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error('usePermissions must be used inside PermissionProvider.');
  }

  return context;
}
