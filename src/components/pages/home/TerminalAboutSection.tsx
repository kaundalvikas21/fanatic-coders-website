"use client"

import { useEffect, useRef, useState } from "react"
import { Users, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const aboutContent = [
  {
    command: "cat about.md",
    output: [
      "# About DevAgency",
      "",
      "We are a team of passionate developers, designers, and digital craftsmen who believe in creating exceptional digital experiences.",
      "",
      "## Our Mission",
      "To transform innovative ideas into powerful digital solutions that drive real business growth.",
      "",
      "## Core Values",
      "- Innovation First",
      "- Quality Obsessed",
      "- User Centered",
      "- Always Learning",
    ],
  },
  {
    command: "cat team/stats.json",
    output: [
      "{",
      '  "team_size": 50,',
      '  "years_experience": 10,',
      '  "projects_completed": 500,',
      '  "happy_clients": "98%"',
      "}",
    ],
  },
]

function getLineColor(line: string): string {
  if (line.startsWith("$"))    return "text-indigo-400"
  if (line.startsWith("#"))    return "text-pink-400 font-bold"
  if (line.startsWith("-"))    return "text-green-400"
  if (line.startsWith("{") || line.startsWith("}")) return "text-yellow-400"
  if (line.startsWith('  "'))  return "text-blue-400"
  return ""
}

export default function TerminalAboutSection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const contentRef     = useRef<HTMLDivElement>(null)
  const mountedRef     = useRef(false)
  const [started, setStarted]             = useState(false)
  const [currentText, setCurrentText]     = useState("")
  const [lines, setLines]                 = useState<string[]>([])

  // Scroll trigger
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Typewriter
  useEffect(() => {
    if (!started) return
    mountedRef.current = true

    async function run() {
      const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

      for (const block of aboutContent) {
        if (!mountedRef.current) return

        // Type the command char by char
        for (let i = 0; i <= block.command.length; i++) {
          if (!mountedRef.current) return
          setCurrentText(block.command.slice(0, i))
          await delay(50)
        }

        await delay(500)
        if (!mountedRef.current) return

        // Commit command to output
        setLines(prev => [...prev, `$ ${block.command}`])
        setCurrentText("")

        // Reveal output lines one by one
        for (const line of block.output) {
          if (!mountedRef.current) return
          setLines(prev => [...prev, line])
          await delay(50)
        }

        setLines(prev => [...prev, ""])
        await delay(1000)
      }
    }

    run()
    return () => { mountedRef.current = false }
  }, [started])

  // Auto-scroll terminal content
  useEffect(() => {
    const el = contentRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="about" style={{ background: "var(--dark-3)" }}>
      {/* Code-grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="code-grid absolute inset-0" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">about.module</div>
          <h2 className="heading-code">
            cat <span className="text-indigo-400">./about-us</span>
          </h2>
          <p className="subheading-code">{"// Get to know our story"}</p>
        </div>

        {/* Terminal window */}
        <div className="max-w-4xl mx-auto">
          <div className="about-terminal-window">
            {/* Title bar */}
            <div className="about-terminal-bar">
              <div className="about-window-controls">
                <span className="about-control about-close" />
                <span className="about-control about-minimize" />
                <span className="about-control about-maximize" />
              </div>
              <div className="about-terminal-title">about-us — zsh</div>
            </div>

            {/* Terminal content */}
            <div ref={contentRef} className="about-terminal-content">
              {lines.map((line, i) => (
                <div key={i} className="about-terminal-line">
                  <span className={getLineColor(line) || "text-white/75"}>{line}</span>
                </div>
              ))}
              {/* Active typing line */}
              <div className="about-terminal-line">
                <span className="text-indigo-400">$ </span>
                <span className="text-white/85">{currentText}</span>
                <span className="about-cursor">|</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <GradientButton href="/contact">
              joinOurTeam
              <Users size={16} className="ml-2" aria-hidden />
            </GradientButton>
            <GradientButton href="/careers" variant="secondary">
              viewOpenings
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  )
}
