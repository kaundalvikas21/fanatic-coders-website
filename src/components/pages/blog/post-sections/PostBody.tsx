import { Check } from "lucide-react"
import type { BlogPost } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { ArticleToc } from "@/components/ui/ArticleToc"

export function PostBody({ post }: { post: BlogPost }) {
  const sections = post.sections ?? []
  const tocItems = sections.map((s) => ({ id: s.id, label: s.heading }))

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_220px] gap-10 lg:gap-14 items-start">
          {/* Article column */}
          <article className="max-w-[68ch]">
            {post.takeaways && post.takeaways.length > 0 && (
              <GlassCard accent="violet" className="p-6 mb-10">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-blue-100/45 mb-3">Key takeaways</div>
                <ul className="space-y-2.5">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check size={15} className="mt-0.5 shrink-0 text-indigo-300" aria-hidden />
                      <span className="text-sm text-blue-100/80 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            <div className="space-y-12">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-base text-blue-100/72 leading-relaxed">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* TOC rail */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block">
              <ArticleToc items={tocItems} />
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
