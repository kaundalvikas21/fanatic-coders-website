import { Check } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"

const principles = [
  "Senior engineers on every project, no hand-offs to juniors",
  "Ship in weeks, not quarters, with weekly demo cadence",
  "Own the outcome: performance, accessibility, and uptime",
  "Transparent pricing and a single point of contact",
]

const codeLines: { text: string; cls: string }[] = [
  { text: "const mission = {", cls: "text-[#a855f7]" },
  { text: "  craft: 'production-grade',", cls: "text-blue-100/55" },
  { text: "  speed: 'weeks not quarters',", cls: "text-blue-100/55" },
  { text: "  partners: true,", cls: "text-blue-100/55" },
  { text: "}", cls: "text-[#a855f7]" },
]

export function MissionSection() {
  return (
    <section id="mission" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: copy */}
          <RevealSection>
            <SectionHeading
              align="left"
              badge="mission.md"
              title={<>why.<span className="function">weExist</span>()</>}
              comment="// build software teams wish they had written"
            />
            <p className="mt-6 text-blue-100/70 leading-relaxed">
              We started fanaticCoders because too much software ships slow and brittle. Our
              answer is small senior teams and tight feedback loops, with the product actually
              working for real users as the thing we measure.
            </p>
            <ul className="mt-6 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-blue-100/75">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
                    <Check size={12} className="text-indigo-300" aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </RevealSection>

          {/* Right: terminal decoration */}
          <RevealSection aria-hidden>
            <div className="terminal-card">
              <div className="terminal-bar">
                <div className="flex items-center gap-2">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="text-xs font-mono text-white/50 ml-3">mission.ts</span>
              </div>
              <div className="p-6 md:p-8 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <div key={i} className={line.cls}>
                    <span className="select-none text-white/20 mr-4">{String(i + 1).padStart(2, "0")}</span>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
