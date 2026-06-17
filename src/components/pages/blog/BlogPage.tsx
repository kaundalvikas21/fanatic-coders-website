import { BlogFilterProvider } from "./BlogFilterContext"
import {
  BlogHeroSection,
  BlogListSection,
  BlogPopularSection,
  BlogNewsletterSection,
} from "./sections"

export function BlogPage({ initialTag }: { initialTag?: string }) {
  return (
    <BlogFilterProvider initialTag={initialTag}>
      <BlogHeroSection />
      <BlogListSection />
      <BlogPopularSection />
      <BlogNewsletterSection />
    </BlogFilterProvider>
  )
}
