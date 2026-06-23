"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/hooks/useScrollSpy"

export interface TocItem {
  id: string
  label: string
}

/**
 * Sticky table of contents with scroll-spy. Highlights the section nearest the
 * top of the viewport. Anchors use native hash links; the consumer hides this
 * below `lg`.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const active = useScrollSpy(ids)

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page">
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-blue-100/70 mb-3">On this page</div>
      <ul className="space-y-1 border-l border-white/10">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block border-l-2 -ml-px pl-4 py-1 text-sm transition-colors",
                  isActive
                    ? "border-indigo-400 text-white"
                    : "border-transparent text-blue-100/55 hover:text-blue-100/85"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
