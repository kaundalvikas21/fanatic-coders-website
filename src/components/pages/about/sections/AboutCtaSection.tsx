import { Send, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { CtaPanel } from "@/components/ui/CtaPanel"

export function AboutCtaSection() {
  return (
    <CtaPanel
      sectionId="about-cta"
      background="var(--dark-1)"
      badge="./work-with-us.sh"
      heading="Like how we think? Let's build together."
      body="Tell us what you're building. We'll bring a senior team and a clear plan to get it shipped."
    >
      <GradientButton href="/contact">
        dropUsALine
        <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
      </GradientButton>
      <GradientButton href="/services" variant="secondary">
        exploreServices
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
      </GradientButton>
    </CtaPanel>
  )
}
