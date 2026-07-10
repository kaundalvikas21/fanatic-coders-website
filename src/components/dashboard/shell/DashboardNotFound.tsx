import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';

type DashboardNotFoundProps = {
  title?: string;
  description?: string;
};

export function DashboardNotFound({
  title = 'Page not found',
  description = 'The dashboard page you requested does not exist.',
}: DashboardNotFoundProps) {
  return (
    <section className="flex min-h-[60svh] items-center justify-center px-4 py-12">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-5 flex size-12 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
          <SearchX className="size-5" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <Button
          asChild
          className="mt-6"
        >
          <Link href="/dashboard">
            <Home className="size-4" />
            Dashboard
          </Link>
        </Button>
      </div>
    </section>
  );
}
