'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteSetting } from '@/types';

const SiteSettingsContext = createContext<SiteSetting | null | undefined>(undefined);

export function SiteSettingsProvider({
  setting,
  children,
}: {
  setting: SiteSetting | null;
  children: ReactNode;
}) {
  return <SiteSettingsContext.Provider value={setting}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSetting(): SiteSetting | null {
  const setting = useContext(SiteSettingsContext);
  if (setting === undefined) throw new Error('useSiteSetting requires SiteSettingsProvider.');
  return setting;
}
