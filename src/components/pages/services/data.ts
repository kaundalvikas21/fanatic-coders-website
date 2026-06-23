import {
  Code2, Smartphone, ShoppingCart, Cloud, Palette, PenTool,
  Film, TrendingUp, Search, Settings,
  LayoutGrid, Database, Plug, Gauge, Accessibility, Wrench,
  Zap, WifiOff, Bell, Rocket, ShieldCheck,
  CreditCard, Package, Receipt, ArrowLeftRight, BarChart3,
  Server, Activity, DollarSign, Boxes,
  Workflow, Component, MousePointerClick, FileCode,
  Type, Ruler, BookOpen, Images, RefreshCw,
  Sparkles, Eye, Layers, Play,
  Target, Mail, FlaskConical, Users, Megaphone,
  FileText, Link2, KeyRound,
  GitBranch, ClipboardList,
  Repeat,
} from "lucide-react"
import type { ElementType } from "react"

export type Accent = "violet" | "cyan" | "green"

/** A single capability card on the service detail page. */
export interface Capability {
  Icon: ElementType
  title: string
  description: string
}

export interface ServiceItem {
  title: string
  description: string
  slug: string
  Icon: ElementType
  /** Optional full-sentence headline for the detail hero; falls back to title. */
  heroTitle?: string
  /** Optional capability cards; when present the detail page renders the bento grid. */
  capabilities?: Capability[]
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

/** Per-accent base hue as an aurora CSS token, for `color-mix` tints on detail-section cards. */
export const accentToken: Record<Accent, string> = {
  violet: "var(--aurora-violet)",
  cyan: "var(--aurora-cyan)",
  green: "var(--aurora-green)",
}

/** Shared delivery process, the same across every service line. */
export const serviceProcess = [
  { n: "01", title: "Discovery", duration: "1 to 2 weeks", desc: "We map goals, users, scope, and the risks worth handling early." },
  { n: "02", title: "Architecture", duration: "1 week", desc: "Data model, stack choices, and a clear technical plan you can read." },
  { n: "03", title: "Design", duration: "2 to 3 weeks", desc: "Wireframes and a design system you sign off on before we build." },
  { n: "04", title: "Build", duration: "4 to 8 weeks", desc: "Short cycles with working software you can try every week." },
  { n: "05", title: "QA", duration: "1 to 2 weeks", desc: "Automated tests, manual passes, and accessibility checks." },
  { n: "06", title: "Launch", duration: "2 to 4 days", desc: "Deploy with monitoring in place and a rollback plan ready." },
  { n: "07", title: "Support", duration: "ongoing", desc: "We stay on, fix what surfaces in real use, and hand over docs." },
]

/** Shared handover artifacts, the same at the end of every engagement. */
export const serviceDeliverables: Capability[] = [
  { Icon: GitBranch,   title: "Source files and assets", description: "Everything we produce, editable and owned by you." },
  { Icon: BookOpen,    title: "Documentation",           description: "Clear docs so your team can run and extend the work." },
  { Icon: Users,       title: "Handover session",        description: "A live walkthrough with the people who did the work." },
  { Icon: ShieldCheck, title: "Quality checks",          description: "The work tested and reviewed before it ships." },
  { Icon: Rocket,      title: "Launch support",          description: "Help through go-live and the first weeks after." },
  { Icon: KeyRound,    title: "Full ownership",          description: "All rights and access, no lock-in to us." },
]

/** A way to bring us in. Shared across every service line. */
export interface EngagementModel {
  label: string
  title: string
  tagline: string
  suits: string
  included: string[]
  Icon: ElementType
  accent: Accent
  primary?: boolean
}

/** Shared engagement models, the same for every service. */
export const engagementModels: EngagementModel[] = [
  {
    label: "project", title: "Project", tagline: "Fixed scope, clear deadline.",
    suits: "Work with defined requirements.",
    included: ["Scoped statement of work", "Fixed timeline", "Dedicated team", "Weekly demos"],
    Icon: Package, accent: "violet",
  },
  {
    label: "retainer", title: "Retainer", tagline: "Ongoing monthly capacity.",
    suits: "Continuous product work.",
    included: ["Reserved hours each month", "Priority queue", "Monthly planning", "One point of contact"],
    Icon: Repeat, accent: "cyan", primary: true,
  },
  {
    label: "team augmentation", title: "Team Augmentation", tagline: "Our people in your team.",
    suits: "Scaling an existing team.",
    included: ["Senior specialists", "Your tools and process", "Flexible ramp up", "Knowledge transfer"],
    Icon: Users, accent: "green",
  },
]

export const groups: ServiceGroup[] = [
  {
    key: "build", label: "build", blurb: "Ship reliable products and platforms", accent: "violet",
    items: [
      {
        title: "Web Development", slug: "web-development", Icon: Code2,
        description: "Fast, accessible web apps on Next.js, React, and a typed backend.",
        heroTitle: "Web development that ships fast and lasts",
        intro: "We build Next.js and React apps with clean architecture, real performance budgets, and accessibility from the start. You get software your team can keep building on.",
        capabilities: [
          { Icon: Code2, title: "Front-end builds", description: "Next.js and React interfaces that are fast, responsive, and easy to extend." },
          { Icon: LayoutGrid, title: "Design systems", description: "Reusable components and tokens so the product stays consistent as it grows." },
          { Icon: Database, title: "Headless and CMS", description: "Content models your team can edit without a developer in the loop." },
          { Icon: ShoppingCart, title: "E-commerce builds", description: "Catalogs, carts, and checkouts wired to the payment and tax tools you use." },
          { Icon: Plug, title: "APIs and integrations", description: "Type-safe APIs and connections to the third-party services you depend on." },
          { Icon: Gauge, title: "Performance and Core Web Vitals", description: "Real budgets for load, interaction, and layout, measured before launch." },
          { Icon: Accessibility, title: "Accessibility", description: "WCAG 2.2 AA from the start: keyboard, screen reader, and contrast checks." },
          { Icon: Wrench, title: "Maintenance", description: "Dependency updates, monitoring, and fixes so the build stays healthy." },
        ],
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
        capabilities: [
          { Icon: Smartphone, title: "Cross-platform builds", description: "One React Native codebase that ships to the App Store and Google Play." },
          { Icon: Zap, title: "Native feel", description: "Smooth animation and platform patterns users expect on each OS." },
          { Icon: WifiOff, title: "Offline support", description: "Local-first data with sync that resolves conflicts when the connection drops." },
          { Icon: Bell, title: "Push and deep links", description: "Notifications, deep links, and analytics wired in from the first build." },
          { Icon: Rocket, title: "Store releases", description: "Release pipelines so updates reach both stores without drama." },
          { Icon: Gauge, title: "Performance", description: "Startup time and frame budgets set and measured on real devices." },
          { Icon: ShieldCheck, title: "Secure by default", description: "Token storage, secure transport, and least-privilege access from day one." },
          { Icon: Wrench, title: "Maintenance", description: "OS updates, dependency bumps, and fixes so the app keeps shipping." },
        ],
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
        capabilities: [
          { Icon: ShoppingCart, title: "Headless storefronts", description: "Custom storefronts on the stack that fits your catalog and content." },
          { Icon: CreditCard, title: "Checkout that converts", description: "A fast, tuned checkout that holds up on every device." },
          { Icon: Package, title: "Inventory and orders", description: "Stock, orders, and fulfillment kept in sync across your tools." },
          { Icon: Receipt, title: "Payments and tax", description: "Stripe, tax, and fraud checks integrated cleanly and tested." },
          { Icon: Gauge, title: "Speed under load", description: "Edge caching and load testing so the store stays fast during a sale." },
          { Icon: ArrowLeftRight, title: "Migrations", description: "Move products, customers, and orders with no downtime and rankings intact." },
          { Icon: Search, title: "Search and merchandising", description: "Fast product search and rules that put the right items first." },
          { Icon: BarChart3, title: "Analytics", description: "Conversion and funnel tracking you can actually trust." },
        ],
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
        capabilities: [
          { Icon: Cloud, title: "Infrastructure as code", description: "Reproducible environments you can read, review, and roll back." },
          { Icon: Server, title: "APIs and pipelines", description: "Services and data pipelines built for load and observability." },
          { Icon: Rocket, title: "Zero-downtime deploys", description: "Releases with a clear rollback path and no maintenance windows." },
          { Icon: Activity, title: "Monitoring", description: "Traces, metrics, and alerts tied to real budgets." },
          { Icon: ShieldCheck, title: "Security", description: "Least-privilege access, secrets management, and audit trails." },
          { Icon: Database, title: "Data and backups", description: "Managed data stores with tested backups and restore drills." },
          { Icon: DollarSign, title: "Cost control", description: "Right-sizing and usage review to cut waste as you grow." },
          { Icon: Boxes, title: "Containers", description: "Kubernetes and Docker set up so workloads scale predictably." },
        ],
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
        capabilities: [
          { Icon: Search, title: "User research", description: "Interviews and testing that ground the work in real behavior." },
          { Icon: Workflow, title: "Flows and IA", description: "Task flows and information architecture mapped before any visuals." },
          { Icon: PenTool, title: "Wireframes", description: "Low-fidelity layouts validated with real users where stakes are high." },
          { Icon: Palette, title: "Visual design", description: "Polished, on-brand screens with a clear visual hierarchy." },
          { Icon: Component, title: "Design systems", description: "Reusable components and tokens documented as the source of truth." },
          { Icon: Accessibility, title: "Accessibility", description: "WCAG 2.2 AA baked into color, contrast, and keyboard paths." },
          { Icon: MousePointerClick, title: "Prototypes", description: "Clickable prototypes to test ideas before they reach code." },
          { Icon: FileCode, title: "Developer handoff", description: "Specs and tokens developers can build from without guessing." },
        ],
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
        capabilities: [
          { Icon: PenTool, title: "Logo and marks", description: "A primary mark and variants that work at every size." },
          { Icon: Type, title: "Typography", description: "A type system with clear roles, scale, and pairings." },
          { Icon: Palette, title: "Color systems", description: "Accessible color with documented usage rules." },
          { Icon: Ruler, title: "Spacing and grid", description: "Layout rules that keep every page on-brand." },
          { Icon: BookOpen, title: "Guidelines", description: "Usage rules your whole team can apply without asking." },
          { Icon: Boxes, title: "Tokens", description: "Design tokens that ship with components so the brand inherits, not copies." },
          { Icon: Images, title: "Assets", description: "Export-ready files for web, print, and social." },
          { Icon: RefreshCw, title: "Rebrands", description: "Evolve an existing brand while keeping the equity you built." },
        ],
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
        capabilities: [
          { Icon: Film, title: "Motion systems", description: "Shared easing and timing rules applied across the product." },
          { Icon: Sparkles, title: "State and feedback", description: "Animation that signals state and confirms user actions." },
          { Icon: Eye, title: "Attention and guidance", description: "Movement that guides the eye to what matters." },
          { Icon: Gauge, title: "Performance", description: "Transform and opacity only, kept on the GPU and smooth." },
          { Icon: Accessibility, title: "Reduced motion", description: "Respects user motion settings without losing meaning." },
          { Icon: Component, title: "Reusable components", description: "Motion delivered as components your developers drop in." },
          { Icon: Layers, title: "Micro-interactions", description: "Small, purposeful touches on hover, focus, and load." },
          { Icon: Play, title: "Lottie and video", description: "Lightweight Lottie and video for richer moments." },
        ],
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
        capabilities: [
          { Icon: Target, title: "Strategy", description: "One metric per campaign that predicts revenue, agreed up front." },
          { Icon: TrendingUp, title: "Paid search and social", description: "Campaigns on the channels your buyers already use." },
          { Icon: Mail, title: "Lifecycle email", description: "Onboarding and retention flows that bring people back." },
          { Icon: Activity, title: "Tracking and attribution", description: "Clean tracking so you can trust every number." },
          { Icon: FlaskConical, title: "Testing", description: "A/B tests that move budget toward what works." },
          { Icon: BarChart3, title: "Reporting", description: "Monthly reviews tied to revenue, not vanity metrics." },
          { Icon: Users, title: "Audiences", description: "Segments built from real behavior, not guesses." },
          { Icon: Megaphone, title: "Landing pages", description: "Fast, focused pages built to convert the traffic you pay for." },
        ],
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
        capabilities: [
          { Icon: Search, title: "Technical SEO", description: "Audit and fixes that unblock crawling and indexing." },
          { Icon: FileText, title: "Content", description: "Pieces built around real search intent, written to convert." },
          { Icon: Link2, title: "Internal linking", description: "Structure and links that compound authority over time." },
          { Icon: Code2, title: "Structured data", description: "Schema markup that earns richer search results." },
          { Icon: Gauge, title: "Core Web Vitals", description: "Speed and stability fixes that help rankings and users." },
          { Icon: KeyRound, title: "Keyword strategy", description: "Topics chosen by intent and realistic difficulty." },
          { Icon: BarChart3, title: "Reporting", description: "Tracking tied to traffic that actually converts." },
          { Icon: ShieldCheck, title: "Safe tactics", description: "Guideline-safe work that survives algorithm updates." },
        ],
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
        capabilities: [
          { Icon: GitBranch, title: "CI/CD pipelines", description: "Automated builds, tests, and releases that make shipping routine." },
          { Icon: Activity, title: "Observability", description: "Traces, metrics, and alerts so you see problems before users do." },
          { Icon: Boxes, title: "Containers and orchestration", description: "Kubernetes and Docker set up to scale predictably." },
          { Icon: Cloud, title: "Infrastructure as code", description: "Reproducible environments under version control." },
          { Icon: ClipboardList, title: "Architecture review", description: "A focused review with a clear, costed plan of priorities." },
          { Icon: ShieldCheck, title: "Security and compliance", description: "Secrets, access, and audit trails handled properly." },
          { Icon: DollarSign, title: "Cost and capacity", description: "Right-sizing and planning before traffic arrives." },
          { Icon: BookOpen, title: "Handover and docs", description: "Runbooks and a walkthrough so your team owns it." },
        ],
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
