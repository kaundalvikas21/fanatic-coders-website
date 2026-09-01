'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';

type DashboardNotFoundProps = {
  title?: string;
  description?: string;
};

export function DashboardNotFound({
  title = 'Page not found',
  description = 'We could not find this dashboard page. It may have moved, been removed, or the address may be incorrect.',
}: DashboardNotFoundProps) {
  const router = useRouter();

  return (
    <section
      aria-labelledby="dashboard-not-found-title"
      className="flex min-h-[60svh] items-center px-3 py-8 sm:px-6 sm:py-12"
    >
      <div className="dashboard-not-found-enter relative isolate mx-auto grid w-full max-w-3xl overflow-hidden rounded-xl border border-border/80 bg-card/85 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]">
        <div
          aria-hidden="true"
          className="dashboard-not-found-visual relative hidden min-h-80 overflow-hidden border-r border-border/70 bg-muted/35 md:flex md:items-center md:justify-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_58%)]" />
          <div className="dashboard-not-found-scan pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/65 to-transparent" />
          <span className="font-mono text-8xl font-semibold tracking-[-0.04em] text-primary/15">
            404
          </span>
          <div className="dashboard-not-found-seeker absolute flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_6px_8px_rgb(0_0_0/0.12)]">
            <SearchX className="size-6" />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="dashboard-not-found-seeker mb-5 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary md:hidden"
          >
            <SearchX className="size-5" />
          </div>
          <p className="font-mono text-sm font-medium text-primary">Error 404</p>
          <h1
            id="dashboard-not-found-title"
            className="mt-2 text-2xl font-semibold tracking-normal text-balance text-foreground sm:text-3xl"
          >
            {title}
          </h1>
          <p className="mt-3 max-w-[55ch] text-sm leading-6 text-pretty text-muted-foreground">
            {description}
          </p>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
              onClick={() => router.back()}
            >
              <ArrowLeft data-icon="inline-start" />
              Go back
            </Button>
            <Button
              asChild
              size="lg"
              className="transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <Link href="/dashboard">
                <Home data-icon="inline-start" />
                Dashboard home
              </Link>
            </Button>
          </div>

          <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-5 text-muted-foreground">
            You can also use the sidebar to continue navigating your workspace.
          </p>
        </div>
      </div>
    </section>
  );
}
