import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Unauthorized | fanaticCoders',
};

export default function UnauthorizedPage() {
  return (
    <section className="mx-auto w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-red-300/20 bg-red-400/10 text-red-100">
          <ShieldAlert className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-normal text-white">Unauthorized</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Your account cannot access this resource.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Go to dashboard
        </Link>
        <Link
          href="/login"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
        >
          Sign in again
        </Link>
      </div>
    </section>
  );
}
