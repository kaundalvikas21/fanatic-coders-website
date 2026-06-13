import type { Metadata } from "next"
import { BlogPage } from "@/components/pages/blog/BlogPage"

export const metadata: Metadata = {
  title: "Blog | fanaticCoders",
  description:
    "Field notes from the fanaticCoders team: architecture decisions, design craft, and lessons from shipping real software.",
}

export default function Page() {
  return <BlogPage />
}
