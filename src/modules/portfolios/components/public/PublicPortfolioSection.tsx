import type { ReactNode } from 'react';

export function PublicPortfolioSection({
  children,
  tone,
}: {
  children: ReactNode;
  tone: '--dark-1' | '--dark-2';
}) {
  return (
    <section
      className="relative overflow-hidden section-y"
      style={{ background: `var(${tone})` }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function PublicPortfolioHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <div className="preheading-code">{eyebrow}</div>
      <h2 className="font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
    </>
  );
}
