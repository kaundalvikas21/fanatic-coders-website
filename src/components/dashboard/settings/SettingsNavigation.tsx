'use client';

import { usePathname } from 'next/navigation';
import { Bell, UserRound } from 'lucide-react';
import { SectionTabs } from '@/components/shared/section-tabs';

const SETTINGS_TABS = [
  { value: 'profile', label: 'Profile', href: '/dashboard/settings/profile', Icon: UserRound },
  {
    value: 'notifications',
    label: 'Notifications',
    href: '/dashboard/settings/notifications',
    Icon: Bell,
  },
] as const;

export function SettingsNavigation() {
  const pathname = usePathname();
  const activeTab = SETTINGS_TABS.find((tab) => pathname.startsWith(tab.href))?.value ?? 'profile';

  return (
    <SectionTabs
      value={activeTab}
      items={SETTINGS_TABS}
      ariaLabel="Settings sections"
    />
  );
}
