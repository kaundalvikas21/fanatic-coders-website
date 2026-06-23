import Image from "next/image"
import { UserCheck, Zap, Receipt, ShieldCheck } from "lucide-react"
import type { ElementType } from "react"
import { RevealSection } from "@/components/ui/RevealSection"

// The reassurance signals that used to be their own section, folded into the hero so a
// visitor reads what to expect before the form, without a whole extra scroll.
const trustChips: { Icon: ElementType; label: string; color: string }[] = [
  { Icon: UserCheck, label: "Senior people, not SDRs", color: "var(--aurora-violet-light)" },
  { Icon: Zap, label: "Reply within 1 business day", color: "var(--aurora-cyan-light)" },
  { Icon: Receipt, label: "Clear on cost up front", color: "var(--aurora-blue-light)" },
  { Icon: ShieldCheck, label: "Honest about fit", color: "var(--aurora-green-light)" },
]

export function ContactHeroSection() {
  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8 min-h-[100svh] flex flex-col justify-center"
      style={{ background: "var(--dark-1)" }}
    >
      <Image
        src="/contact_hero_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="object-cover hero-bg-img"
      />
      <div className="hero-bg-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="hero-bg-sweep" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">contact.module</div>
          <h1 className="hero-h1 mt-3">
            Tell us what you&apos;re <span className="text-aurora-sweep">building</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Have a detailed spec or a rough idea? Either one is fine. Send a message and a senior
            team member will get back to you personally.
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
      </div>
    </section>
  )
}
