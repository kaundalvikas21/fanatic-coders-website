import type { Metadata } from "next"
import { ComingSoon } from "@/components/ui/ComingSoon"

export const metadata: Metadata = {
  title: "Cookie Policy | fanaticCoders",
  description: "Our cookie policy is on the way. Ask us what we store and why in the meantime.",
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="cookie.policy"
      heading="Cookie Policy"
      note="Coming shortly. Ask us what we store and why in the meantime, and we'll walk you through it."
    />
  )
}
