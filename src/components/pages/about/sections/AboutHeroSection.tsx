import { ArrowRight, Calendar, Users, Gauge, ShieldCheck } from "lucide-react"
import type { ElementType } from "react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

// Qualitative trust signals — the hard numbers live in the impact stats section.
const trustChips: { Icon: ElementType; label: string; color: string }[] = [
  { Icon: Calendar, label: "Since 2018", color: "var(--aurora-violet-light)" },
  { Icon: Users, label: "Senior-only team", color: "var(--aurora-cyan-light)" },
  { Icon: Gauge, label: "Ship in weeks", color: "var(--aurora-blue-light)" },
  { Icon: ShieldCheck, label: "Own the outcome", color: "var(--aurora-green-light)" },
]

/**
 * About hero — full-height, matches the portfolio/services listing hero pattern:
 * preheading-code eyebrow, plain bold h1 with the closing phrase swept in the aurora
 * gradient, a description, a trust-chip row, then the CTA buttons.
 */
export function AboutHeroSection() {
  return (
    <section
      id="about-hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[184px] md:pt-[196px] pb-16"
    >
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 flex flex-1 flex-col justify-center">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">about.module</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mt-3 leading-[1.05] tracking-tight">
            We build software that <span className="text-aurora-sweep">earns its keep</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            fanaticCoders is a small senior team. We design and build web and mobile products,
            then stay on to keep them fast and useful. No layers, no handoffs to junior staff,
            just the people who wrote the code answering for it.
          </p>
        </RevealSection>

        <RevealSection stagger className="mt-8 flex flex-wrap justify-center gap-2.5">
          {trustChips.map(({ Icon, label, color }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3.5 py-1.5 text-xs sm:text-sm font-mono text-blue-100/80 ring-1 ring-white/12 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:ring-white/20"
            >
              <Icon size={15} style={{ color }} className="shrink-0" aria-hidden />
              {label}
            </span>
          ))}
        </RevealSection>

        <RevealSection className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <GradientButton href="/contact">
            startAProject
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
          </GradientButton>
          <GradientButton href="/portfolio" variant="secondary">
            seeOurWork
          </GradientButton>
        </RevealSection>
      </div>
    </section>
  )
}
