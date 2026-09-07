'use client';

import { usePathname } from 'next/navigation';
import { SectionTabs } from '@/components/shared/section-tabs';
import { SETTINGS_TABS } from './config';

export function SettingsNavigation() {
  const pathname = usePathname();
  const activeTab = SETTINGS_TABS.find((tab) => pathname.startsWith(tab.href))?.value ?? 'profile';

  return (
    <SectionTabs
      value={activeTab}
      items={SETTINGS_TABS}
      ariaLabel="Settings sections"
      variant="iconFocus"
    />
  );
}
