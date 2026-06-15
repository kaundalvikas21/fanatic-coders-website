import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { posts } from "../data"

export function PostRelated({ post }: { post: BlogPost }) {
  const index = posts.findIndex((p) => p.slug === post.slug)
  const prev = index > 0 ? posts[index - 1] : null
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null

  const others = posts.filter((p) => p.slug !== post.slug)
  const sameCategory = others.filter((p) => p.category === post.category)
  const related = (sameCategory.length > 0 ? sameCategory : others).slice(0, 3)

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            keep.<span style={{ color: "var(--aurora-violet-light)" }}>reading</span>()
          </h2>
        </RevealSection>

        <RevealSection stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="no-underline group/card">
              <GlassCard lift className="h-full overflow-hidden flex flex-col">
                {p.coverUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.coverUrl} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover/card:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-indigo-300">{p.category}</div>
                  <h3 className="mt-2 text-base font-bold text-white leading-snug transition-colors group-hover/card:text-indigo-200">{p.title}</h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">{p.excerpt}</p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>

        {(prev || next) && (
          <RevealSection className="mt-12 grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="no-underline group/nav">
                <GlassCard className="p-5 h-full">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-100/45"><ArrowLeft size={13} aria-hidden /> previous</div>
                  <div className="mt-2 text-sm font-bold text-white transition-colors group-hover/nav:text-indigo-200">{prev.title}</div>
                </GlassCard>
              </Link>
            ) : <span className="hidden sm:block" />}
            {next && (
              <Link href={`/blog/${next.slug}`} className="no-underline group/nav">
                <GlassCard className="p-5 h-full sm:text-right">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-100/45 sm:justify-end">next <ArrowRight size={13} aria-hidden /></div>
                  <div className="mt-2 text-sm font-bold text-white transition-colors group-hover/nav:text-indigo-200">{next.title}</div>
                </GlassCard>
              </Link>
            )}
          </RevealSection>
        )}
      </div>
    </section>
  )
}
