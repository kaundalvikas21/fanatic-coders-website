import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

export function PortfolioHeroSection() {
  return (
    <section id="portfolio-hero" className="relative overflow-hidden pt-[184px] md:pt-[196px] pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">portfolio.module</div>
          <h1 className="heading-code mt-3">
            we.<span className="function">shipped</span>()
          </h1>
          <p className="subheading-code mt-3">{"// selected work, real outcomes"}</p>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            A look at products we&apos;ve designed and built, and the measurable results they
            delivered for the teams behind them.
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
