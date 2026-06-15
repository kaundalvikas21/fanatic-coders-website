import type { ReactNode } from "react"
import { RevealSection } from "@/components/ui/RevealSection"

interface CtaPanelProps {
  /** Section id (kept for nav anchors, e.g. home `#contact`). */
  sectionId: string
  /** Mono badge text after the `$`, e.g. `./scope-your-build.sh`. */
  badge: string
  heading: string
  body: string
  /** Section background. Defaults to `var(--dark-2)`. */
  background?: string
  /** `primary` = bold violet-glow CTA; `muted` = lighter, secondary (e.g. newsletter). */
  variant?: "primary" | "muted"
  /** Button row. */
  children: ReactNode
}

/**
 * Shared call-to-action panel: a contained glass card (dotted texture, hairline
 * border + top accent, soft shadow) on a calm ambient glow. Used by the page CTA
 * sections so the design stays consistent in one place.
 */
export function CtaPanel({ sectionId, badge, heading, body, background = "var(--dark-2)", variant = "primary", children }: CtaPanelProps) {
  const muted = variant === "muted"
  return (
    <section id={sectionId} className="py-24 relative overflow-hidden" style={{ background }}>
      {!muted && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 60%)" }}
        />
      )}

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: "#00000063",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: muted
                ? "0 16px 44px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 0 0 1px rgba(124,58,237,0.14), 0 24px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="dot-grid absolute inset-0 pointer-events-none opacity-[0.12]"
              style={{ maskImage: "radial-gradient(ellipse 70% 70% at 50% 60%, black, transparent 78%)" }}
            />

            <div className="terminal-bar relative z-[1]">
              <div className="flex items-center gap-2">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="ml-3 text-xs font-mono text-white/50">{badge}</span>
            </div>

            <div className={`relative z-[1] px-8 text-center ${muted ? "py-10 md:py-12 md:px-16" : "py-14 md:px-16 md:py-16"}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                {heading}
              </h2>
              <p className="text-base sm:text-lg text-blue-100/60 mb-9 max-w-xl mx-auto leading-relaxed">
                {body}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">{children}</div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
