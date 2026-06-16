import Image from "next/image"
import type { ReactNode } from "react"
import { Activity } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { RevealSection } from "@/components/ui/RevealSection"
import { GlassCard } from "@/components/ui/GlassCard"
import { statIcons } from "./statIcons"

function Eyebrow({ children }: { children: string }) {
  return <div className="preheading-code">{children}</div>
}

function Heading({ children }: { children: string }) {
  return <h2 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight">{children}</h2>
}

function Band({ tier, children }: { tier: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: `var(${tier})` }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">{children}</div>
    </section>
  )
}

export function CaseStory({ project }: { project: PortfolioProject }) {
  const find = (name: string) => project.sections?.find((s) => s.heading.toLowerCase() === name)
  const challenge = find("challenge")
  const approach = find("approach")
  const result = find("result")
  const galleryImg = project.gallery?.[0]
  const steps = project.approach ?? []
  const stats = project.stats ?? []

  return (
    <>
      {challenge && (
        <Band tier="--dark-2">
          <RevealSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div>
                <Eyebrow>the problem</Eyebrow>
                <Heading>The Challenge</Heading>
              </div>
              <p className="text-base md:text-lg text-blue-100/75 leading-relaxed">{challenge.body}</p>
            </div>
          </RevealSection>
        </Band>
      )}

      {approach && (
        <Band tier="--dark-1">
          <RevealSection>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <Eyebrow>the strategy</Eyebrow>
                <Heading>Our Approach</Heading>
                <p className="mt-4 text-base md:text-lg text-blue-100/72 leading-relaxed">{approach.body}</p>
              </div>
              {galleryImg && (
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Image src={galleryImg} alt={`${project.title} detail`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
                </div>
              )}
            </div>
          </RevealSection>
        </Band>
      )}

      {steps.length > 0 && (
        <Band tier="--dark-2">
          <RevealSection>
            <Eyebrow>the steps</Eyebrow>
            <Heading>How We Delivered</Heading>
            <p className="mt-4 text-base text-blue-100/65 leading-relaxed">The work, step by step.</p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((step, i) => (
                <GlassCard key={step.title} lift className="group p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="process-num text-4xl font-bold font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-1.5 text-xs font-mono uppercase tracking-wide text-blue-100/45">{step.duration}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.desc}</p>
                </GlassCard>
              ))}
            </div>
          </RevealSection>
        </Band>
      )}

      {(result || stats.length > 0) && (
        <Band tier="--dark-1">
          <RevealSection>
            <Eyebrow>the outcome</Eyebrow>
            <Heading>The Results</Heading>
            {result && (
              <p className="mt-4 text-base md:text-lg text-blue-100/75 leading-relaxed max-w-2xl">{result.body}</p>
            )}
            {stats.length > 0 && (
              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.slice(0, 4).map((s) => {
                  const Icon = statIcons[s.icon ?? ""] ?? Activity
                  return (
                    <GlassCard key={s.label} accent="cyan" lift className="p-6 text-center">
                      <Icon size={24} aria-hidden className="mx-auto" style={{ color: "var(--aurora-cyan-light)" }} />
                      <div className="mt-3 text-3xl md:text-4xl font-bold font-mono tabular-nums" style={{ color: "var(--aurora-cyan-light)" }}>{s.value}</div>
                      <div className="mt-1.5 text-xs text-blue-100/55">{s.caption ?? s.label}</div>
                    </GlassCard>
                  )
                })}
              </div>
            )}
          </RevealSection>
        </Band>
      )}
    </>
  )
}
