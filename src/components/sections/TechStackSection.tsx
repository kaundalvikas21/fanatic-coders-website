"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code2, Database, Brain, TrendingUp,
  LayoutGrid, Hexagon, Shield, Infinity, ArrowRight, Braces, Wind, Paintbrush,
  Settings2, FileCode2, Leaf, Flame, Layers, Network, Zap, Workflow,
  ScatterChart, Bot, Table2, FunctionSquare, BookOpen,
  Target, BarChart2, Share2, Mail, Filter, Search, Link, LineChart,
} from "lucide-react"
import type { ElementType } from "react"

interface Tech {
  name: string
  Icon: ElementType
}

interface Category {
  id: string
  name: string
  Icon: ElementType
  accent: string
  technologies: Tech[]
}

const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend",
    Icon: Code2,
    accent: "#7c3aed",
    technologies: [
      { name: "React",        Icon: LayoutGrid   },
      { name: "Vue.js",       Icon: Hexagon      },
      { name: "Angular",      Icon: Shield       },
      { name: "Svelte",       Icon: Infinity     },
      { name: "Next.js",      Icon: ArrowRight   },
      { name: "TypeScript",   Icon: Braces       },
      { name: "Tailwind CSS", Icon: Wind         },
      { name: "SASS",         Icon: Paintbrush   },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    Icon: Database,
    accent: "#2563eb",
    technologies: [
      { name: "Node.js",    Icon: Settings2   },
      { name: "Python",     Icon: FileCode2   },
      { name: "Django",     Icon: Leaf        },
      { name: "Laravel",    Icon: Flame       },
      { name: "PostgreSQL", Icon: Database    },
      { name: "MongoDB",    Icon: Layers      },
      { name: "GraphQL",    Icon: Network     },
      { name: "Redis",      Icon: Zap         },
    ],
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    Icon: Brain,
    accent: "#06b6d4",
    technologies: [
      { name: "TensorFlow",   Icon: Workflow        },
      { name: "PyTorch",      Icon: Flame           },
      { name: "Scikit-learn", Icon: ScatterChart    },
      { name: "OpenAI",       Icon: Bot             },
      { name: "Keras",        Icon: Brain           },
      { name: "Pandas",       Icon: Table2          },
      { name: "NumPy",        Icon: FunctionSquare  },
      { name: "Jupyter",      Icon: BookOpen        },
    ],
  },
  {
    id: "digital",
    name: "Digital Marketing",
    Icon: TrendingUp,
    accent: "#10b981",
    technologies: [
      { name: "Google Ads",       Icon: Target    },
      { name: "Google Analytics", Icon: BarChart2 },
      { name: "Meta Ads",         Icon: Share2    },
      { name: "Mailchimp",        Icon: Mail      },
      { name: "HubSpot",          Icon: Filter    },
      { name: "Semrush",          Icon: Search    },
      { name: "Ahrefs",           Icon: Link      },
      { name: "Moz",              Icon: LineChart },
    ],
  },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible]         = useState(false)
  const [activeCat, setActiveCat]     = useState(categories[0])
  const [fadeKey, setFadeKey]         = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function switchCategory(cat: Category) {
    setActiveCat(cat)
    setFadeKey(k => k + 1)
  }

  const v = visible ? "visible" : ""

  return (
    <section ref={sectionRef} className="techstack-section py-24 relative overflow-hidden" id="tech-stack">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--dark-3)" }} />
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-35"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${v}`}>
          <div className="preheading-code">tech.stack</div>
          <h2 className="heading-code mt-2">
            our.<span style={{ color: "#a855f7" }}>technologies</span>()
          </h2>
          <p className="subheading-code mt-3">
            {"// Tools and technologies we use to build amazing solutions"}
          </p>
        </div>

        {/* Category tabs */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 reveal ${v}`}
          role="tablist"
          aria-label="Technology categories"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`cat-tab flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200${activeCat.id === cat.id ? " cat-active" : ""}`}
              style={{ "--cat-accent": cat.accent } as React.CSSProperties}
              role="tab"
              aria-selected={activeCat.id === cat.id}
              aria-controls={`tech-category-${cat.id}`}
              onClick={() => switchCategory(cat)}
            >
              <cat.Icon size={16} aria-hidden />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tech grid — key-based remount triggers CSS fade-in */}
        <div
          key={fadeKey}
          id={`tech-category-${activeCat.id}`}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto tech-grid-fade"
          role="tabpanel"
        >
          {activeCat.technologies.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-card group rounded-xl p-5"
              style={{
                "--tech-accent": activeCat.accent,
                transitionDelay: `${i * 30}ms`,
              } as React.CSSProperties}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="tech-icon w-14 h-14 rounded-xl flex items-center justify-center">
                  <tech.Icon size={28} style={{ color: activeCat.accent }} aria-hidden />
                </div>
                <span className="text-sm text-blue-100/60 group-hover:text-white transition-colors text-center font-mono">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Code decoration */}
        <div className="mt-14 text-center font-mono text-xs space-y-1 text-blue-100/30">
          <div>
            <span style={{ color: "#f472b6" }}>export default</span>
            <span style={{ color: "#818cf8" }}> function</span>
            <span> buildAmazing() {"{"}</span>
          </div>
          <div className="pl-4">tools: <span style={{ color: "#34d399" }}>&apos;cutting-edge&apos;</span>,</div>
          <div className="pl-4">results: <span style={{ color: "#60a5fa" }}>&apos;exceptional&apos;</span></div>
          <div>{"}"}</div>
        </div>
      </div>
    </section>
  )
}
