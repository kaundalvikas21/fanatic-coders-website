'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible disclosure list. Each row is a button[aria-expanded] controlling a
 * region; the open panel animates via grid-rows (reduced-motion safe through the
 * stylesheet's global transition collapse).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div
            key={item.q}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/3"
              >
                <span className="text-sm md:text-base font-semibold text-white">{item.q}</span>
                <Plus
                  size={18}
                  aria-hidden
                  className={cn(
                    'shrink-0 text-indigo-300 transition-transform duration-300',
                    isOpen && 'rotate-45',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 -mt-1"
            >
              <p className="text-sm text-blue-100/70 leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
