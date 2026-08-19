'use client';

import { useTheme } from 'next-themes';
import { Toaster, type ToasterProps } from 'sonner';

export function AppToaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Toaster
      theme={theme as ToasterProps['theme']}
      position="bottom-center"
      richColors
      closeButton
      {...props}
    />
  );
}
