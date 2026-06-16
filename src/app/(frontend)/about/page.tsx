import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about/AboutPage"

export const metadata: Metadata = {
  title: "About | fanaticCoders",
  description:
    "Meet fanaticCoders, a senior digital product studio that pairs sharp design with solid engineering to ship fast, reliable software.",
}

export default function Page() {
  return <AboutPage />
}
