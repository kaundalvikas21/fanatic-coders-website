import Image from "next/image"
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
      className="hero-shell [--hero-pt:7.5rem] pb-8 relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "var(--dark-1)" }}
    >
      <Image
        src="/about_hero_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="object-cover hero-bg-img"
      />
      <div className="hero-bg-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="hero-bg-sweep" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 flex flex-1 flex-col justify-center">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">about.module</div>
          <h1 className="hero-h1 mt-3">
            We build software that <span className="text-aurora-sweep">earns its keep</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            fanaticCoders is a small senior team. We design and build web and mobile products,
            then stay on to keep them fast and useful. The people who write your code are the
            ones who answer for it. No junior handoffs.
          </p>
        </RevealSection>

        <RevealSection stagger className="mt-8 flex flex-wrap justify-center gap-2.5">
          {trustChips.map(({ Icon, label, color }) => (
            <span
              key={label}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3.5 py-1.5 text-xs sm:text-sm font-mono text-[var(--color-text-muted)] ring-1 ring-white/12 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:ring-white/20"
            >
              <Icon
                size={15}
                style={{ color }}
                className="shrink-0 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden
              />
              {label}
            </span>
          ))}
        </RevealSection>

        <RevealSection className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <GradientButton href="/contact" className="w-full sm:w-auto">
            startAProject
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
          </GradientButton>
          <GradientButton href="/portfolio" variant="secondary" className="w-full sm:w-auto">
            seeOurWork
          </GradientButton>
        </RevealSection>
      </div>
    </section>
  )
}
