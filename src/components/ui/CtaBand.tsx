import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

interface CtaBandProps {
  title: string
  subtitle: string
  buttonLabel?: string
  href?: string
}

/** Shared closing call-to-action band for the detail pages. */
export function CtaBand({ title, subtitle, buttonLabel = "startAProject", href = "/contact" }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-cta absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-2xl text-center">
        <RevealSection>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
          <p className="mt-3 text-blue-100/65 leading-relaxed">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <GradientButton href={href}>
              {buttonLabel}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
