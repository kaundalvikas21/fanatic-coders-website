import type { Metadata } from "next"
import { ServicesPage } from "@/components/pages/services/ServicesPage"

export const metadata: Metadata = {
  title: "Services | fanaticCoders",
  description:
    "Engineering, design, and growth from one senior team. Explore fanaticCoders' services across web, mobile, e-commerce, cloud, branding, and marketing.",
}

export default function Page() {
  return <ServicesPage />
}
