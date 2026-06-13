import type { BlogPost } from "@/types"

const AVATARS = {
  ava: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
  noah: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  mia: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
  sara: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces",
  omar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=faces",
}

export const posts: BlogPost[] = [
  {
    id: "1", title: "Why we ship in weekly increments", excerpt: "Tight feedback loops beat big-bang launches. Here's how we keep momentum without burning out.", date: "Jun 2, 2026", readTime: "6 min", category: "Engineering", slug: "weekly-increments", coverUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=600&fit=crop",
    author: "Ava Reyes", authorRole: "Founder & Principal Engineer", authorAvatar: AVATARS.ava, tags: ["Process", "Engineering"],
    sections: [
      { id: "cost-of-big-releases", heading: "The cost of big releases", paragraphs: ["A long release cycle hides risk. When weeks of work land at once, every bug, missed requirement, and wrong assumption shows up together, and untangling them takes far longer than building the feature did."] },
      { id: "how-we-slice-work", heading: "How we slice the work", paragraphs: ["We cut work into slices that ship every week. Each slice goes to a staging link the client can click through, so feedback arrives while the context is still fresh and a change costs an hour instead of a sprint."] },
      { id: "protecting-the-team", heading: "Protecting the team", paragraphs: ["The habit also protects the team. Smaller batches mean fewer late nights, clearer ownership, and a demo to be proud of every Friday. Momentum compounds when progress is visible.", "It takes discipline to keep slices small and honest. We track scope in the open and say no early when something will not fit. That trade is easier to make in week one than in week six."] },
    ],
    takeaways: ["Smaller batches surface risk early, while a fix still costs an hour.", "Weekly staging links keep client feedback fresh and cheap to act on.", "Visible progress every week compounds team momentum."],
  },
  {
    id: "2", title: "Designing dark-first interfaces that don't strain", excerpt: "Contrast, depth, and color in dark UI: the choices that make our Aurora system readable.", date: "May 24, 2026", readTime: "8 min", category: "Design", slug: "dark-first-design", coverUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&h=600&fit=crop",
    author: "Noah Patel", authorRole: "Head of Design", authorAvatar: AVATARS.noah, tags: ["Design", "Accessibility"],
    sections: [
      { id: "not-a-color-swap", heading: "Dark mode is not a color swap", paragraphs: ["Pure white text on a black panel vibrates and tires the eye, so we set body text a few steps below white and reserve full white for the rare element that needs to lead."] },
      { id: "depth-in-the-dark", heading: "Depth carries more weight in the dark", paragraphs: ["Without daylight shadows to separate surfaces, we lean on tonal layers and thin borders so cards read as distinct planes instead of one flat sheet."] },
      { id: "color-restraint", heading: "Color needs restraint", paragraphs: ["A saturated accent that looks fine on white can glow on a dark field, so we tune the palette against the real background and check every state for contrast that meets WCAG AA.", "The payoff is a screen people can sit with for hours. Readability first, polish second, and the result still feels calm at midnight."] },
    ],
    takeaways: ["Drop body text below pure white to stop the vibration that tires eyes.", "Use tonal layers and thin borders for depth where shadows cannot help.", "Tune accents against the real dark background and check WCAG AA contrast."],
  },
  {
    id: "3", title: "A pragmatic guide to Next.js App Router", excerpt: "Server components, data patterns, and the boundaries we actually use in production.", date: "May 15, 2026", readTime: "10 min", category: "Engineering", slug: "app-router-guide", coverUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    author: "Mia Chen", authorRole: "Lead Frontend Engineer", authorAvatar: AVATARS.mia, tags: ["Next.js", "React"],
    sections: [
      { id: "server-client-split", heading: "The server and client split", paragraphs: ["The App Router rewards a clear split between server and client work. We keep data fetching and rendering on the server by default and only reach for a client component when something needs state or a browser API."] },
      { id: "skip-the-global-store", heading: "Skip the global store", paragraphs: ["Most pages never need a global store. Fetch where you render, pass plain props down, and let the server cache do the heavy lifting. The result is less code to ship and less to debug."] },
      { id: "boundaries-as-design", heading: "Boundaries as a design decision", paragraphs: ["Client boundaries are a design decision, not an afterthought. We push them as far down the tree as possible so an interactive widget does not drag a whole page into the browser bundle.", "None of this is dogma. When a pattern fights the framework, we measure, adjust, and document the call so the next person inherits the reasoning, not just the result."] },
    ],
    takeaways: ["Keep fetching and rendering on the server until something truly needs the client.", "Fetch where you render and skip the global store on most pages.", "Push client boundaries down the tree to keep bundles small."],
  },
  {
    id: "4", title: "Measuring what marketing actually moves", excerpt: "Vanity metrics are easy. We focus on the few numbers that predict revenue.", date: "May 6, 2026", readTime: "5 min", category: "Growth", slug: "marketing-metrics", coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    author: "Sara Kim", authorRole: "Product Strategist", authorAvatar: AVATARS.sara, tags: ["Growth", "Analytics"],
    sections: [
      { id: "vanity-vs-revenue", heading: "Vanity metrics versus revenue", paragraphs: ["Impressions and follower counts feel good and predict almost nothing. The number that matters is the one tied to a decision: a signup, a qualified lead, a renewal."] },
      { id: "name-the-metric", heading: "Name the metric first", paragraphs: ["We start every engagement by naming the one metric a campaign should move, then build the tracking to see it cleanly before spending a dollar on reach."] },
      { id: "trust-over-precision", heading: "Trust over precision", paragraphs: ["Attribution is messy, so we favor a few trustworthy signals over a dashboard full of noise. A simple model people believe beats a precise one nobody acts on.", "Reviewed monthly, this keeps spend honest. If a channel cannot show its effect on the metric that matters, it loses the budget to one that can."] },
    ],
    takeaways: ["Track the number tied to a decision, not impressions or followers.", "Name the one metric a campaign should move before you spend.", "A trusted simple model beats a precise one nobody acts on."],
  },
  {
    id: "5", title: "How we keep production fast under load", excerpt: "Caching, edge rendering, and observability: the playbook behind our uptime.", date: "Apr 28, 2026", readTime: "7 min", category: "Engineering", slug: "fast-under-load", coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    author: "Omar Haddad", authorRole: "DevOps Engineer", authorAvatar: AVATARS.omar, tags: ["Performance", "Infrastructure"],
    sections: [
      { id: "dont-do-work-twice", heading: "Do not do the work twice", paragraphs: ["Speed under load starts with not doing the work twice. We cache aggressively at the edge and invalidate on write, so most requests never touch the origin at all."] },
      { id: "render-close", heading: "Render close to the user", paragraphs: ["What we cannot cache, we render close to the user. Edge rendering trims the round trip and keeps the slowest page within a budget we set before launch."] },
      { id: "see-it-coming", heading: "See problems coming", paragraphs: ["You cannot fix what you cannot see. Every service ships with traces and a p95 latency target, and an alert fires on the trend long before users feel it.", "When traffic spikes, the playbook is already written. Capacity, fallbacks, and a rollback path are decided in calm hours, not during an incident."] },
    ],
    takeaways: ["Cache at the edge and invalidate on write so most requests skip the origin.", "Render close to the user to keep the slowest page within budget.", "Ship traces and p95 targets so alerts fire before users feel it."],
  },
  {
    id: "6", title: "Building a brand system that scales", excerpt: "From logo to motion, the components that keep a brand coherent as it grows.", date: "Apr 19, 2026", readTime: "6 min", category: "Design", slug: "brand-systems", coverUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=600&fit=crop",
    author: "Noah Patel", authorRole: "Head of Design", authorAvatar: AVATARS.noah, tags: ["Branding", "Design Systems"],
    sections: [
      { id: "beyond-the-logo", heading: "A brand is more than a logo", paragraphs: ["A logo is the smallest part of a brand. What keeps a company recognizable across a website, an app, and a deck is the system behind it: type, color, spacing, and tone."] },
      { id: "rules-as-tokens", heading: "Rules as tokens", paragraphs: ["We document those rules as tokens, not screenshots, so a developer and a designer pull from the same source. The brand stays consistent even when nobody is policing it."] },
      { id: "motion-belongs", heading: "Motion belongs to the brand", paragraphs: ["Motion is part of the identity too. A shared set of easing and timing rules makes every transition feel like it belongs to the same product.", "Built this way, the brand grows without drifting. New pages and features inherit the look for free, and the team spends its time on the work, not on matching colors by eye."] },
    ],
    takeaways: ["A brand system is type, color, spacing, and tone, not just a logo.", "Capture the rules as tokens so a developer and designer share one source.", "Treat motion as part of the identity with shared easing and timing."],
  },
  {
    id: "7", title: "What we learned scaling a team to 40", excerpt: "Hiring, mentoring, and the culture choices that kept quality high as we grew.", date: "Apr 10, 2026", readTime: "9 min", category: "Company", slug: "scaling-the-team", coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    author: "Ava Reyes", authorRole: "Founder & Principal Engineer", authorAvatar: AVATARS.ava, tags: ["Company", "Culture"],
    sections: [
      { id: "the-job-changes", heading: "The job changes as you grow", paragraphs: ["Growing from a handful of people to forty changes what the job is. The work shifts from writing every line yourself to making sure the right standards travel with each new hire."] },
      { id: "hire-slow-onboard-well", heading: "Hire slowly, onboard properly", paragraphs: ["We hire slowly and onboard properly. A new engineer pairs with a senior for their first weeks, ships something real in week one, and learns how we work by doing it."] },
      { id: "culture-is-what-you-tolerate", heading: "Culture is what you tolerate", paragraphs: ["Quality held because we wrote down how we make decisions. Reviews, testing, and the way we scope a project are habits anyone can follow, not folklore in one person's head.", "Culture is the sum of what you tolerate. We protect focus time, keep meetings few, and reward the careful work that does not always show up in a demo."] },
    ],
    takeaways: ["At scale the job is making standards travel with each new hire.", "Onboard by pairing and shipping something real in week one.", "Write down how you make decisions so quality is a habit, not folklore."],
  },
]

export const categories = ["All", "Engineering", "Design", "Growth", "Company"]

// Curated most-read posts for the popular section (by slug).
export const popularSlugs = ["app-router-guide", "dark-first-design", "scaling-the-team"]
