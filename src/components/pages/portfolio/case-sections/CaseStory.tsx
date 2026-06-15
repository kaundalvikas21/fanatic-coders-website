import Image from "next/image"
import { Check } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { RevealSection } from "@/components/ui/RevealSection"

function CodeHeading({ fn }: { fn: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
      the.<span style={{ color: "var(--aurora-violet-light)" }}>{fn}</span>()
    </h2>
  )
}

export function CaseStory({ project }: { project: PortfolioProject }) {
  const find = (name: string) => project.sections?.find((s) => s.heading.toLowerCase() === name)
  const challenge = find("challenge")
  const approach = find("approach")
  const result = find("result")
  const galleryImg = project.gallery?.[0]

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl space-y-20 md:space-y-24">

        {challenge && (
          <RevealSection className="max-w-2xl">
            <CodeHeading fn="challenge" />
            <p className="mt-5 text-base md:text-lg text-blue-100/72 leading-relaxed">{challenge.body}</p>
          </RevealSection>
        )}

        {approach && (
          <RevealSection>
            <CodeHeading fn="approach" />
            <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <p className="text-base md:text-lg text-blue-100/72 leading-relaxed">{approach.body}</p>
                {project.approach && project.approach.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {project.approach.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500/15">
                          <Check size={13} className="text-indigo-300" aria-hidden />
                        </span>
                        <span className="text-sm text-blue-100/75 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {galleryImg && (
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Image src={galleryImg} alt={`${project.title} detail`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
                </div>
              )}
            </div>
          </RevealSection>
        )}

        {project.tech && project.tech.length > 0 && (
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
              built.<span style={{ color: "var(--aurora-violet-light)" }}>with</span>()
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-mono text-blue-100/80">{t}</span>
              ))}
            </div>
          </RevealSection>
        )}

        {result && (
          <RevealSection className="max-w-2xl">
            <CodeHeading fn="result" />
            <p className="mt-5 text-base md:text-lg text-blue-100/80 leading-relaxed">{result.body}</p>
          </RevealSection>
        )}
      </div>
    </section>
  )
}
