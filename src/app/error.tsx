'use client';

import { useEffect } from 'react';
import { AppErrorFallback } from '@/components/errors/AppErrorFallback';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppErrorFallback
      error={error}
      reset={reset}
    />
  );
}
