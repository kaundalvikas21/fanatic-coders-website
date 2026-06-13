import { BlogFilterProvider } from "./BlogFilterContext"
import {
  BlogHeroSection,
  BlogListSection,
  BlogPopularSection,
  BlogNewsletterSection,
} from "./sections"

export function BlogPage() {
  return (
    <BlogFilterProvider>
      <BlogHeroSection />
      <BlogListSection />
      <BlogPopularSection />
      <BlogNewsletterSection />
    </BlogFilterProvider>
  )
}
