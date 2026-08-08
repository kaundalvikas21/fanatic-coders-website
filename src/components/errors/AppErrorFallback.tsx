'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';

type AppErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function AppErrorFallback({ error, reset }: AppErrorFallbackProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-12 text-foreground">
      <WidgetCard
        icon={AlertTriangle}
        title="Something went wrong"
        description="We could not load this page. Try again, or return to the home page if the problem continues."
        variant="destructive"
        className="w-full max-w-lg"
        contentClassNames="space-y-6"
      >
        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground">Error ID: {error.digest}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={reset}
          >
            <RotateCcw data-icon="inline-start" />
            Try again
          </Button>
        </div>
      </WidgetCard>
    </main>
  );
}
