import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, LogIn, type LucideIcon, UserPlus } from 'lucide-react';

type AuthLayoutProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
};

// Shared auth form layout; individual auth flows own their fields and submit behavior.
export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  const isSignup = title.startsWith('Create');

  return (
    <div className="mx-auto w-full max-w-md">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      >
        <ArrowLeft
          className="size-4"
          aria-hidden
        />
        Back to website
      </Link>
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d1f]">
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white">{title}</h2>
            <p className="mt-3 max-w-[42ch] text-base font-medium leading-6 tracking-[0.01em] text-[#aab2d4]">
              {description}
            </p>
          </div>

          {children}

          <nav
            className="mt-7 flex items-center justify-center gap-6 border-t border-white/10 pt-5"
            aria-label="Account access"
          >
            <Link
              href="/login"
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${!isSignup ? 'text-cyan-300' : 'text-slate-400 hover:text-white'}`}
            >
              <LogIn
                className="size-4"
                aria-hidden
              />
              Sign in
            </Link>
            <Link
              href="/signup"
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${isSignup ? 'text-cyan-300' : 'text-slate-400 hover:text-white'}`}
            >
              <UserPlus
                className="size-4"
                aria-hidden
              />
              Sign up
            </Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
