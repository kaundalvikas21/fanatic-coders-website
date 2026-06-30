'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Toggle } from '@/components/ui/toggle';

export function DashboardThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={isDark}
      variant="outline"
      size="sm"
      onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
    >
      {isDark ? <Moon /> : <Sun />}
    </Toggle>
  );
}
