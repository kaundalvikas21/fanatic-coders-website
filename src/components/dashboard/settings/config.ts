import { Bell, Globe2, ShieldCheck, UserRound } from 'lucide-react';

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

export const SITE_SETTINGS_TAB = {
  value: 'site',
  label: 'Site',
  href: '/dashboard/settings/site',
  Icon: Globe2,
} as const;
