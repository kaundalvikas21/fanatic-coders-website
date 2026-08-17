import Link from 'next/link';
import { AuthBrandingPanel } from '@/components/auth/AuthBrandingPanel';
import styles from './AuthPageLayout.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className={`${styles.shell} min-h-screen bg-[#080810] text-white lg:p-7`}
    >
      <div className="mx-auto min-h-screen w-full max-w-[90rem] lg:min-h-[calc(100vh-3.5rem)]">
        <header className="flex items-center px-5 py-5 lg:hidden">
          <Link
            href="/"
            className="text-base font-bold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-cyan-200"
          >
            <span className="font-mono text-white/70">{'{'}</span>
            fanaticCoders
            <span className="font-mono text-white/70">{'}'}</span>
          </Link>
        </header>
        <div className="grid min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-3.5rem)] lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
          <AuthBrandingPanel />
          <div
            className={`${styles.panel} flex items-start px-5 py-12 sm:px-12 lg:items-center lg:px-[clamp(3rem,7vw,7rem)]`}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
