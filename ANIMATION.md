# Animation System

One engine, one place to change timing. Read this before adding motion to a page.

## The rule: GSAP vs CSS

| Use                              | For                                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GSAP** (this system)           | Anything triggered by scroll, mount, or an interaction sequence: entrance reveals, staggers, parallax, count-ups, typewriters, marquees, timelines.                                         |
| **CSS** (`globals.css` + tokens) | Cheap state transitions only: hover, focus, active, open/close. Always reference `var(--ease-*)` / `var(--duration-*)`. Decorative ambient keyframes (aurora drift, cursor blink) stay CSS. |

Never hardcode a duration or `cubic-bezier(...)` in a component. Import from `src/lib/motion.ts`
or use a registered effect.

## Single source of truth: `src/lib/motion.ts`

- `DURATION` (seconds) and `EASE` (GSAP ease strings) — mirror the CSS `--duration-*` / `--ease-*`
  tokens in `globals.css`. Change a value in both places to keep CSS and GSAP in step.
- `STAGGER` — base stagger step (0.06s = `--stagger-base`).
- `registerGsap()` — registers plugins (`ScrollTrigger`, `useGSAP`) and the reusable named
  effects, once, on the client. Idempotent; the hooks call it defensively.
- `prefersReducedMotion()` — SSR-safe check; primitives use it to rest content at final state.

### Registered effects (callable anywhere after registration)

| Effect           | Call                              | Does                 |
| ---------------- | --------------------------------- | -------------------- |
| `fadeUp`         | `gsap.effects.fadeUp(el)`         | opacity 0→1, rise    |
| `staggerReveal`  | `gsap.effects.staggerReveal(els)` | the above, staggered |
| `auroraEntrance` | `gsap.effects.auroraEntrance(el)` | scale + rise + fade  |

## Primitives (use these, don't hand-roll)

**Scroll reveals (CSS/IO — the lightweight path, used in ~48 sections):**

- **`<RevealSection>`** (`src/components/ui/RevealSection.tsx`) — the one reveal wrapper. Applies
  `.reveal` (or `.reveal-stagger` with `stagger`); `useScrollReveal` adds `.visible` on entry.
  Props: `as`, `stagger`, `threshold`.
  ```tsx
  <RevealSection
    stagger
    className="..."
  >
    {children}
  </RevealSection>
  ```
- **`useScrollReveal(opts)`** (`src/hooks/useScrollReveal.ts`) — the underlying IntersectionObserver
  hook; returns a ref that gets `.visible`. Use directly when a CSS keyframe drives the reveal
  (e.g. the bento grid: `.services-bento.visible > .bento-card.bento-reveal` runs `card-rise`,
  because `.reveal-stagger` loses the transition fight with `.bento-card`'s hover transition).

**Complex motion (GSAP — only where it earns its weight):**

- **`useCountUp(target, opts)`** (`src/hooks/useCountUp.ts`) — number count-up, `trigger:"scroll"`
  (enters view) or `"active"` (gated by a prop). Returns `{ ref, value }`.
- **`useTypewriter(text, opts)`** (`src/hooks/useTypewriter.ts`) — returns the typed substring;
  `loop` to type/erase/repeat.
- Parallax / SVG draw: `src/lib/animations.ts` (`scrollParallax`, `scrollDraw`) via `AboutScrollFX`.

GSAP is **not** used for scroll reveals — `RevealSection` (CSS + IO) is lighter for simple
fade-ups. `<MotionProvider/>` (mounted in `src/app/(frontend)/layout.tsx`) registers GSAP and
refreshes ScrollTrigger after each navigation. Animated components must be `"use client"`.

## Reduced motion

`prefersReducedMotion()` is checked in every primitive: content lands at its final state and no
animation is created (WCAG 2.2 AA, PRODUCT.md). When adding a new GSAP animation, branch on it.

## Live keyframes (CSS, in `globals.css`)

Ambient/decorative only: `pulse`, `gradient`, `borderSpin`, `auroraDrift`, `heroFloat`,
`heroScrollBob`, `gradShift`, `marquee-scroll`, `cursor-blink`/`blink`, `panelEnter`/`panelExit`,
`card-rise`, `portfolioFadeIn`, `wordEnter`, `techGridFadeIn`. Entrance/scroll keyframes are being
migrated to GSAP; do not add new scroll-reveal keyframes — use `<Reveal>`.

(Removed as dead: `marquee`, `auroraShift`.)

## Recipe: animate a new section

1. Section component is `"use client"` only if it has client state/animation hooks.
2. Entrance: wrap content in `<RevealSection>` (add `stagger` for a list/grid).
3. Numbers: `useCountUp`. Typed text: `useTypewriter`.
4. Anything custom (parallax, draw, timeline): `useGSAP(() => {...}, { scope: ref })`, pull timing
   from `DURATION`/`EASE`, branch on `prefersReducedMotion()`.
5. Never add a raw `IntersectionObserver`, `requestAnimationFrame` loop, or inline `cubic-bezier`.

Keep this file in sync (or regenerate via `/impeccable document`).
