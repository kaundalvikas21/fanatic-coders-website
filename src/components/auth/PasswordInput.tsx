'use client';

import { useToggle } from '@uidotdev/usehooks';
import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'>;

export function PasswordInput({ className, disabled, ...props }: PasswordInputProps) {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);
  const label = isPasswordVisible ? 'Hide password' : 'Show password';

  return (
    <div className="relative">
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        className={cn(className, 'pr-11')}
        disabled={disabled}
        {...props}
      />
      <button
        type="button"
        className="absolute right-0 bottom-0 flex h-11 w-11 items-center justify-center rounded-r-lg text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300/60 disabled:pointer-events-none disabled:opacity-50"
        aria-label={label}
        aria-pressed={isPasswordVisible}
        title={label}
        disabled={disabled}
        onClick={() => togglePasswordVisibility()}
      >
        {isPasswordVisible ? (
          <EyeOff
            aria-hidden="true"
            className="size-4"
          />
        ) : (
          <Eye
            aria-hidden="true"
            className="size-4"
          />
        )}
      </button>
    </div>
  );
}
