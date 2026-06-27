'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  error?: boolean;
  className?: string;
}

/**
 * Accessible custom listbox. Replaces the native <select> so the menu can match the
 * dark Aurora theme. Keyboard, click-outside, and focus return are handled in-component.
 */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  ariaLabel,
  error = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const reactId = useId();
  const baseId = id ?? reactId;
  const listId = `${baseId}-listbox`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  function openMenu(toIndex?: number) {
    setActiveIndex(toIndex ?? (selectedIndex >= 0 ? selectedIndex : 0));
    setOpen(true);
  }

  function closeMenu(refocus = true) {
    setOpen(false);
    setActiveIndex(-1);
    if (refocus) buttonRef.current?.focus();
  }

  function pick(index: number) {
    const opt = options[index];
    if (!opt) return;
    onChange(opt.value);
    closeMenu();
  }

  // Close on outside pointer.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) closeMenu(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const node = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    node?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp') {
      e.preventDefault();
      openMenu();
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) pick(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu(false);
        break;
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
    >
      <button
        ref={buttonRef}
        type="button"
        id={baseId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onButtonKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl bg-white/5 px-4 py-3 text-left text-sm',
          'border outline-none transition-colors hover:border-white/20',
          'focus-visible:border-[var(--aurora-violet-light)]/70 focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)]/30 focus-visible:bg-white/[0.07]',
          error ? 'border-red-400/60' : 'border-white/10',
        )}
      >
        <span
          className={cn('truncate', selected ? 'text-white' : 'text-[var(--color-text-muted)]')}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={cn(
            'shrink-0 text-[var(--color-text-muted)] transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined}
          onKeyDown={onListKeyDown}
          autoFocus
          className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[var(--dark-2)] p-1.5 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md outline-none [scrollbar-width:thin]"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={opt.value}
                id={`${baseId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pick(i)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-indigo-500/15 text-white' : 'text-blue-100/80',
                  isSelected && 'text-indigo-200',
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check
                    size={15}
                    aria-hidden
                    className="shrink-0 text-indigo-300"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
