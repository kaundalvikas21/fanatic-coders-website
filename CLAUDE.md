@AGENTS.md

# fanaticCoders Website - Project Guidelines

A modern digital agency website built with the latest technologies (April 2026).

---

## File Line-Count Recommendations

Recommended guidelines to keep code maintainable and focused.

| File type | Recommendation | Location pattern |
|---|---|---|
| Page files | **~120 lines** | `src/app/**/*.tsx` |
| Section & feature components | **~200 lines** | `src/components/**/*.tsx` (excl. `ui/`) |
| Custom hooks | **~40 lines** | `src/hooks/**/*.ts` |
| Type definitions | **~200 lines** | `src/types/**/*.ts` |
| Utility files | **~80 lines** | `src/lib/**/*.ts` |
| shadcn/ui components | **No limit** | `src/components/ui/**` (generated) |

**Hook creation rule:** Only create a hook file when it has 3+ consumers OR contains genuinely complex logic (multiple state values, effects with cleanup). Do NOT create hooks that wrap fewer lines than they contain.

---

## ⚠️ AI WORKFLOW GUIDELINES (MANDATORY)

**These rules MUST be followed for every task. Failure to follow these guidelines is not acceptable.**

### 1. Prompt Enhancement (BEFORE execution)
- **ALWAYS** use `prompt-engineering-patterns` skill to improve the prompt before executing
- Refine ambiguous requests into clear, actionable instructions

### 2. Brainstorming (BEFORE creative work)
- **ALWAYS** use `superpowers:brainstorming` skill BEFORE any creative work
- Applies to: creating features, building components, adding functionality, modifying behavior
- Explores user intent, requirements, and design BEFORE implementation
- **HARD GATE:** Do NOT write code until design is approved
- For multi-step tasks: after brainstorming, invoke `superpowers:writing-plans` skill
- For plan execution: use `superpowers:executing-plans` skill

### 3. Code Writing Standards (BEFORE writing code)
- **ALWAYS** use `karpathy-guidelines` skill before writing or editing any code
- Follow the behavioral guidelines to reduce common LLM coding mistakes

### 4. Next.js Code Patterns
When writing Next.js code, **ALWAYS** use these skills together:
- `next-best-practices` - File conventions, RSC boundaries, data patterns
- `vercel-composition-patterns` - React composition patterns that scale
- `vercel-react-best-practices` - Performance optimization guidelines
- Only proceed with coding AFTER these skills are loaded

### 5. Code Search (PREFERRED APPROACH)
- **PREFERRED:** Use `typescript-lsp` skill for ALL code searches (symbols, functions, types, classes)
- **FALLBACK:** Use `grep`, `Grep` tool, or text-based search for code
- LSP provides type-aware results that understand imports, exports, and relationships

### 6. Error Handling (AFTER code changes)
- **ALWAYS** use `error-handling-patterns` skill after editing code
- Ensure all edge cases and error scenarios are handled properly

### 7. Type & Lint Checks (MANDATORY AFTER CHANGES)
- **MANDATORY** after any code modification:
  ```bash
  npm run build  # Type check via TypeScript
  npm run lint   # ESLint check
  ```
- Do NOT mark task complete if either fails

### 8. Component Patterns (BEFORE UI work)
- Follow existing shadcn/ui patterns with radix-nova style
- Check `src/components/ui/` for existing component patterns
- Use `cn()` utility for conditional className merging
- Home page sections currently live in `src/components/pages/home/`
- Keep future page-specific components in `src/components/pages/<page>/`

### 9. Supabase Integration (FOR FUTURE USE)
- When using Supabase MCP server, **ALWAYS** use `supabase-postgres-best-practices` skill
- Follow Postgres performance optimization patterns
- Note: Supabase will be integrated in future phases

### 10. Research First (BEFORE implementation)
- **ALWAYS** use both `ref tools mcp` AND `exa mcp` together for documentation/research
- Gather latest information BEFORE writing any code
- Never assume patterns - verify with current docs

### 11. Browser Testing (AFTER all changes)
- **ALWAYS** use `agent-browser` skill for end-to-end browser testing (PRIMARY)
- **FALLBACK** use `chrome-devtools` MCP tools when agent-browser is unavailable
- Verify changes work correctly in the browser before completing tasks
- This ensures consistent testing across all sessions

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.3 | React framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 6.0.2 | Type safety |
| Tailwind CSS | v4 | Utility-first CSS with OKLCH colors |
| shadcn/ui | 4.2.0 (radix-nova style) | Component library |
| GSAP | 3.14.2 | Complex animations |
| Swiper | 12.1.3 | Carousel/slider components |
| Lucide React | 1.8.0 | Icon library |
| Simple Icons | 16.15.0 | Brand icons |
| tw-animate-css | 1.4.0 | Simple CSS animations |
| Fonts | Inter, Plus Jakarta Sans | Typography via @fontsource |

## Getting Started

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Current home route
│   ├── globals.css            # Tailwind v4 + theme variables
│   ├── favicon.ico
│   └── (frontend)/            # Route group directories (currently placeholders)
│       ├── about/
│       ├── blog/
│       │   └── [slug]/
│       ├── careers/
│       ├── case-studies/
│       ├── case-study/
│       │   └── [slug]/
│       ├── contact/
│       ├── docs/
│       ├── open-source/
│       ├── portfolio/
│       │   └── [slug]/
│       ├── privacy/
│       ├── services/
│       │   └── [slug]/
│       └── terms/
├── components/
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── home/              # Current home page section components
│   │       ├── HeroSection.tsx
│   │       ├── PartnersSection.tsx
│   │       ├── TerminalAboutSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── ServiceCarousel.tsx
│   │       ├── PortfolioSection.tsx
│   │       ├── CtaSection.tsx
│   │       ├── CoreValuesSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── TechStackSection.tsx
│   │       ├── FAQSection.tsx
│   │       └── BlogSection.tsx
│   └── ui/                    # shadcn/ui components
│       ├── button.tsx
│       ├── accordion.tsx
│       ├── GradientButton.tsx  # Custom gradient button
│       └── TechLogo.tsx
├── data/                     # Reserved for static/content data (currently empty)
├── lib/
│   ├── utils.ts              # cn() helper with tailwind-merge
│   └── animations.ts         # GSAP animation helpers
├── hooks/
│   └── useScrollReveal.ts
└── types/
    └── index.ts
```

## Scalable Pattern For Future Pages

When adding a new page, use this pattern:

```
src/
├── app/
│   └── <route>/
│       └── page.tsx                   # Thin route entrypoint
└── components/
    └── pages/
        └── <page>/
            ├── <PageName>Page.tsx     # Optional page composer
            ├── index.ts               # Optional barrel export
            ├── SectionA.tsx
            ├── SectionB.tsx
            └── ...
```

### Pattern Rules

1. Keep route files thin: `src/app/<route>/page.tsx` should mainly compose/import page modules.
2. Keep page-specific UI in `src/components/pages/<page>/`.
3. Do not put page-specific UI under `src/components/ui/` (reserve `ui/` for reusable primitives).

---

## Animations

This project uses a hybrid animation approach:

### GSAP (for complex animations)

Best for: Hero animations, scroll-triggered reveals, complex interactions, timeline-based sequences.

The project includes GSAP helpers in `src/lib/animations.ts`:
```tsx
import { fadeInUp, staggerFade, scaleOnScroll } from "@/lib/animations"
```

**Common patterns:**
- Hero section: Complex entrance animations with floating elements
- Terminal: Typing animations and code reveals
- Scroll reveals: Intersection Observer + GSAP timelines

### tw-animate-css (for simple animations)

Best for: Hover states, simple transitions, micro-interactions.

```tsx
<div className="animate-fade-in animate-slide-up">
  Simple entrance animation
</div>
```

### Scroll Reveal Hook

Custom hook for intersection observer-based scroll animations:
```tsx
const { ref, isInView } = useScrollReveal()
```

## Component Patterns

### shadcn/ui Components

- Uses `radix-nova` style variant
- Components are in `src/components/ui/`
- All shadcn components use forwardRef patterns
- Use `cn()` utility for conditional classes

### Section Components

Page sections follow these patterns:
- Named with "Section" suffix
- Located in `src/components/pages/<page>/`
- Use scroll reveal hook for entrance animations
- Follow responsive mobile-first design
- Keep focused and under ~200 lines

### TypeScript Types

All types are centralized in `src/types/index.ts`:
- `NavLink`, `BlogPost`, `Service`, `Testimonial`
- `TechItem`, `TechCategory`, `FAQItem`, `PortfolioProject`
- `CoreValue`, `Partner`

Import types from `@/types` rather than defining inline.

## Code Conventions

### File Naming
- Components: PascalCase with descriptive names (`HeroSection.tsx`)
- Utilities: camelCase (`utils.ts`, `animations.ts`)
- Hooks: camelCase with "use" prefix (`useScrollReveal.ts`)

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Local components (with `@/` alias)
4. Types
5. Utilities/hooks

### Component Structure
```tsx
// 1. Imports
import { useState } from "react"

// 2. Types/interfaces (if local)
interface Props { ... }

// 3. Component
export function ComponentName({ ... }: Props) {
  // 4. Hooks
  const [state, setState] = useState()

  // 5. Event handlers
  const handleClick = () => { ... }

  // 6. Effects
  useEffect(() => { ... }, [])

  // 7. Render
  return (
    <div>...</div>
  )
}
```

## Common Tasks

### Adding a New Section

1. Create component in `src/components/pages/<page>/NewSection.tsx`
2. Add it to the page composition for that route (or directly import in route `page.tsx`)
3. Follow existing section patterns (scroll reveal, responsive design)
4. Keep route files thin and focused on composition

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Components are added to `src/components/ui/` and automatically styled with radix-nova theme.

### Working with GSAP Animations

Use existing helpers from `src/lib/animations.ts`:
```tsx
import { fadeInUp, staggerFade } from "@/lib/animations"
```

For complex custom animations:
```tsx
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
```

### Adding New Types

Add to `src/types/index.ts` rather than defining inline:
```tsx
// src/types/index.ts
export interface NewType {
  id: string
  // ... other properties
}
```

Then import:
```tsx
import { NewType } from "@/types"
```

## Performance Considerations

- Images: Use Next.js `<Image />` component with proper dimensions
- Animations: Prefer CSS animations for simple effects, GSAP only for complex ones
- Bundle size: Be mindful when adding new dependencies
- Scroll animations: Use Intersection Observer to detect viewport (via `useScrollReveal` hook)
- Type safety: Leverage TypeScript to catch errors at build time

## Testing Checklist

Before marking any task complete:

✅ **Type check:** `npm run build` passes without TypeScript errors
✅ **Lint check:** `npm run lint` passes without ESLint errors
✅ **Visual check:** Changes render correctly in browser
✅ **Responsive:** Works on mobile, tablet, and desktop
✅ **Animations:** Animations play smoothly and don't cause jank
✅ **No console errors:** Browser console is clean
✅ **Accessibility:** Keyboard navigation works, proper ARIA labels where needed

## Troubleshooting

### Build Errors

- TypeScript errors: Check type definitions in `src/types/index.ts`
- Import errors: Verify path aliases (use `@/` for src/ directory)
- Missing dependencies: Run `npm install`

### Animation Issues

- GSAP not working: Check if `ScrollTrigger` is registered
- Scroll reveals not firing: Verify `useScrollReveal` hook is implemented
- CSS animations not playing: Check `tw-animate-css` classes are correct

### Styling Problems

- Tailwind classes not working: Verify `globals.css` imports Tailwind v4
- shadcn components unstyled: Check `components.json` configuration
- Dark mode issues: Project uses light mode by default (no dark mode toggle)

---

**Last Updated:** April 2026
**Project:** fanaticCoders Website
**Framework:** Next.js 16.2.3 with App Router
