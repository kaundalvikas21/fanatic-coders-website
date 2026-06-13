import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

/**
 * About hero — page-level h1 (uses the same .heading-code/.preheading-code/.subheading-code
 * styling as section headers, but rendered as h1 for document semantics).
 */
export function AboutHeroSection() {
  return (
    <section id="about-hero" className="relative overflow-hidden pt-44 pb-22">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">about.module</div>
          <h1 className="heading-code mt-3">
            we.<span className="function">buildTeams</span>()
          </h1>
          <p className="subheading-code mt-3">{"// engineers, designers & strategists who ship"}</p>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            fanaticCoders is a digital product studio. We pair senior engineering with sharp design
            to turn your idea into fast, reliable software, and we treat every build like
            it&apos;s our own.
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
