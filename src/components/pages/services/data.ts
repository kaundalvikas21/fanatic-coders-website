import {
  Code2, Smartphone, ShoppingCart, Cloud, Palette, PenTool,
  Film, TrendingUp, Search, Settings,
} from "lucide-react"
import type { ElementType } from "react"

export type Accent = "violet" | "cyan" | "green"

export interface ServiceItem {
  title: string
  description: string
  slug: string
  Icon: ElementType
  /** Short problem framing shown on the detail hero/overview. */
  intro: string
  /** What the engagement delivers. */
  points: string[]
  /** One-line result the client can expect. */
  outcome: string
  /** Relevant stack chips. */
  tech: string[]
  /** Quick proof figures for the hero. */
  stats: { value: string; label: string }[]
  /** Buyer questions answered on the detail page. */
  faqs: { q: string; a: string }[]
  /** Portfolio project ids that prove this service. */
  relatedCaseStudyIds: string[]
}

export interface ServiceGroup {
  key: string
  label: string
  blurb: string
  accent: Accent
  items: ServiceItem[]
}

export const iconColor: Record<Accent, string> = { violet: "#a855f7", cyan: "#22d3ee", green: "#34d399" }

/** Shared delivery process, the same across every service line. */
export const serviceProcess = [
  { n: "01", title: "Discover", desc: "We pin down goals, users, and constraints, then agree a sharp, prioritized scope." },
  { n: "02", title: "Plan", desc: "A written plan with milestones, a timeline, and a fixed quote before any build starts." },
  { n: "03", title: "Build", desc: "Senior people ship weekly increments with demos, tests, and CI from day one." },
  { n: "04", title: "Launch", desc: "We deploy, measure, and stay on as partners well past go-live." },
]

export const groups: ServiceGroup[] = [
  {
    key: "build", label: "build", blurb: "Ship reliable products and platforms", accent: "violet",
    items: [
      {
        title: "Web Development", slug: "web-development", Icon: Code2,
        description: "Fast, accessible web apps on Next.js, React, and a typed backend.",
        intro: "Most agency sites are slow and hard to change. We build web apps that load fast, rank well, and stay easy for your team to extend.",
        points: [
          "Next.js and React front ends with a typed API behind them",
          "Accessibility and performance budgets agreed before we build",
          "Tests and CI from the first commit, not bolted on later",
          "A staging link you can click through every week",
        ],
        outcome: "A product that loads fast, ranks well, and is easy to extend.",
        tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
        stats: [{ value: "<1s", label: "target LCP" }, { value: "100%", label: "typed" }, { value: "weekly", label: "demos" }],
        faqs: [
          { q: "How long does a build take?", a: "A landing page or MVP is usually 2 to 4 weeks. A full web app runs 6 to 12 weeks. We give a detailed timeline in the planning phase." },
          { q: "Do you work with our existing codebase?", a: "Yes. We can extend what you have or rebuild the parts that are holding you back, after a short review of the current code." },
          { q: "What about performance and SEO?", a: "We set performance and accessibility budgets up front and ship server-rendered pages, so speed and SEO are part of the build, not an afterthought." },
        ],
        relatedCaseStudyIds: ["northwind", "lumen"],
      },
      {
        title: "Mobile Apps", slug: "mobile-apps", Icon: Smartphone,
        description: "Native-quality iOS and Android from one cross-platform codebase.",
        intro: "Two native apps cost twice as much to build and maintain. We ship one codebase to both stores that still feels native on each.",
        points: [
          "One codebase that ships to both the App Store and Google Play",
          "Native feel, smooth animation, and offline support where it counts",
          "Push, deep links, and analytics wired in from day one",
          "Release pipelines so updates go out without drama",
        ],
        outcome: "An app users rate highly and your team can keep shipping.",
        tech: ["React Native", "Expo", "Swift", "Kotlin"],
        stats: [{ value: "1", label: "codebase" }, { value: "2", label: "app stores" }, { value: "60fps", label: "target" }],
        faqs: [
          { q: "Native or cross-platform?", a: "We build cross-platform with React Native for most products, which cuts cost and keeps both stores in sync. We go fully native when a feature genuinely needs it." },
          { q: "Can it work offline?", a: "Yes. We design a local-first data model with conflict-aware sync when the product needs to work without a connection." },
          { q: "Do you handle store submission?", a: "We set up the release pipeline and handle the first submission to both stores, then hand over so your team can ship updates." },
        ],
        relatedCaseStudyIds: ["wander"],
      },
      {
        title: "E-Commerce", slug: "ecommerce", Icon: ShoppingCart,
        description: "Custom storefronts and checkouts built to convert and scale.",
        intro: "A slow store and a clunky checkout cost you orders every day. We build storefronts tuned to convert and hold up under a sale.",
        points: [
          "Headless storefronts on the stack that fits your catalog",
          "Checkout tuned for conversion on every device",
          "Inventory, payments, and tax integrated cleanly",
          "Page speed that holds up during a sale",
        ],
        outcome: "More completed orders and a store that scales with demand.",
        tech: ["Next.js", "Stripe", "Shopify", "PostgreSQL"],
        stats: [{ value: "+38%", label: "conversion" }, { value: "0.9s", label: "load time" }, { value: "100%", label: "sale uptime" }],
        faqs: [
          { q: "Do you use Shopify or build custom?", a: "Both. We use Shopify or a headless setup when it fits, and build custom when your catalog or checkout needs something off the shelf cannot do." },
          { q: "Will it handle a traffic spike?", a: "Yes. We cache at the edge and load test before launch so the store stays fast and available through a peak sale." },
          { q: "Can you migrate our existing store?", a: "We migrate products, customers, and orders with a plan to avoid downtime and protect your search rankings." },
        ],
        relatedCaseStudyIds: ["northwind"],
      },
      {
        title: "Cloud Solutions", slug: "cloud", Icon: Cloud,
        description: "Resilient infrastructure, APIs, and data pipelines in the cloud.",
        intro: "Infrastructure that nobody understands becomes a liability. We build cloud systems that are reproducible, observable, and affordable as you grow.",
        points: [
          "Infrastructure as code you can read and reproduce",
          "APIs and data pipelines built for load and observability",
          "Zero-downtime deploys with a clear rollback path",
          "Cost and capacity planned before traffic arrives",
        ],
        outcome: "Infrastructure that stays up and stays affordable as you grow.",
        tech: ["AWS", "Terraform", "Kubernetes", "Docker"],
        stats: [{ value: "99.9%", label: "uptime target" }, { value: "IaC", label: "reproducible" }, { value: "0", label: "downtime deploys" }],
        faqs: [
          { q: "Which cloud do you work with?", a: "Mostly AWS, and we work with GCP or Azure when that is where you already are. The architecture choices matter more than the logo." },
          { q: "Can you reduce our cloud bill?", a: "Often, yes. We start with a review of usage and architecture, then right-size and remove waste with a costed plan." },
          { q: "Do you set up monitoring?", a: "Every system ships with traces, metrics, and alerts tied to real budgets, so you see problems before your users do." },
        ],
        relatedCaseStudyIds: ["pulse", "atlas"],
      },
    ],
  },
  {
    key: "design", label: "design", blurb: "Make it clear, distinctive, and a joy to use", accent: "cyan",
    items: [
      {
        title: "UI/UX Design", slug: "design", Icon: Palette,
        description: "Research-led flows and polished interfaces in your design system.",
        intro: "A pretty screen that confuses users is a failure. We design flows people understand on the first try, then hand off something developers can build.",
        points: [
          "Research and flows before a single pixel is pushed",
          "Wireframes validated with real users where it matters",
          "Polished, accessible interfaces in a reusable design system",
          "Handoff developers can build from without guessing",
        ],
        outcome: "An interface people understand on the first try.",
        tech: ["Figma", "Storybook", "Tailwind"],
        stats: [{ value: "WCAG", label: "AA built in" }, { value: "1", label: "design system" }, { value: "100%", label: "dev-ready" }],
        faqs: [
          { q: "Do you do research or just visuals?", a: "Both. We start with the users and the flows, validate with real people where the stakes are high, then design the polished interface on top." },
          { q: "Will developers be able to build it?", a: "Yes. We hand off a documented design system with components and tokens, so the build matches the design without guesswork." },
          { q: "Can you work in our existing design system?", a: "We extend the system you have and tighten the gaps, or build one from scratch if you do not have a reliable source yet." },
        ],
        relatedCaseStudyIds: ["forge", "lumen"],
      },
      {
        title: "Brand Identity", slug: "brand", Icon: PenTool,
        description: "Logos, systems, and guidelines that make you instantly recognizable.",
        intro: "A logo is the smallest part of a brand. We build the whole system, type, color, and rules, so you stay recognizable as you grow.",
        points: [
          "A logo and mark that work at every size",
          "Type, color, and spacing rules documented as tokens",
          "Guidelines your whole team can apply",
          "Assets ready for web, print, and social",
        ],
        outcome: "A brand that stays consistent as it grows.",
        tech: ["Figma", "Illustrator", "Tokens Studio"],
        stats: [{ value: "+64%", label: "recall lift" }, { value: "180", label: "tokens" }, { value: "1", label: "source of truth" }],
        faqs: [
          { q: "Do I get more than a logo?", a: "Yes. You get a full system: type, color, spacing, usage rules, and ready-to-use assets, documented so the brand holds up everywhere." },
          { q: "How do you keep the brand consistent?", a: "We capture the rules as tokens and ship them with components, so new pages inherit the brand instead of matching it by eye." },
          { q: "Can you refresh our existing brand?", a: "We can evolve what you have rather than start over, keeping the equity you have built while fixing what does not scale." },
        ],
        relatedCaseStudyIds: ["forge"],
      },
      {
        title: "Motion Design", slug: "motion", Icon: Film,
        description: "Purposeful animation that guides attention and adds delight.",
        intro: "Motion should help, not show off. We design animation that signals state and guides the eye, then ship it as components your team can reuse.",
        points: [
          "Motion that signals state and guides the eye",
          "A shared set of easing and timing rules",
          "Performance-aware animation that respects reduced motion",
          "Reusable components your developers can drop in",
        ],
        outcome: "Interfaces that feel alive without getting in the way.",
        tech: ["GSAP", "Framer Motion", "Lottie"],
        stats: [{ value: "60fps", label: "target" }, { value: "1", label: "motion system" }, { value: "a11y", label: "reduced-motion" }],
        faqs: [
          { q: "Will animation slow the site down?", a: "No. We animate transform and opacity, keep it on the GPU, and respect reduced-motion, so it stays smooth and accessible." },
          { q: "Is this just decoration?", a: "Motion earns its place by signaling state and guiding attention. If a transition does not help the user, we cut it." },
          { q: "Can developers reuse it?", a: "We deliver motion as documented components with shared easing and timing, so your team applies it consistently." },
        ],
        relatedCaseStudyIds: ["forge"],
      },
    ],
  },
  {
    key: "grow", label: "grow", blurb: "Reach the right people and keep shipping", accent: "green",
    items: [
      {
        title: "Digital Marketing", slug: "marketing", Icon: TrendingUp,
        description: "Data-driven campaigns across the channels your users actually use.",
        intro: "Most marketing spend chases vanity metrics. We tie every campaign to one number that predicts revenue, then move budget to what works.",
        points: [
          "One clear metric per campaign, agreed up front",
          "Channels chosen by where your users already are",
          "Tracking set up so you can trust the numbers",
          "Monthly reviews that move budget to what works",
        ],
        outcome: "Spend that ties to revenue, not vanity metrics.",
        tech: ["GA4", "Google Ads", "Meta Ads", "HubSpot"],
        stats: [{ value: "1", label: "north-star metric" }, { value: "monthly", label: "reviews" }, { value: "100%", label: "tracked" }],
        faqs: [
          { q: "Which channels do you run?", a: "We pick channels by where your buyers already are, usually a mix of paid search, paid social, and lifecycle email. We do not spread thin." },
          { q: "How do you measure success?", a: "We agree one metric that predicts revenue before spending, set up clean tracking, and report against it every month." },
          { q: "What is the minimum budget?", a: "It depends on the channel and goal. We are upfront about whether a budget is large enough to learn anything before you commit." },
        ],
        relatedCaseStudyIds: [],
      },
      {
        title: "SEO & Content", slug: "seo", Icon: Search,
        description: "Technical SEO and content that earns durable organic traffic.",
        intro: "Organic traffic compounds when the foundation is right. We fix the technical blockers and build content around real search intent.",
        points: [
          "Technical audit and fixes that unblock crawling",
          "Content built around real search intent",
          "Internal linking and structure that compounds over time",
          "Reporting tied to traffic that converts",
        ],
        outcome: "Organic traffic that keeps paying off after launch.",
        tech: ["Search Console", "Ahrefs", "Schema", "Lighthouse"],
        stats: [{ value: "compounding", label: "traffic" }, { value: "intent", label: "led content" }, { value: "core", label: "web vitals" }],
        faqs: [
          { q: "How long until I see results?", a: "Technical fixes can help within weeks. Content and authority compound over months. We set realistic milestones at the start." },
          { q: "Do you write the content?", a: "Yes. We plan around search intent and write or edit the content, then track which pieces actually earn traffic that converts." },
          { q: "Is this safe long-term?", a: "We use only durable, guideline-safe tactics. No shortcuts that risk a penalty when the next algorithm update lands." },
        ],
        relatedCaseStudyIds: [],
      },
      {
        title: "DevOps & Consulting", slug: "devops", Icon: Settings,
        description: "CI/CD, observability, and the architecture advice to scale safely.",
        intro: "Slow, risky releases hold teams back. We set up the pipelines and observability that make shipping routine, and advise on the architecture to scale.",
        points: [
          "CI/CD pipelines that make releases routine",
          "Observability so you see problems before users do",
          "Architecture review with a clear, costed plan",
          "Handover and docs so your team owns it",
        ],
        outcome: "A team that ships faster with fewer surprises.",
        tech: ["GitHub Actions", "Terraform", "Grafana", "Kubernetes"],
        stats: [{ value: "routine", label: "releases" }, { value: "p95", label: "tracked" }, { value: "0", label: "downtime deploys" }],
        faqs: [
          { q: "Do you work alongside our team?", a: "Yes. We embed with your engineers, set up the pipelines and monitoring, then hand over with docs so you own it." },
          { q: "Can you review our architecture?", a: "We run a focused review and deliver a clear, costed plan with priorities, so you know what to fix first and why." },
          { q: "What does handover look like?", a: "Documented pipelines, runbooks, and a walkthrough, so your team can run and extend everything without us in the loop." },
        ],
        relatedCaseStudyIds: ["atlas", "pulse"],
      },
    ],
  },
]

export const services: ServiceItem[] = groups.flatMap((g) => g.items)

export function getService(slug: string): { service: ServiceItem; group: ServiceGroup } | null {
  for (const group of groups) {
    const service = group.items.find((s) => s.slug === slug)
    if (service) return { service, group }
  }
  return null
}
