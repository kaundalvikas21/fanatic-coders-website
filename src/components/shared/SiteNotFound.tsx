import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type SiteNotFoundProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  code?: string;
};

export function SiteNotFound({
  title,
  description,
  backHref,
  backLabel,
  code = '404',
}: SiteNotFoundProps) {
  return (
    <section className="hero-shell relative flex min-h-[70svh] items-center overflow-hidden bg-[var(--dark-1)] py-20">
      <div className="aurora-bg-hero pointer-events-none absolute inset-0" />
      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="preheading-code">{code}</p>
        <h1 className="hero-h1 mt-4 text-white">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-blue-100/70">{description}</p>
        <Link
          href={backHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/20 px-5 py-3 text-sm font-medium text-indigo-100 transition-colors hover:bg-indigo-500/30 hover:text-white"
        >
          <ArrowLeft
            size={16}
            aria-hidden
          />
          {backLabel}
        </Link>
      </div>
    </section>
  );
}
