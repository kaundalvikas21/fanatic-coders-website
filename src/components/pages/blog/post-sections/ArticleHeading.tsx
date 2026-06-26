"use client"

import { useState } from "react"
import { Link2, Check } from "lucide-react"

/**
 * Article section heading: mono, code-styled, with a hover-revealed anchor button
 * that copies a deep link to the section. The section wrapper keeps the `id` and
 * `scroll-mt` offset (and is what the TOC scroll-spy observes); this only builds
 * the URL and nudges the address bar.
 */
export function ArticleHeading({ id, children }: { id: string; children: string }) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    history.replaceState(null, "", `#${id}`)
    navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  return (
    <h2 className="group/h flex items-center gap-2 font-mono text-[1.375rem] md:text-2xl font-bold text-white tracking-tight text-balance">
      <span>{children}</span>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : `Copy link to section: ${children}`}
        className="shrink-0 p-1.5 -m-1.5 text-indigo-300 opacity-0 transition-opacity hover:text-white group-hover/h:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      >
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      </button>
      <span
        aria-hidden
        className={`font-mono text-xs font-normal text-indigo-300 transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        copied
      </span>
    </h2>
  )
}
