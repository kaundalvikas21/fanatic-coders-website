'use client';

import Link from 'next/link';
import { LayoutDashboard, LogIn } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { useAuth } from '@/providers/AuthProvider';

type HeaderAuthActionProps = {
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export function HeaderAuthAction({ variant, onNavigate }: HeaderAuthActionProps) {
  const { isAuthenticated, isPending } = useAuth();
  const href = isAuthenticated ? '/dashboard' : '/login';
  const label = isAuthenticated ? 'Dashboard' : 'Login';
  const Icon = isAuthenticated ? LayoutDashboard : LogIn;

  if (variant === 'mobile') {
    if (isPending) {
      return (
        <div
          className="mobile-row"
          role="status"
        >
          <span className="flex items-center gap-2.5 text-white/55">
            <span
              className="h-4 w-4 animate-pulse rounded bg-white/10"
              aria-hidden
            />
            Checking session…
          </span>
        </div>
      );
    }

    return (
      <Link
        href={href}
        className="mobile-row"
        onClick={onNavigate}
      >
        <span className="flex items-center gap-2.5">
          <Icon
            size={17}
            className="text-(--aurora-violet-light)"
            aria-hidden
          />
          {label}
        </span>
      </Link>
    );
  }

  if (isPending) {
    return (
      <span
        className="block h-9 w-24 animate-pulse rounded-lg bg-white/10"
        aria-label="Checking session"
      />
    );
  }

  return (
    <GradientButton
      href={href}
      variant="secondary"
      size="sm"
    >
      {label}
    </GradientButton>
  );
}
