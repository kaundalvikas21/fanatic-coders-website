"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

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
  const [active, setActive] = useState(items[0]?.id ?? "")

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-blue-100/40 mb-3">On this page</div>
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
