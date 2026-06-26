import { Check } from "lucide-react"
import type { BlogPost, ArticleBlock } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { ArticleToc } from "@/components/ui/ArticleToc"
import { ArticleHeading } from "./ArticleHeading"
import { CodeBlock } from "./CodeBlock"
import { PostShare } from "./PostShare"

/** Content-derived key so blocks stay stable if the array ever changes order. */
function blockKey(block: ArticleBlock, i: number): string {
  let sample: string
  switch (block.type) {
    case "code":
      sample = block.code
      break
    case "list":
      sample = block.items.join("|")
      break
    default:
      sample = block.text
  }
  return `${block.type}-${i}-${sample.slice(0, 24)}`
}

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mt-5 space-y-6 text-[1.0625rem] text-blue-100/72 leading-relaxed text-pretty break-words">
      {blocks.map((block, i) => {
        const key = blockKey(block, i)
        switch (block.type) {
          case "code":
            return <CodeBlock key={key} lang={block.lang} code={block.code} />
          case "list":
            return block.ordered ? (
              <ol key={key} className="list-decimal space-y-2 pl-5 marker:text-indigo-300">
                {block.items.map((it) => <li key={it}>{it}</li>)}
              </ol>
            ) : (
              <ul key={key} className="list-disc space-y-2 pl-5 marker:text-indigo-300">
                {block.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            )
          case "quote":
            return (
              <blockquote key={key} className="rounded-lg bg-white/[0.03] px-5 py-4 text-blue-100/85 italic">
                <p>{block.text}</p>
                {block.cite && <footer className="mt-2 text-xs font-mono not-italic text-blue-100/60">{block.cite}</footer>}
              </blockquote>
            )
          default:
            return <p key={key}>{block.text}</p>
        }
      })}
    </div>
  )
}

export function PostBody({ post }: { post: BlogPost }) {
  const sections = post.sections ?? []
  const tocItems = sections.map((s) => ({ id: s.id, label: s.heading }))

  return (
    <section className="relative pt-16 md:pt-20 pb-10" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_220px] gap-10 lg:gap-14 items-start">
          {/* Article column */}
          <article className="max-w-[68ch] min-w-0">
            {post.takeaways && post.takeaways.length > 0 && (
              <GlassCard accent="violet" className="p-6 mb-12">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-blue-100/70 mb-3">Key takeaways</div>
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

            <div>
              {sections.length === 0 && (
                <p className="text-sm text-blue-100/55">Full write-up coming soon.</p>
              )}
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-[var(--header-offset)] mt-12 border-t border-white/10 pt-12 first:mt-0 first:border-t-0 first:pt-0">
                  <ArticleHeading id={s.id}>{s.heading}</ArticleHeading>
                  {s.blocks && s.blocks.length > 0 ? (
                    <ArticleBlocks blocks={s.blocks} />
                  ) : (
                    <div className="mt-5 space-y-6 text-[1.0625rem] text-blue-100/72 leading-relaxed text-pretty break-words">
                      {(s.paragraphs ?? []).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* TOC + share rail */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block self-start sticky top-[var(--header-offset)] space-y-6">
              <ArticleToc items={tocItems} />
              <div className="border-t border-white/10 pt-5">
                <PostShare title={post.title} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
