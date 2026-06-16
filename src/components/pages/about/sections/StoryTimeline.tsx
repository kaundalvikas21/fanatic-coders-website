"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Phase = "idle" | "exiting" | "entering"

export interface StoryMilestone {
  year: string
  label: string
  title: string
  body: string
}

/**
 * Click-through story timeline: a vertical year rail (tablist) on the left and an
 * animated story panel (tabpanel) on the right. Mirrors FaqInteractive's three-phase
 * swap (idle -> exiting -> entering) and reuses the panelExit/panelEnter keyframes.
 * Below lg the rail becomes a horizontal year strip above the panel.
 */
export function StoryTimeline({ items }: { items: StoryMilestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  function select(i: number) {
    if (i === activeIndex || phase !== "idle") return
    setActiveIndex(i)
    if (reduced.current) {
      setDisplayIndex(i)
      return
    }
    setPhase("exiting")
    setTimeout(() => {
      setDisplayIndex(i)
      setPhase("entering")
      setTimeout(() => setPhase("idle"), 420)
    }, 180)
  }

  if (items.length === 0) return null
  const active = items[displayIndex]

  return (
    <div className="mt-12 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Year rail */}
      <div
        role="tablist"
        aria-label="Company timeline"
        className="relative flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
      >
        {/* Desktop connector spine */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[7px] top-3 bottom-3 hidden w-px bg-white/10 lg:block"
        />
        {items.map((m, i) => {
          const isActive = activeIndex === i
          return (
            <button
              key={m.year}
              type="button"
              role="tab"
              id={`story-tab-${i}`}
              aria-selected={isActive}
              aria-controls="story-panel"
              onClick={() => select(i)}
              className="group relative flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors lg:shrink lg:py-3.5 lg:pl-0 lg:pr-3"
            >
              <span
                aria-hidden
                className={cn(
                  "relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border transition-all duration-300",
                  isActive
                    ? "border-transparent bg-[var(--aurora-violet-light)] shadow-[0_0_0_4px_rgba(124,58,237,0.25)]"
                    : "border-white/25 bg-[var(--dark-1)] group-hover:border-white/50"
                )}
              />
              <span className="flex flex-col">
                <span
                  className={cn(
                    "font-mono text-base font-bold tabular-nums transition-colors",
                    isActive ? "text-white" : "text-blue-100/55 group-hover:text-blue-100/80"
                  )}
                >
                  {m.year}
                </span>
                <span
                  className={cn(
                    "text-xs transition-colors",
                    isActive ? "text-[var(--aurora-violet-light)]" : "text-blue-100/40 group-hover:text-blue-100/60"
                  )}
                >
                  {m.label}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Story panel — terminal-style log viewer */}
      <div
        id="story-panel"
        role="tabpanel"
        aria-labelledby={`story-tab-${activeIndex}`}
        className="terminal-card mt-6 lg:mt-0"
      >
        <div className="terminal-bar">
          <div className="flex items-center gap-2">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="ml-3 font-mono text-xs text-white/50">story/{active.year}.log</span>
        </div>

        <div
          className={cn(
            "story-panel min-h-[230px] p-6 md:p-8",
            phase === "exiting" && "is-exiting",
            phase === "entering" && "is-entering"
          )}
        >
          <p className="font-mono text-sm text-white/35" aria-hidden>
            {">"} cat story/{active.year}.log
          </p>
          <p className="mt-5 font-mono text-sm text-[#a855f7]">
            # {active.year} · {active.label}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
            <span className="text-aurora-sweep">{active.title}</span>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-blue-100/70 md:text-lg">{active.body}</p>
        </div>
      </div>
    </div>
  )
}
