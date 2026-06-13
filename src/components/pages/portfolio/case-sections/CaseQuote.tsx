import { Quote } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

export function CaseQuote({ project }: { project: PortfolioProject }) {
  if (!project.quote) return null
  const { text, author, role } = project.quote
  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl">
        <RevealSection>
          <GlassCard accent="cyan" className="p-8 md:p-10">
            <Quote size={28} className="text-cyan-300/70" aria-hidden />
            <blockquote className="mt-4 text-xl md:text-2xl font-medium text-white leading-snug">
              {text}
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-bold text-white">{author}</span>
              <span className="text-blue-100/55"> · {role}</span>
            </figcaption>
          </GlassCard>
        </RevealSection>
      </div>
    </section>
  )
}
