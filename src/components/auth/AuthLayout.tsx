import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type AuthLayoutProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
};

// Shared auth form layout; individual auth flows own their fields and submit behavior.
export function AuthLayout({ title, description, icon: Icon, children }: AuthLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <Icon
            className="size-5"
            aria-hidden
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-white">{title}</h2>
          <p className="mt-2 max-w-[38ch] text-base font-medium leading-6 tracking-[0.01em] text-slate-300">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}
