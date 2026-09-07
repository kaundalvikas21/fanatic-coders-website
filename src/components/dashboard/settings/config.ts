import { Bell, ShieldCheck, UserRound } from 'lucide-react';

export const SETTINGS_TABS = [
  { value: 'profile', label: 'Profile', href: '/dashboard/settings/profile', Icon: UserRound },
  {
    value: 'security',
    label: 'Security',
    href: '/dashboard/settings/security',
    Icon: ShieldCheck,
  },
  {
    value: 'notifications',
    label: 'Notifications',
    href: '/dashboard/settings/notifications',
    Icon: Bell,
  },
] as const;
