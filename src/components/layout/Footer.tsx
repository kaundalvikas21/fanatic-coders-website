"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight, MessageCircle } from "lucide-react"

// Brand SVG icons (lucide-react doesn't include brand/social icons)
function IconGithub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
function IconTwitter({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
import GradientButton from "@/components/ui/GradientButton"

const footerLinks = {
  services: [
    { name: "Web Development", href: "/services/web-development" },
    { name: "E-Commerce",       href: "/services/ecommerce"       },
    { name: "Mobile Apps",      href: "/services/mobile-apps"     },
    { name: "UI/UX Design",     href: "/services/ui-ux"           },
    { name: "Cloud Solutions",  href: "/services/cloud"           },
  ],
  company: [
    { name: "About Us", href: "/about"   },
    { name: "Careers",  href: "/careers" },
    { name: "Blog",     href: "/blog"    },
    { name: "Contact",  href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs"          },
    { name: "Case Studies",  href: "/case-studies"  },
    { name: "Open Source",   href: "/open-source"   },
    { name: "Privacy Policy",href: "/privacy"       },
  ],
  social: [
    { name: "GitHub",    Icon: IconGithub,    href: "https://github.com"    },
    { name: "Twitter",   Icon: IconTwitter,   href: "https://twitter.com"   },
    { name: "LinkedIn",  Icon: IconLinkedin,  href: "https://linkedin.com"  },
    { name: "Instagram", Icon: IconInstagram, href: "https://instagram.com" },
  ],
}

const codeSnippets = ["export *","import","const","class","function","return","await","async","let","=>"]

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const gridSize = 10
    const spacing = container.offsetWidth / gridSize
    const elements: HTMLElement[] = []
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() > 0.85) {
          const el = document.createElement("div")
          el.className = "absolute text-sm font-mono transition-all duration-300"
          el.style.left = `${i * spacing + Math.random() * 20}px`
          el.style.top  = `${j * spacing + Math.random() * 20}px`
          el.style.color = "rgba(124,58,237,0.2)"
          el.style.padding = "0.4rem 0.8rem"
          el.style.borderRadius = "0.5rem"
          el.style.background = "rgba(124,58,237,0.04)"
          el.style.border = "1px solid rgba(124,58,237,0.1)"
          el.style.cursor = "default"
          el.style.userSelect = "none"
          el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          container.appendChild(el)
          elements.push(el)
        }
      }
    }
    return () => elements.forEach(el => el.remove())
  }, [])

  return (
    <footer className="footer-root relative overflow-hidden pt-24 pb-12">
      {/* Aurora top fade */}
      <div className="aurora-top-fade absolute top-0 left-0 right-0 h-32 pointer-events-none" />

      {/* Code background */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-[0.08]" />

      <div className="container mx-auto px-4 relative">
        {/* CTA card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-blue-100/70 mb-6">
                Let&apos;s create something extraordinary together. Our team is ready to bring your vision to life.
              </p>
              <GradientButton href="/contact">
                startConversation
                <MessageCircle size={16} className="ml-2" aria-hidden />
              </GradientButton>
            </div>
            <div className="relative">
              <div className="code-decoration font-mono text-sm space-y-2 text-blue-100/40">
                <div><span className="text-pink-400">const</span> <span className="text-indigo-400">project</span> = {"{"}</div>
                <div className="pl-4">status: <span className="text-green-400">&apos;ready&apos;</span>,</div>
                <div className="pl-4">team: <span className="text-blue-400">&apos;assembled&apos;</span>,</div>
                <div className="pl-4">innovation: <span className="text-yellow-400">&apos;unlimited&apos;</span></div>
                <div>{"}"} ;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-xl font-bold inline-flex items-center no-underline">
              <span className="text-white">{"{"}</span>
              <span className="animated-gradient-text">fanaticCoders</span>
              <span className="text-white">{"}"}</span>
            </Link>
            <p className="text-blue-100/70">
              Crafting exceptional digital experiences with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/30"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit us on ${name}`}
                  title={name}
                >
                  <Icon size={18} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-4 list-none m-0 p-0">
              {footerLinks.services.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100/70 hover:text-white transition-colors flex items-center group no-underline">
                    <ChevronRight size={14} className="text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all" aria-hidden />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4 list-none m-0 p-0">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100/70 hover:text-white transition-colors flex items-center group no-underline">
                    <ChevronRight size={14} className="text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all" aria-hidden />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 list-none m-0 p-0">
              {footerLinks.resources.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100/70 hover:text-white transition-colors flex items-center group no-underline">
                    <ChevronRight size={14} className="text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all" aria-hidden />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-indigo-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-100/60 text-sm">
              © {currentYear} fanaticCoders. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms"   className="text-blue-100/60 hover:text-white transition-colors no-underline">Terms of Service</Link>
              <Link href="/privacy" className="text-blue-100/60 hover:text-white transition-colors no-underline">Privacy Policy</Link>
              <Link href="/cookies" className="text-blue-100/60 hover:text-white transition-colors no-underline">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
