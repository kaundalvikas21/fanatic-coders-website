import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

export function ServicesHeroSection() {
  return (
    <section id="services-hero" className="relative overflow-hidden pt-[184px] md:pt-[196px] pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">services</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mt-3 leading-[1.05] tracking-tight">
            We design and build software that <span className="text-aurora-sweep">ships</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            Web, mobile, commerce, and cloud work from one team. We scope it honestly,
            build in short cycles, and stay on after launch.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="/contact">
              startAProject
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="/portfolio" variant="secondary">
              seeOurWork
            </GradientButton>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
