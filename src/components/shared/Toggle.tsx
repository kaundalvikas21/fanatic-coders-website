'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Toggle } from '@/components/ui/toggle';
import { useClient } from '@/hooks/useClient';

export function ThemeToggle() {
  const isClient = useClient();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!isClient) {
    return (
      <Toggle
        variant="outline"
        size="lg"
        pressed={false}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="scale-100 rotate-0 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Toggle>
    );
  }

  return (
    <Toggle
      variant="outline"
      size="lg"
      pressed={isDark}
      aria-label="Toggle theme"
      onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
