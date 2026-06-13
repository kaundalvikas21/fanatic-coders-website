import Image from "next/image"
import { Clock } from "lucide-react"
import type { BlogPost } from "@/types"
import { RevealSection } from "@/components/ui/RevealSection"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export function PostHero({ post }: { post: BlogPost }) {
  const hasImage = Boolean(post.coverUrl)

  return (
    <section className="relative overflow-hidden pt-[184px] md:pt-[196px] pb-20">
      {/* Background */}
      {hasImage ? (
        <>
          <Image src={post.coverUrl!} alt={`${post.title} cover`} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[#080810] via-[#080810]/88 to-[#080810]/45" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-[#080810]/30" />
          <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero opacity-40" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero" />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <RevealSection>
          <div className="flex justify-center">
            <Breadcrumb items={[{ label: "home", href: "/" }, { label: "blog", href: "/blog" }, { label: post.category }]} />
          </div>
        </RevealSection>

        <RevealSection className="mt-8">
          <div className="flex items-center justify-center gap-3">
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-[11px] font-mono text-indigo-200 ring-1 ring-indigo-400/30 backdrop-blur-sm">{post.category}</span>
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-[1.06] tracking-tight max-w-[20ch] mx-auto">{post.title}</h1>
          <p className="mt-5 text-lg text-blue-100/85 leading-relaxed max-w-[60ch] mx-auto">{post.excerpt}</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.authorAvatar && (
                  <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/20">
                    <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" sizes="40px" />
                  </span>
                )}
                <span className="text-sm">
                  <span className="block font-semibold text-white leading-tight">{post.author}</span>
                  {post.authorRole && <span className="block text-xs text-blue-100/65">{post.authorRole}</span>}
                </span>
              </div>
            )}
            <span className="h-8 w-px bg-white/15" aria-hidden />
            <div className="flex items-center gap-4 text-sm font-mono text-blue-100/70">
              <span>{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} aria-hidden />{post.readTime}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white/8 px-2.5 py-1 text-[11px] font-mono text-blue-100/70 backdrop-blur-sm">#{tag}</span>
              ))}
            </div>
          )}
        </RevealSection>
      </div>
    </section>
  )
}
