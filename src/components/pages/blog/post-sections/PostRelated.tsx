import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { posts } from "../data"
import { categoryColor } from "@/lib/categoryColor"

export function PostRelated({ post }: { post: BlogPost }) {
  const others = posts.filter((p) => p.slug !== post.slug)
  const sameCategory = others.filter((p) => p.category === post.category)
  const related = (sameCategory.length > 0 ? sameCategory : others).slice(0, 3)

  return (
    <section className="cv-auto relative overflow-hidden section-y" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
            keep.<span style={{ color: "var(--aurora-violet-light)" }}>reading</span>()
          </h2>
        </RevealSection>

        <RevealSection stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} aria-label={`Read: ${p.title}`} className="no-underline group/card rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
              <GlassCard lift className="h-full overflow-hidden flex flex-col">
                {p.coverUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.coverUrl} alt={p.title} fill className="object-cover brightness-95 transition-[filter] duration-500 group-hover/card:brightness-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                <div className="p-5 flex flex-1 flex-col">
                  <div className={`text-[11px] font-mono ${categoryColor(p.category).label}`}>{p.category}</div>
                  <h3 className="mt-2 text-base font-bold text-white leading-snug text-balance transition-colors group-hover/card:text-indigo-200">{p.title}</h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300">
                    readPost <ArrowRight size={13} aria-hidden className="transition-transform group-hover/card:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
