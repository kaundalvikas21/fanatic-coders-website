import type { ReactNode } from 'react';

type DashboardOverviewHeaderProps = {
  title: string;
  description: string;
  statusLabel: string;
  meta?: string;
  actions?: ReactNode;
};

export function DashboardOverviewHeader({
  title,
  description,
  statusLabel,
  meta,
  actions,
}: DashboardOverviewHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-primary/20 bg-card/85 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklab,var(--aurora-violet)_16%,transparent),transparent_36%),radial-gradient(circle_at_88%_90%,color-mix(in_oklab,var(--aurora-blue)_12%,transparent),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6875rem]">
            <span className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-primary">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-current" />
              </span>
              {statusLabel}
            </span>
            {meta && <span className="text-muted-foreground">{meta}</span>}
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </section>
  );
}
