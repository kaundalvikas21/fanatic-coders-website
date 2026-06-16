import type { CSSProperties } from "react"
import GradientButton from "@/components/ui/GradientButton"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { type Accent, iconColor, engagementModels } from "../data"

const accentMap: Record<Accent, { border: string; icon: string; glow: string; tag: string }> = {
  violet: { border: "rgba(124,58,237,0.22)", icon: "rgba(124,58,237,0.10)", glow: "0 0 0 1px rgba(124,58,237,0.45), 0 10px 34px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.05)", tag: "rgba(124,58,237,0.08)" },
  cyan:   { border: "rgba(6,182,212,0.22)",  icon: "rgba(6,182,212,0.10)",  glow: "0 0 0 1px rgba(6,182,212,0.45), 0 10px 34px rgba(6,182,212,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",  tag: "rgba(6,182,212,0.08)"  },
  green:  { border: "rgba(16,185,129,0.22)", icon: "rgba(16,185,129,0.10)", glow: "0 0 0 1px rgba(16,185,129,0.45), 0 10px 34px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,0.05)", tag: "rgba(16,185,129,0.08)" },
}

// `.bento-card` carries global nth-child grid placement (for the home 4-col
// `.services-bento`); reset it so this section keeps its own 3-col grid.
function accentVars(accent: Accent): CSSProperties {
  const a = accentMap[accent]
  return {
    "--accent-border": a.border,
    "--accent-icon": a.icon,
    "--accent-glow": a.glow,
    "--accent-tag": a.tag,
    background: "#00000063",
    gridColumn: "auto",
    gridRow: "auto",
  } as CSSProperties
}

export function ServiceEngagement() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="engagement.models"
            title={<>how.to.<span className="function">engage</span>()</>}
            comment="// three ways to bring us in"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid md:grid-cols-3 gap-5">
          {engagementModels.map((model) => {
            const color = iconColor[model.accent]
            return (
              <div key={model.title} className="bento-card rounded-2xl p-7" style={accentVars(model.accent)}>
                <div className="relative z-[1] flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-blue-100/45">
                      {`// ${model.label}`}
                    </span>
                    <model.Icon size={28} style={{ color }} aria-hidden />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">{model.title}</h3>
                  <p className="mt-1.5 text-sm text-blue-100/60">{model.tagline}</p>

                  <div className="mt-6">
                    <div className="text-[11px] font-mono text-blue-100/45">who it suits</div>
                    <div className="mt-1.5 text-sm text-white/85">{model.suits}</div>
                  </div>

                  <div className="mt-6 flex-1">
                    <div className="text-[11px] font-mono text-blue-100/45">what is included</div>
                    <ul className="mt-2.5 space-y-2">
                      {model.included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-blue-100/70">
                          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: color }} aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <GradientButton
                    href="/contact"
                    variant={model.primary ? "primary" : "secondary"}
                    size="sm"
                    className="w-full mt-6"
                  >
                    talk to us
                  </GradientButton>
                </div>
              </div>
            )
          })}
        </RevealSection>
      </div>
    </section>
  )
}
