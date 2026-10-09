'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SectionTabs } from '@/components/shared/section-tabs';
import { usePermissions } from '@/providers/PermissionProvider';
import { SETTINGS_TABS, SITE_SETTINGS_TAB } from './config';

export function SettingsNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { can } = usePermissions();
  const tabs = can('siteSetting', 'update') ? [...SETTINGS_TABS, SITE_SETTINGS_TAB] : SETTINGS_TABS;
  const activeTab = tabs.find((tab) => pathname.startsWith(tab.href))?.value ?? 'profile';

  return (
    <SectionTabs
      value={activeTab}
      items={tabs}
      ariaLabel="Settings sections"
      variant="folder"
    >
      {children}
    </SectionTabs>
  );
}
