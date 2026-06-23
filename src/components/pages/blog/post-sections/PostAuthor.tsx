import Image from "next/image"
import type { BlogPost } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { PostShare } from "./PostShare"

export function PostAuthor({ post }: { post: BlogPost }) {
  if (!post.author) return null
  return (
    <section className="relative overflow-hidden pt-0 pb-16 md:pb-20" style={{ background: "var(--dark-2)" }}>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <RevealSection className="max-w-[68ch]">
          <div className="lg:hidden mb-5">
            <PostShare title={post.title} />
          </div>
          <GlassCard accent="cyan" className="flex flex-col sm:flex-row items-start gap-5 p-6">
            {post.authorAvatar && (
              <span className="team-card-glow relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
                <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" sizes="64px" />
              </span>
            )}
            <div>
              <div className="text-xs font-mono text-blue-100/70">written by</div>
              <div className="mt-1 text-lg font-bold text-white">{post.author}</div>
              {post.authorRole && <div className="text-sm font-mono text-indigo-300">{post.authorRole}</div>}
              <p className="mt-3 text-sm text-blue-100/65 leading-relaxed">
                Part of the senior team at fanaticCoders, writing from the work we ship for clients in {post.category.toLowerCase()} and beyond.
              </p>
            </div>
          </GlassCard>
        </RevealSection>
      </div>
    </section>
  )
}
