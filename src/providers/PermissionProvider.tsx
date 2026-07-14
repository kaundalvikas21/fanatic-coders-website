'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { AccessModel, AccessOperation, AccessPermissions } from '@/types';

type PermissionContextValue = {
  permissions: AccessPermissions;
  can: (model: AccessModel, operation: AccessOperation) => boolean;
};

const PermissionContext = createContext<PermissionContextValue | null>(null);

type PermissionProviderProps = {
  permissions: AccessPermissions;
  children: ReactNode;
};

export function PermissionProvider({ permissions, children }: PermissionProviderProps) {
  const value: PermissionContextValue = {
    permissions,
    can(model, operation) {
      return permissions[model]?.includes(operation) ?? false;
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
