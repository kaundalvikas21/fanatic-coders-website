import { cn } from "@/lib/utils"

export interface StatProps {
  value: string
  label: string
  /** Optional supporting line under the label. */
  hint?: string
  className?: string
}

/**
 * Single metric tile. Big mono value over a muted label. Glass surface, glow at
 * rest (no hard drop shadow), used in case-study and service proof bands.
 */
export function Stat({ value, label, hint, className }: StatProps) {
  return (
    <div className={cn("glass-card-md rounded-2xl p-5 text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold font-mono tabular-nums text-white">{value}</div>
      <div className="mt-1.5 text-xs font-mono text-blue-100/55">{label}</div>
      {hint && <div className="mt-1 text-[11px] text-blue-100/40">{hint}</div>}
    </div>
  )
}
