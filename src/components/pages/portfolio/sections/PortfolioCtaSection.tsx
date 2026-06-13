import { Send, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

export function PortfolioCtaSection() {
  return (
    <section id="portfolio-cta" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-cta absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono mb-8 badge-aurora">
            <span style={{ color: "#a855f7" }}>$</span>
            <span className="text-blue-200/80">./your-project-next.sh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">
            Your product could be next.
          </h2>
          <p className="text-lg text-blue-100/65 mb-10 max-w-2xl mx-auto">
            Let&apos;s talk about what you&apos;re building and the outcome you&apos;re aiming for.
            We&apos;ll bring the team to make it real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="/contact">
              startAConversation
              <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="/about" variant="secondary">
              meetTheTeam
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
