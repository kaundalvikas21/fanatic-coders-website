'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { LayoutDashboard, Loader2, LogOut, Settings, UsersRound } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth/client';

type DashboardShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/team', label: 'Team', icon: UsersRound },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || 'User';
  return source
    .split(/[ @._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [isPending, router, session]);

  async function handleSignOut() {
    await authClient.signOut();
    router.replace('/login');
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080810] px-4 text-white">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
          <Loader2 className="size-4 animate-spin text-cyan-300" />
          Checking session
        </div>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#080810] text-white"
    >
      <div className="grid min-h-screen lg:grid-cols-[17rem_1fr]">
        <aside className="border-b border-white/10 bg-black/20 px-4 py-4 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Link
              href="/"
              className="font-mono text-sm font-bold text-white"
            >
              fanaticCoders
            </Link>
            <div className="mt-0 flex items-center gap-3 lg:mt-8">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-sm font-bold text-slate-950">
                {getInitials(user?.name, user?.email)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name || 'Signed in'}
                </p>
                <p className="truncate text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-100"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </aside>

        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</section>
      </div>
    </main>
  );
}
