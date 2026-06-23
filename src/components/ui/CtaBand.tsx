import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { CtaPanel } from "@/components/ui/CtaPanel"

interface CtaBandProps {
  title: string
  subtitle: string
  buttonLabel?: string
  href?: string
  /** Terminal filename shown in the panel title bar. */
  badge?: string
  sectionId?: string
}

/** Closing call-to-action for the detail pages. Wraps the shared terminal CtaPanel. */
export function CtaBand({
  title,
  subtitle,
  buttonLabel = "startAProject",
  href = "/contact",
  badge = "./lets-build.sh",
  sectionId = "cta-band",
}: CtaBandProps) {
  return (
    <CtaPanel sectionId={sectionId} badge={badge} heading={title} body={subtitle}>
      <GradientButton href={href}>
        {buttonLabel}
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
      </GradientButton>
    </CtaPanel>
  )
}
