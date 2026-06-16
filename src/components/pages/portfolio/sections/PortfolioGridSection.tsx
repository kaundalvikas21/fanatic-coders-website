"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CSSProperties } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { projects } from "../data"

// Two-letter monogram for the image fallback (e.g. "Northwind Commerce" -> "Nc").
function initials(title: string): string {
  const words = title.trim().split(/\s+/)
  const raw = words.length > 1 ? words[0][0] + words[1][0] : title.slice(0, 2)
  return raw[0].toUpperCase() + (raw[1] ?? "").toLowerCase()
}

// Per-card accent cycled by index: drives the placeholder gradient, the resting border tint,
// and the hover pop (colored border + colored shadow).
const accents = [
  { grad: "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.18))", border: "rgba(124,58,237,0.28)", hover: "rgba(124,58,237,0.5)", dot: "rgb(167,139,250)", glow: "0 0 30px rgba(124,58,237,0.25)" },
  { grad: "linear-gradient(135deg, rgba(37,99,235,0.32), rgba(6,182,212,0.18))", border: "rgba(37,99,235,0.28)", hover: "rgba(37,99,235,0.5)", dot: "rgb(96,165,250)", glow: "0 0 30px rgba(37,99,235,0.25)" },
  { grad: "linear-gradient(135deg, rgba(6,182,212,0.32), rgba(16,185,129,0.18))", border: "rgba(6,182,212,0.28)", hover: "rgba(6,182,212,0.5)", dot: "rgb(34,211,238)", glow: "0 0 30px rgba(6,182,212,0.25)" },
  { grad: "linear-gradient(135deg, rgba(16,185,129,0.32), rgba(124,58,237,0.16))", border: "rgba(16,185,129,0.28)", hover: "rgba(16,185,129,0.5)", dot: "rgb(52,211,153)", glow: "0 0 30px rgba(16,185,129,0.25)" },
  { grad: "linear-gradient(135deg, rgba(244,63,94,0.28), rgba(168,85,247,0.18))", border: "rgba(244,63,94,0.28)", hover: "rgba(244,63,94,0.5)", dot: "rgb(251,113,133)", glow: "0 0 30px rgba(244,63,94,0.25)" },
  { grad: "linear-gradient(135deg, rgba(245,158,11,0.26), rgba(244,63,94,0.16))", border: "rgba(245,158,11,0.28)", hover: "rgba(245,158,11,0.5)", dot: "rgb(251,191,36)", glow: "0 0 30px rgba(245,158,11,0.25)" },
]

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string
  options: string[]
  active: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5" role="tablist" aria-label={`Filter projects ${label}`}>
      <span className="mr-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-blue-100/50">{label}</span>
      {options.map((opt) => {
        const isActive = active === opt
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(opt)}
            className={`inline-flex items-center min-h-11 rounded-full px-4 py-2 text-[0.8125rem] font-mono border transition-colors ${
              isActive
                ? "bg-[rgba(124,58,237,0.18)] border-[rgba(124,58,237,0.55)] text-white shadow-[0_0_16px_rgba(124,58,237,0.18)]"
                : "bg-white/[0.04] border-white/10 text-blue-100/70 hover:text-white hover:border-[rgba(124,58,237,0.4)]"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export function PortfolioGridSection() {
  const serviceOptions = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((p) => p.services ?? [])))],
    []
  )
  const industryOptions = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.industry).filter(Boolean) as string[]))],
    []
  )

  const [service, setService] = useState("All")
  const [industry, setIndustry] = useState("All")

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (service === "All" || (p.services ?? []).includes(service)) &&
          (industry === "All" || p.industry === industry)
      ),
    [service, industry]
  )

  return (
    <section id="portfolio-grid" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="case_studies.ts"
            title={<>recent.<span className="function">projects</span>()</>}
            comment="// filter by service and industry, the two combine"
          />
        </RevealSection>

        {/* Two-axis filter */}
        <div className="mt-12 flex flex-col gap-3 items-center">
          <FilterRow label="by service" options={serviceOptions} active={service} onSelect={setService} />
          <FilterRow label="by industry" options={industryOptions} active={industry} onSelect={setIndustry} />
        </div>

        {/* Project grid */}
        <RevealSection className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const a = accents[i % accents.length]
            return (
            <Link key={project.id} href={`/portfolio/${project.id}`} className="no-underline group/card">
              <div
                className="glass-card h-full overflow-hidden flex flex-col rounded-2xl border border-(--card-border)! transition-[scale,box-shadow,border-color] duration-300 ease-in-out group-hover/card:scale-[1.02] group-hover/card:border-(--card-accent)! group-hover/card:[box-shadow:var(--card-glow)]!"
                style={{ ["--card-border"]: a.border, ["--card-accent"]: a.hover, ["--card-glow"]: a.glow } as CSSProperties}
              >
                <div
                  className="relative aspect-[3/2] flex items-center justify-center overflow-hidden"
                  style={{ background: a.grad }}
                >
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <span aria-hidden className="font-mono font-bold text-5xl sm:text-6xl text-white/85">
                      {initials(project.title)}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
                    <ArrowUpRight
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-blue-100/40 transition-colors group-hover/card:text-indigo-300"
                      aria-hidden
                    />
                  </div>

                  <p className="mt-2 text-sm text-blue-100/70 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[project.services?.[0], project.industry].filter(Boolean).map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-blue-100/70"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.dot }} />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-5 pt-4">
                    {project.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-bold font-mono text-white tabular-nums">{stat.value}</div>
                        <div className="text-[11px] font-mono text-blue-100/50">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            )
          })}
        </RevealSection>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm font-mono text-blue-100/50">{`// no projects match ${service} + ${industry}`}</p>
        )}
      </div>
    </section>
  )
}
