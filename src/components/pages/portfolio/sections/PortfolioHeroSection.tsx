import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"
import { SITE_STATS } from "@/lib/site-stats"
import { projects } from "../data"

// Derived once at build time from the single sources, so the hero counts can never drift
// from the case studies in data.ts or the headline numbers in site-stats.ts.
const caseStudyCount = projects.length
const industryCount = new Set(projects.map((p) => p.industry).filter(Boolean)).size

const heroMeta: { value: string; label: string }[] = [
  { value: String(caseStudyCount), label: "case studies" },
  { value: String(industryCount), label: "industries" },
  { value: SITE_STATS.yearsShipping, label: "years shipping" },
]

export function PortfolioHeroSection() {
  return (
    <section
      className="relative overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8 min-h-[100svh] flex flex-col"
      style={{ background: "var(--dark-1)" }}
    >
      <Image
        src="/portfolio_hero_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="object-cover hero-bg-img"
      />
      <div className="hero-bg-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="hero-bg-sweep" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">portfolio</div>
          <h1 className="hero-h1 mt-3">
            Work we have <span className="text-aurora-sweep">shipped</span>
          </h1>

          <p className="mt-6 hero-subcopy">
            Products we built with clients in fintech, healthcare, retail, logistics, and SaaS.
            Filter by service or industry to see the work that fits what you need.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="/contact">
              startYourProject
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="/services" variant="secondary">
              exploreServices
            </GradientButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm text-blue-100/55">
            {heroMeta.map((meta, i) => (
              <span key={meta.label} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-blue-100/25">·</span>}
                <span>
                  <span className="text-white">{meta.value}</span> {meta.label}
                </span>
              </span>
            ))}
          </div>
        </RevealSection>
      </div>

      <a
        href="#portfolio-grid"
        aria-label="Scroll to projects"
        className="hero-scroll-cue visible"
      >
        <ChevronDown size={22} aria-hidden />
      </a>
    </section>
  )
}
