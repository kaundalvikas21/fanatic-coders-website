import { Send, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { CtaPanel } from "@/components/ui/CtaPanel"

export function PortfolioCtaSection() {
  return (
    <CtaPanel
      sectionId="portfolio-cta"
      badge="./your-project-next.sh"
      heading="Your product could be next."
      body="Let's talk about what you're building and the outcome you're aiming for. We'll bring the team to make it real."
    >
      <GradientButton href="/contact">
        startAConversation
        <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
      </GradientButton>
      <GradientButton href="/about" variant="secondary">
        meetTheTeam
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
      </GradientButton>
    </CtaPanel>
  )
}
