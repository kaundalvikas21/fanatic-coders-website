'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, UserRound } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <Tabs value={activeTab}>
      <TabsList aria-label="Settings sections">
        {SETTINGS_TABS.map(({ value, label, href, Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            asChild
          >
            <Link href={href}>
              <Icon className="size-4" />
              {label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
