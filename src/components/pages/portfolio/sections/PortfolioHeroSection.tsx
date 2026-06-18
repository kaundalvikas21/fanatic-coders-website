import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

export function PortfolioHeroSection() {
  return (
    <section id="portfolio-hero" className="relative overflow-hidden hero-shell pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">portfolio</div>
          <h1 className="hero-h1 mt-3">
            Work we have <span className="text-aurora-sweep">shipped</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            Products we built with clients in fintech, healthcare, retail, logistics, and SaaS.
            Filter by service or industry to see the work that fits what you need.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="/contact">
              startYourProject
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="/services" variant="secondary">
              exploreServices
            </GradientButton>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
