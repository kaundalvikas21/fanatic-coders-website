import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type GlassAccent = "violet" | "cyan" | "green" | "plain"

const accentClass: Record<GlassAccent, string> = {
  // violet is the aurora-tinted default surface
  violet: "glass-card-md",
  cyan: "glass-card-cyan",
  green: "glass-card-green",
  plain: "glass-card",
}

interface GlassCardProps extends ComponentPropsWithoutRef<"div"> {
  accent?: GlassAccent
  /** Adds the hover lift + glow (`.card-lift`). */
  lift?: boolean
}

/**
 * Glass surface primitive mapping to the project's `.glass-card*` classes.
 * Use instead of raw shadcn primitives (those resolve to light tokens — see CLAUDE.md).
 */
export function GlassCard({
  accent = "violet",
  lift = false,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(accentClass[accent], lift && "card-lift", "rounded-2xl", className)}
      {...rest}
    >
      {children}
    </div>
  )
}
