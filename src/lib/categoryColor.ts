export interface CategoryColor {
  /** Background + text + ring fragment for a filled chip. */
  chip: string
  /** Text-only fragment for a bare label. */
  label: string
}

// One aurora hue per topic. Class strings are literal so Tailwind keeps them.
const CATEGORY_COLOR: Record<string, CategoryColor> = {
  Engineering: { chip: "bg-violet-500/15 text-violet-200 ring-violet-400/30", label: "text-violet-300" },
  Design: { chip: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/30", label: "text-cyan-300" },
  Growth: { chip: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30", label: "text-emerald-300" },
  Company: { chip: "bg-blue-500/15 text-blue-200 ring-blue-400/30", label: "text-blue-300" },
}

const FALLBACK: CategoryColor = {
  chip: "bg-indigo-500/15 text-indigo-200 ring-indigo-400/30",
  label: "text-indigo-300",
}

export function categoryColor(category: string): CategoryColor {
  return CATEGORY_COLOR[category] ?? FALLBACK
}
