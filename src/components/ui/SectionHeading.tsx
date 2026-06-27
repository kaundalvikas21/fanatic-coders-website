import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Rose code-chip eyebrow text, e.g. "about.module" (the </> wraps are added by CSS). */
  badge: string;
  /**
   * Mono headline. Pass inline spans for accents, mirroring the home pattern:
   * `<>who.<span className="function">weAre</span>()</>`
   * (`.function` = indigo-400, `.params` = pink-400).
   */
  title: ReactNode;
  /** Optional `// comment`-style subheading line. */
  comment?: string;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Shared section header — the `.preheading-code` + `.heading-code` + `.subheading-code`
 * block repeated across every home section. Pure markup (server component); wrap in
 * `RevealSection` for the scroll-in animation.
 */
export function SectionHeading({
  badge,
  title,
  comment,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      <div className="preheading-code">{badge}</div>
      <h2 className="heading-code mt-2">{title}</h2>
      {comment && (
        <p className={cn('subheading-code mt-3', align === 'left' && '!mx-0')}>{comment}</p>
      )}
    </div>
  );
}
