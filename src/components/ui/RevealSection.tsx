'use client';

import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface RevealSectionProps extends ComponentPropsWithoutRef<'div'> {
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  /**
   * Stagger direct children instead of revealing as one block
   * (`.reveal-stagger`, 60ms steps, up to 6 children).
   */
  stagger?: boolean;
  /** IntersectionObserver visibility threshold (0–1). */
  threshold?: number;
}

/**
 * Scroll-reveal wrapper. Applies `.reveal` (or `.reveal-stagger`); the
 * `useScrollReveal` hook adds `.visible` once it enters the viewport.
 */
export function RevealSection({
  as: Tag = 'div',
  stagger = false,
  threshold = 0.15,
  className,
  children,
  ...rest
}: RevealSectionProps) {
  const ref = useScrollReveal<HTMLElement>({ threshold });

  return (
    <Tag
      ref={ref}
      className={cn(stagger ? 'reveal-stagger' : 'reveal', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
