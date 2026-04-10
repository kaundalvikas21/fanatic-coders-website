"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  LayoutGrid,
  Code2,
  Globe,
  Smartphone,
  ShoppingCart,
  Cloud,
  Paintbrush,
  Pen,
  BadgeCheck,
  Film,
  TrendingUp,
  Megaphone,
  Search,
  GitBranch,
  Briefcase,
  Users,
  Newspaper,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

interface MegaMenuItem {
  name: string
  description: string
  Icon: React.ElementType
  href: string
}

interface MegaMenuColumn {
  heading: string
  Icon: React.ElementType
  items: MegaMenuItem[]
}

const megaMenu = {
  title: "Services",
  Icon: LayoutGrid,
  columns: [
    {
      heading: "Build",
      Icon: Code2,
      items: [
        { name: "Web Development", description: "Scalable web apps",    Icon: Globe,         href: "/services/web-development" },
        { name: "Mobile Apps",     description: "iOS & Android native", Icon: Smartphone,    href: "/services/mobile-apps"     },
        { name: "E-Commerce",      description: "Custom online stores", Icon: ShoppingCart,  href: "/services/ecommerce"       },
        { name: "Cloud Solutions", description: "AWS, Azure & GCP",     Icon: Cloud,         href: "/services/cloud"           },
      ],
    },
    {
      heading: "Design",
      Icon: Paintbrush,
      items: [
        { name: "UI/UX Design",   description: "User-first interfaces", Icon: Pen,        href: "/services/design" },
        { name: "Brand Identity", description: "Logos & guidelines",    Icon: BadgeCheck, href: "/services/brand"  },
        { name: "Motion Design",  description: "Motion & animations",   Icon: Film,       href: "/services/motion" },
      ],
    },
    {
      heading: "Grow",
      Icon: TrendingUp,
      items: [
        { name: "Digital Marketing",   description: "Growth campaigns", Icon: Megaphone, href: "/services/marketing" },
        { name: "SEO & Content",       description: "SEO & content",    Icon: Search,    href: "/services/seo"       },
        { name: "DevOps & Consulting", description: "CI/CD & strategy", Icon: GitBranch, href: "/services/devops"    },
      ],
    },
  ] as MegaMenuColumn[],
  featured: {
    href: "/contact",
    cta: "startProject",
    description: "Tell us your vision — we'll respond within 24 hours.",
    stats: [
      { number: "150+", label: "Projects"     },
      { number: "98%",  label: "Satisfaction" },
      { number: "10+",  label: "Years Exp."   },
    ],
  },
}

const navLinks = [
  { label: "Portfolio", href: "/portfolio", Icon: Briefcase  },
  { label: "About",     href: "/about",     Icon: Users      },
  { label: "Blog",      href: "/blog",      Icon: Newspaper  },
]

export default function Header() {
  const [isScrolled, setIsScrolled]               = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen]       = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll  = () => setIsScrolled(window.scrollY > 20)
    const onEscape  = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsMegaMenuOpen(false); setIsMobileMenuOpen(false) }
    }
    const onClick   = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("scroll", onScroll)
    window.addEventListener("keydown", onEscape)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onEscape)
      document.removeEventListener("click", onClick)
    }
  }, [])

  function openMegaMenu() {
    if (menuTimeout.current) clearTimeout(menuTimeout.current)
    setIsMegaMenuOpen(true)
  }
  function closeMegaMenu() {
    menuTimeout.current = setTimeout(() => setIsMegaMenuOpen(false), 150)
  }
  function cancelClose() {
    if (menuTimeout.current) clearTimeout(menuTimeout.current)
  }
  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
    setMobileServicesOpen(false)
  }

  return (
    <header
      className="fixed w-full z-50 transition-all duration-300"
      style={isScrolled ? { background: "rgba(8,8,16,0.95)", backdropFilter: "blur(24px) saturate(200%)" } : {}}
    >
      <div className="container mx-auto px-4">
        <nav
          ref={navRef}
          className="glass-nav rounded-2xl my-4 relative flex items-center justify-between px-6 py-4"
        >
          {/* Logo */}
          <Link href="/" className="shrink-0 text-[1.2rem] font-bold no-underline hover:opacity-80 transition-opacity">
            <span className="text-white">{"{"}</span>
            <span className="logo-gradient">fanaticCoders</span>
            <span className="text-white">{"}"}</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {/* Services with mega-menu */}
            <li className="relative">
              <button
                type="button"
                className={`nav-link${isMegaMenuOpen ? " nav-link--active" : ""}`}
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen}
                onMouseEnter={openMegaMenu}
                onMouseLeave={closeMegaMenu}
                onClick={() => setIsMegaMenuOpen(v => !v)}
              >
                <megaMenu.Icon size={14} aria-hidden />
                <span>{megaMenu.title}</span>
                <ChevronDown
                  size={11}
                  className="transition-transform duration-250"
                  style={{ transform: isMegaMenuOpen ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.4)" }}
                  aria-hidden
                />
              </button>
            </li>

            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  <link.Icon size={14} aria-hidden />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <GradientButton href="/contact">
                startProject
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
              </GradientButton>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle mobile navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(v => !v)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mega Menu Panel */}
          {isMegaMenuOpen && (
            <div
              className="mega-panel"
              role="region"
              aria-label="Services navigation"
              onMouseEnter={cancelClose}
              onMouseLeave={closeMegaMenu}
            >
              <div className="mega-inner">
                {/* 3 service columns */}
                <div className="mega-columns">
                  {megaMenu.columns.map(col => (
                    <div key={col.heading} className="mega-col">
                      <div className="col-head">
                        <col.Icon size={13} aria-hidden />
                        {col.heading}
                      </div>
                      <ul className="space-y-1 list-none m-0 p-0">
                        {col.items.map(item => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="mega-item"
                              onClick={() => setIsMegaMenuOpen(false)}
                            >
                              <span className="item-icon">
                                <item.Icon size={16} aria-hidden />
                              </span>
                              <span className="item-body">
                                <span className="item-name">{item.name}</span>
                                <span className="item-desc">{item.description}</span>
                              </span>
                              <ArrowRight size={12} className="item-arrow" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="v-divider" aria-hidden />

                {/* Featured panel */}
                <div className="mega-featured">
                  <p className="featured-eyebrow">Work with us</p>
                  <h3 className="featured-heading">Ready to Build?</h3>
                  <p className="featured-body">{megaMenu.featured.description}</p>
                  <div className="featured-stats">
                    {megaMenu.featured.stats.map(s => (
                      <div key={s.label} className="stat-item">
                        <span className="stat-num">{s.number}</span>
                        <span className="stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <GradientButton href={megaMenu.featured.href}>
                      {megaMenu.featured.cta}
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[5rem] p-4 z-40">
            <div className="glass-nav rounded-xl p-4 shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-1">
                {/* Services accordion */}
                <button
                  type="button"
                  className="mobile-row w-full justify-between"
                  onClick={() => setMobileServicesOpen(v => !v)}
                >
                  <span className="flex items-center gap-2.5 font-semibold">
                    <LayoutGrid size={16} className="text-violet-400" aria-hidden />
                    {megaMenu.title}
                  </span>
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300"
                    style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-3 space-y-4 pb-2">
                    {megaMenu.columns.map(col => (
                      <div key={col.heading}>
                        <p className="mobile-col-head">{col.heading}</p>
                        {col.items.map(item => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="mobile-item"
                            onClick={closeMobileMenu}
                          >
                            <item.Icon size={15} className="text-violet-400 shrink-0" aria-hidden />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="mobile-row"
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center gap-2.5">
                      <link.Icon size={17} className="text-violet-400" aria-hidden />
                      {link.label}
                    </span>
                  </Link>
                ))}

                <div className="pt-2">
                  <GradientButton href="/contact" className="w-full justify-center">
                    startProject
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
