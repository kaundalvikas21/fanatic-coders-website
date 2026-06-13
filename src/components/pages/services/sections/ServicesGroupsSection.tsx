import Link from "next/link"
import {
  Code2, Smartphone, ShoppingCart, Cloud, Palette, PenTool,
  Film, TrendingUp, Search, Settings, ArrowRight,
} from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

type Accent = "violet" | "cyan" | "green"

interface ServiceItem {
  title: string
  description: string
  slug: string
  Icon: ElementType
}

interface Group {
  key: string
  label: string
  blurb: string
  accent: Accent
  items: ServiceItem[]
}

const iconColor: Record<Accent, string> = { violet: "#a855f7", cyan: "#22d3ee", green: "#34d399" }

const groups: Group[] = [
  {
    key: "build", label: "build", blurb: "Ship reliable products and platforms", accent: "violet",
    items: [
      { title: "Web Development", description: "Fast, accessible web apps on Next.js, React, and a typed backend.", slug: "web-development", Icon: Code2 },
      { title: "Mobile Apps", description: "Native-quality iOS and Android from one cross-platform codebase.", slug: "mobile-apps", Icon: Smartphone },
      { title: "E-Commerce", description: "Custom storefronts and checkouts built to convert and scale.", slug: "ecommerce", Icon: ShoppingCart },
      { title: "Cloud Solutions", description: "Resilient infrastructure, APIs, and data pipelines in the cloud.", slug: "cloud", Icon: Cloud },
    ],
  },
  {
    key: "design", label: "design", blurb: "Make it clear, distinctive, and a joy to use", accent: "cyan",
    items: [
      { title: "UI/UX Design", description: "Research-led flows and polished interfaces in your design system.", slug: "design", Icon: Palette },
      { title: "Brand Identity", description: "Logos, systems, and guidelines that make you instantly recognizable.", slug: "brand", Icon: PenTool },
      { title: "Motion Design", description: "Purposeful animation that guides attention and adds delight.", slug: "motion", Icon: Film },
    ],
  },
  {
    key: "grow", label: "grow", blurb: "Reach the right people and keep shipping", accent: "green",
    items: [
      { title: "Digital Marketing", description: "Data-driven campaigns across the channels your users actually use.", slug: "marketing", Icon: TrendingUp },
      { title: "SEO & Content", description: "Technical SEO and content that earns durable organic traffic.", slug: "seo", Icon: Search },
      { title: "DevOps & Consulting", description: "CI/CD, observability, and the architecture advice to scale safely.", slug: "devops", Icon: Settings },
    ],
  },
]

export function ServicesGroupsSection() {
  return (
    <section id="services-groups" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="capabilities.ts"
            title={<>what.<span className="function">weDo</span>()</>}
            comment="// three teams, one standard of craft"
          />
        </RevealSection>

        <div className="mt-16 space-y-16 max-w-6xl mx-auto">
          {groups.map((group) => (
            <div key={group.key}>
              <RevealSection className="mb-6 flex items-baseline gap-3">
                <h3 className="text-xl font-bold font-mono text-white">
                  ./<span style={{ color: iconColor[group.accent] }}>{group.label}</span>
                </h3>
                <p className="text-sm text-blue-100/55">{group.blurb}</p>
              </RevealSection>

              <RevealSection stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  // TODO: link to `/services/${item.slug}` once detail routes exist; hub for now to avoid 404.
                  <Link key={item.slug} href="/services" className="no-underline group/card">
                    <GlassCard accent={group.accent} lift className="h-full p-6">
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <item.Icon size={20} style={{ color: iconColor[group.accent] }} aria-hidden />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-blue-100/60 leading-relaxed mb-4">{item.description}</p>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-mono"
                        style={{ color: iconColor[group.accent] }}
                      >
                        explore
                        <ArrowRight size={14} className="transition-transform group-hover/card:translate-x-1" aria-hidden />
                      </span>
                    </GlassCard>
                  </Link>
                ))}
              </RevealSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
