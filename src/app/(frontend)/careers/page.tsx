import type { Metadata } from "next"
import { ComingSoon } from "@/components/ui/ComingSoon"

export const metadata: Metadata = {
  title: "Careers | fanaticCoders",
  description: "We hire senior engineers and designers who sweat the details. No public openings right now, but we always want to meet good people.",
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="careers.module"
      heading="We hire slowly, and"
      headingSweep="well"
      note="No public openings right now. If you're a senior engineer or designer who cares about the details, send us your work and we'll talk."
    />
  )
}
