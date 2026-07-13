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
    <section className="mx-auto w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <Icon className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-normal text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}
