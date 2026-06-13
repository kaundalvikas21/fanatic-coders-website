import type { BlogPost } from "@/types"
import { ReadingProgress } from "@/components/ui/ReadingProgress"
import { PostHero } from "./post-sections/PostHero"
import { PostBody } from "./post-sections/PostBody"
import { PostAuthor } from "./post-sections/PostAuthor"
import { PostRelated } from "./post-sections/PostRelated"
import { BlogNewsletterSection } from "./sections/BlogNewsletterSection"

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <ReadingProgress />
      <PostHero post={post} />
      <PostBody post={post} />
      <PostAuthor post={post} />
      <PostRelated post={post} />
      <BlogNewsletterSection />
    </>
  )
}
