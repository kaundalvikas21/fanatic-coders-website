import Link from 'next/link';
import { AuthBrandingPanel } from '@/components/auth/AuthBrandingPanel';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className="auth-shell min-h-screen bg-[#080810] px-4 py-6 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center border-b border-white/10 pb-5">
          <Link
            href="/"
            className="text-base font-bold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-cyan-200"
          >
            <span className="font-mono text-white/70">{'{'}</span>
            fanaticCoders
            <span className="font-mono text-white/70">{'}'}</span>
          </Link>
        </header>
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <AuthBrandingPanel />
          <div className="auth-panel">{children}</div>
        </div>
      </div>
    </main>
  );
}
