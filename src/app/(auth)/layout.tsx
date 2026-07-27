import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#080810] px-4 py-6 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center border-b border-white/10 pb-5">
          <Link
            href="/"
            className="font-mono text-sm font-bold tracking-normal text-white"
          >
            fanaticCoders
          </Link>
        </header>
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="hidden lg:block">
            <p className="font-mono text-sm text-cyan-300">client access</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-normal text-white">
              Sign in to manage client work, tasks, and project updates.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              This frontend connects to your Express Better Auth server through the configured
              backend URL.
            </p>
          </section>
          {children}
        </div>
      </div>
    </main>
  );
}
