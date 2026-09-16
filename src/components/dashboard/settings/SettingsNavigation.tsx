'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SectionTabs } from '@/components/shared/section-tabs';
import { SETTINGS_TABS } from './config';

export function SettingsNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeTab = SETTINGS_TABS.find((tab) => pathname.startsWith(tab.href))?.value ?? 'profile';

  return (
    <SectionTabs
      value={activeTab}
      items={SETTINGS_TABS}
      ariaLabel="Settings sections"
      variant="folder"
    >
      {children}
    </SectionTabs>
  );
}
