"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Code2, Play, Pause } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const projects = [
  {
    id: "fintech-app",
    title: "FinTech Revolution",
    description: "A comprehensive financial technology platform that revolutionizes how users manage their investments and track market trends.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "WebSocket", "AWS"],
    category: "Full Stack Development",
    stats: { Users: "50K+", Transactions: "$2M+", Uptime: "99.9%" },
    link: "/case-study/fintech-app",
  },
  {
    id: "ecommerce-platform",
    title: "Global Commerce Hub",
    description: "Multi-vendor e-commerce platform with real-time inventory management and AI-powered recommendations.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop",
    tags: ["Vue.js", "Laravel", "PostgreSQL", "ElasticSearch", "Docker"],
    category: "E-Commerce",
    stats: { Vendors: "1000+", Products: "100K+", Orders: "500K+" },
    link: "/case-study/ecommerce-platform",
  },
  {
    id: "health-platform",
    title: "HealthTech Connect",
    description: "Telemedicine platform connecting patients with healthcare providers through secure video consultations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Next.js", "GraphQL", "WebRTC", "Azure", "TypeScript"],
    category: "Healthcare",
    stats: { Doctors: "5K+", Patients: "100K+", Consultations: "250K+" },
    link: "/case-study/health-platform",
  },
  {
    id: "smart-city",
    title: "Smart City Dashboard",
    description: "IoT-powered city management system with real-time monitoring and predictive analytics.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
    tags: ["Angular", "Python", "TensorFlow", "IoT", "Kubernetes"],
    category: "IoT & Analytics",
    stats: { Sensors: "10K+", DataPoints: "1M+", Cities: "5+" },
    link: "/case-study/smart-city",
  },
]

export default function PortfolioSection() {
  const intervalRef         = useRef<ReturnType<typeof setInterval> | null>(null)
  const [currentIndex, setCurrentIndex]   = useState(0)
  const [isPaused, setIsPaused]           = useState(false)
  const [slideKey, setSlideKey]           = useState(0)   // drives fade-in re-trigger
  const [isHovered, setIsHovered]         = useState(false)

  const project = projects[currentIndex]

  function goTo(i: number) {
    setCurrentIndex(i)
    setSlideKey(k => k + 1)
  }
  function next() { goTo((currentIndex + 1) % projects.length) }
  function prev() { goTo((currentIndex - 1 + projects.length) % projects.length) }

  // Auto-advance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || isPaused || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused, isHovered, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      className="min-h-screen py-12 md:py-24 relative overflow-hidden"
      id="portfolio"
      style={{ background: "var(--dark-3)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 -z-10">
        <div className="portfolio-bg-grid absolute inset-0 opacity-10" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">portfolio.showcase</div>
          <h2 className="heading-code">
            case_studies.<span className="text-indigo-400">featured</span>()
          </h2>
          <p className="subheading-code">{"// Transforming challenges into digital success stories"}</p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-blue-100/80 transition-colors hover:bg-indigo-500/20"
            onClick={() => setIsPaused(p => !p)}
            aria-pressed={isPaused}
          >
            {isPaused
              ? <><Play size={14} aria-hidden /> Resume project carousel</>
              : <><Pause size={14} aria-hidden /> Pause project carousel</>
            }
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main showcase */}
          <div
            className="relative grid md:grid-cols-2 gap-8 items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Desktop prev arrow */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -translate-x-full -left-4 z-10 min-h-11 min-w-11 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 backdrop-blur-sm"
              aria-label="Previous featured project"
              onClick={prev}
            >
              <ArrowLeft size={24} aria-hidden />
            </button>

            {/* Desktop next arrow */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 translate-x-full -right-4 z-10 min-h-11 min-w-11 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 backdrop-blur-sm"
              aria-label="Next featured project"
              onClick={next}
            >
              <ArrowRight size={24} aria-hidden />
            </button>

            {/* Project image (desktop only) */}
            <div className="hidden md:block relative overflow-hidden rounded-2xl h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent z-10" />
              <Image
                key={slideKey}
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1200px) 50vw, 600px"
                className="object-cover portfolio-img-fade"
                loading="lazy"
              />
            </div>

            {/* Project info card */}
            <div className="portfolio-glass-card p-4 sm:p-8 rounded-2xl" key={`info-${slideKey}`}>
              <div className="portfolio-slide-in space-y-4 sm:space-y-6">
                {/* Category */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-sm font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold portfolio-gradient-text">
                  {project.title}
                </h3>

                <p className="text-blue-100/70 leading-relaxed">{project.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="portfolio-stat-card">
                      <div className="text-sm sm:text-lg md:text-xl font-bold text-indigo-400">{value}</div>
                      <div className="text-xs sm:text-sm text-blue-100/60 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-sm py-1 px-3 rounded-full font-mono"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.2)",
                        color: "#a855f7",
                      }}
                    >
                      <Code2 size={12} aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <GradientButton href={project.link}>
                  viewCaseStudy
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
                </GradientButton>
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="mt-6 flex md:hidden items-center justify-between gap-2">
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 transition-colors hover:bg-indigo-500/30"
              aria-label="Previous featured project"
              onClick={prev}
            >
              <ArrowLeft size={20} aria-hidden />
            </button>
            <div className="flex items-center gap-3">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full"
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => goTo(i)}
                >
                  <span className="absolute h-1 w-5 rounded-full bg-indigo-500/20" />
                  <span
                    className="absolute h-1 w-5 rounded-full bg-indigo-500 transition-transform duration-300"
                    style={{ transform: `scaleX(${currentIndex === i ? 1 : 0})`, transformOrigin: "left" }}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 transition-colors hover:bg-indigo-500/30"
              aria-label="Next featured project"
              onClick={next}
            >
              <ArrowRight size={20} aria-hidden />
            </button>
          </div>

          {/* Desktop dot navigation */}
          <div className="mt-12 hidden md:flex justify-center items-center gap-4">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                aria-label={`Go to project ${i + 1}`}
                onClick={() => goTo(i)}
              >
                <span className="absolute h-1 w-5 rounded-full bg-indigo-500/20" />
                <span
                  className="absolute h-1 w-5 rounded-full bg-indigo-500 transition-transform duration-300"
                  style={{ transform: `scaleX(${currentIndex === i ? 1 : 0})`, transformOrigin: "left" }}
                />
              </button>
            ))}
          </div>

          {/* View all */}
          <div className="mt-10 flex justify-center">
            <GradientButton href="/portfolio" variant="secondary">
              viewAllProjects
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  )
}
