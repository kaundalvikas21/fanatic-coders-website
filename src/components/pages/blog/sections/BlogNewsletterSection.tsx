"use client"

import { useState, type FormEvent } from "react"
import { Send, Check } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function BlogNewsletterSection() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email.")
      return
    }
    setError(null)
    // Interim guard: no backend yet. Route the signup to our inbox via the visitor's mail client
    // so it isn't lost. Replace with a provider/Supabase call in a later phase.
    window.location.href = `mailto:hello@fanaticcoders.com?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add ${email.trim()} to the newsletter list.`)}`
    setDone(true)
  }

  return (
    <section id="blog-newsletter" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-cta absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono mb-8 badge-aurora">
            <span style={{ color: "#a855f7" }}>$</span>
            <span className="text-blue-200/80">./subscribe.sh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            New posts, no noise
          </h2>
          <p className="text-lg text-blue-100/65 mb-8">
            One thoughtful email when we publish. No spam, unsubscribe anytime.
          </p>

          {done ? (
            <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/15 px-5 py-3 text-sm text-green-300">
              <Check size={16} aria-hidden />
              Your email app should open, hit send to confirm your signup.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mx-auto flex max-w-md flex-col sm:flex-row gap-3">
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                  placeholder="you@company.com"
                  className={`w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white placeholder:text-blue-100/35 border outline-none transition-colors focus:border-indigo-400/60 ${error ? "border-red-400/60" : "border-white/10"}`}
                />
                {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
              </div>
              <GradientButton type="submit">
                subscribe
                <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
              </GradientButton>
            </form>
          )}
        </RevealSection>
      </div>
    </section>
  )
}
