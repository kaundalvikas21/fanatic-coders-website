---
name: fanaticCoders
description: Aurora Terminal — a dark, developer-native agency surface lit by violet-to-cyan aurora gradients
colors:
  aurora-violet: "#7c3aed"
  aurora-violet-light: "#a855f7"
  aurora-blue: "#2563eb"
  aurora-blue-light: "#60a5fa"
  aurora-cyan: "#06b6d4"
  aurora-cyan-light: "#22d3ee"
  aurora-green: "#10b981"
  aurora-green-light: "#34d399"
  syntax-rose: "#f43f5e"
  syntax-pink: "#ec4899"
  syntax-indigo: "#818cf8"
  dark-void: "#000000"
  dark-surface: "#080810"
  dark-raised: "#0d0d1f"
  dark-overlay: "#12122a"
  dark-elevated: "#1a1a3a"
  ink: "#fafafa"
  ink-muted: "#8e8e8e"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.5rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  3xl: "22px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.aurora-violet}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.aurora-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-glass:
    backgroundColor: "{colors.dark-surface}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 28px"
    typography: "{typography.label}"
  card-glass:
    backgroundColor: "{colors.dark-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  nav-bar:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
---

# Design System: fanaticCoders

## 1. Overview

**Creative North Star: "The Aurora Terminal"**

A dark engineering surface, lit from within by an aurora. The system reads like a senior
developer's workspace at night: near-black ground (`#080810`), monospace code motifs, and
sweeping violet-to-cyan gradients that behave like atmospheric light rather than
decoration. Code is the native language here, not a costume: npm-style commands,
function-named CTAs, terminal panels, and angle-bracket chips carry real developer fluency.

The aurora is a seasoning, not the meal. Saturated color arrives in mesh backgrounds,
hover fills, and a single sweeping headline gradient, then yields to quiet dark space so
the craft reads as precise rather than loud. Glass surfaces float on the dark with soft
aurora glow, never as decorative filler. The whole composition exists to prove competence:
the site is the portfolio, so every edge, transition, and contrast ratio is the pitch.

This system explicitly rejects four things: generic template-agency layouts
(stock-photo heroes, interchangeable feature grids), stiff corporate sterility, the
crypto/neon-hype trap (glow overload, web3 swagger) that the aurora palette must never tip
into, and cluttered marketplace noise.

**Key Characteristics:**
- Dark-first (OLED), violet-tinted near-black ground; no light mode, no theme toggle.
- Aurora gradient (violet to blue to cyan) as primary identity, used sparingly.
- Monospace code motifs as authentic developer signal.
- Luminous glass surfaces with precise 8px edges and visible aurora focus rings.
- Choreographed GSAP motion, fully disabled under `prefers-reduced-motion`.

## 2. Colors

A near-monochrome dark ground carrying a saturated aurora accent that sweeps cool across
violet, blue, and cyan, with green as a reserved success/secondary voice.

### Primary
- **Aurora Violet** (#7c3aed / oklch(0.55 0.24 292)): The anchor accent. Opens every
  gradient sweep, owns primary CTAs, focus glow, and brand logo. The identity color.
- **Aurora Blue** (#2563eb): The midpoint of the aurora sweep and the primary hover state;
  cools the violet toward trust.

### Secondary
- **Aurora Cyan** (#06b6d4 / oklch(0.70 0.13 207)): Closes the aurora sweep, lights the
  hero mesh from the far corner, and tints the secondary glass cards.

### Tertiary
- **Aurora Green** (#10b981): Reserved. Success, reliability, and the third spotlight.
  Never part of the headline sweep, so it stays meaningful.

### Neutral
- **Dark Surface** (#080810): The page ground. The hardcoded `body` background; everything
  floats on this.
- **Dark Void to Elevated** (#000000, #0d0d1f, #12122a, #1a1a3a): The tonal-layering ramp
  for nested panels, terminal chrome, and raised cards in place of heavy borders.
- **Ink** (#fafafa / oklch(0.985 0 0)): Primary text on the dark ground.
- **Ink Muted** (#8e8e8e / oklch(0.556 0 0)): Secondary text, captions, code comments.

### Code Syntax (accent)
A separate trio reserved for code-syntax surfaces, distinct from the aurora identity:
- **Syntax Rose** (#f43f5e) and **Syntax Pink** (#ec4899): The `.preheading-code` chip is a
  rose-to-pink gradient-text label (a sanctioned gradient-text exception, see Do's and
  Don'ts). Pink also colors `.heading-code .params`.
- **Syntax Indigo** (#818cf8 / indigo-400): Colors `.heading-code .function` tokens inside
  code-styled headings.

Semantic UI tokens (`--background`, `--foreground`, `--border`, `--ring`, `--destructive`
`oklch(0.577 0.245 27.325)`) are defined canonically in OKLCH in `globals.css` (`:root`
and `.dark`); the hex values above are the sRGB equivalents for tooling.

### Named Rules
**The Reserved Aurora Rule.** Full saturated gradient appears on roughly one element per
viewport (a headline, a hero mesh, a primary CTA). Its rarity is what keeps it from
reading as crypto-neon. If two gradients compete on one screen, one is wrong.

**The Tint-the-Dark Rule.** Neutrals are never pure `#000`/`#fff`. The ground is violet-
tinted near-black; text is `#fafafa`, not white.

**The Syntax-Accent Rule.** Rose, pink, and indigo appear only on code-syntax surfaces
(preheading chips, code-styled heading tokens). They never leak onto UI chrome, buttons,
or body text, where the aurora set owns color.

**The Gradient-Text Allow-List Rule.** `background-clip: text` is not a free decoration; it
is restricted to a fixed set of surfaces that already exist in `globals.css`: (1) the
animated headline/logo sweep (`.text-aurora-sweep`, `.heading-gradient`, `.logo-gradient`,
`.animated-gradient-text`, `.cta-heading`); (2) the code/preheading chips (`.preheading-code`
rose to pink, `.preheading-terminal`, `.preheading-comment`); (3) stat and impact numbers
(`.stat-num`, `.portfolio-gradient-text`); (4) the `.process-num` hover fill. Outside this
list, use a single solid color. Never a gradient on running body text, and never a colored
`border-left`/`border-right` stripe as an accent.

## 3. Typography

**Display / Body Font:** Plus Jakarta Sans (with `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` fallback)

**Character:** Plus Jakarta Sans is the single humanist sans across display, titles, and
body, giving a clean, modern base. JetBrains Mono is the shipped monospace face that
carries the terminal panels, code chips, and function-named CTAs. It is load-bearing
identity, not ornament: a purpose-built coding typeface that signals real engineering.

> **Font notes.** Two shipped families via `@fontsource` (`layout.tsx`): Plus Jakarta Sans
> (400/600/700) and JetBrains Mono (400/600/700). Do not specify Inter in new components.
> `--font-mono` leads with `'JetBrains Mono'` then the system `ui-monospace` fallback; all
> mono surfaces route through it (`font-mono` utility, `.heading-code`, `.subheading-code`,
> `.preheading-code`, terminal panels). `--font-sans` is still circular
> (`--font-sans: var(--font-sans)`) but harmless: the `font-sans` utility is unused and
> headings inherit body Plus Jakarta Sans (see CLAUDE.md Known Issues).

### Hierarchy
- **Display** (Plus Jakarta Sans 700, `clamp(2.25rem, 6vw, 4rem)`, line-height 1.05): Hero
  and section headlines, often as the single aurora gradient sweep of the viewport.
- **Headline** (Mono 700, `clamp(1.5rem, 4vw, 3rem)`, line-height 1.15): Code-styled
  section titles (`.heading-code`), e.g. `export class DigitalServices`.
- **Title** (Plus Jakarta Sans 600, 1.5rem, line-height 1.3): Card and subsection headings.
- **Body** (Plus Jakarta Sans 400, 1rem, line-height 1.6): Paragraph copy. Cap measure at
  65 to 75ch.
- **Label** (Mono 600, 0.875rem, letter-spacing 0.02em): Preheadings, code chips, CTA
  text, metadata. The `.preheading-code` chip wraps these in `<` and `/>`.

### Named Rules
**The Mono-Is-Meaning Rule.** Monospace marks something that is genuinely code or
command-like (a CTA verb, a section signature, a terminal line). It is never used for
running prose to look technical.

## 4. Elevation

A hybrid system: depth comes first from tonal layering up the dark ramp
(`#080810` to `#1a1a3a`), then from soft aurora glow on glass surfaces. Shadows are
luminous, not dark drop-shadows; they read as the surface emitting light.

### Shadow Vocabulary
- **Glass glow** (`box-shadow: 0 0 20px rgba(124,58,237,0.09), inset 0 1px 0 rgba(255,255,255,0.05)`):
  Resting state for glass cards. A faint violet halo plus a top inner highlight.
- **Glass glow cyan / green** (same shape, cyan `rgba(6,182,212,0.09)` / green
  `rgba(16,185,129,0.10)`): Variant cards keyed to their accent.
- **Lifted** (`0 16px 40px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.06)`):
  Card hover; pairs with `translateY(-4px)`.
- **Nav** (`0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`): The one
  place a darker ambient shadow is allowed, to detach the sticky bar.

### Motion Tokens
Depth has a partner: choreographed but quiet motion, driven by a small `:root` token set
that components cite rather than hand-rolling curves.
- **Easing:** `--ease-snappy` `cubic-bezier(.16,1,.3,1)` (entrances, reveals, hover lifts)
  and `--ease-smooth` `cubic-bezier(.4,0,.2,1)` (state cross-fades, color shifts). Both are
  ease-out; no bounce, no elastic.
- **Duration ladder:** `--duration-micro` 150ms, `--duration-fast` 200ms,
  `--duration-base` 300ms, `--duration-slow` 600ms, `--duration-reveal` 800ms.
- **Stagger:** `--stagger-base` 60ms steps the `.reveal-stagger` children (caps at the 6th;
  the 7th+ reveal together so a last row never stays hidden).
- Every animated surface collapses to ~0ms under `prefers-reduced-motion`.

### Named Rules
**The Glow-Not-Drop Rule.** Elevation is conveyed by colored glow and tonal lift, not by
heavy black drop-shadows. If a shadow looks gray and hard, it is wrong for this system.

## 5. Components

Character: luminous glass with precise edges. Surfaces are translucent and softly lit;
radii are tight (8px on controls, 14px on cards); focus is always a visible aurora ring.

### Buttons
- **Shape:** Tight corners (8px radius, `{rounded.md}`).
- **Primary** (`.btn-aurora-solid`): Solid aurora gradient `linear-gradient(135deg, #7c3aed, #2563eb)`,
  white text, weight 700, padding 14px 32px, glow `0 8px 32px rgba(124,58,237,0.4)`.
- **Glass** (`.btn-aurora`): Translucent glass background, 1px aurora border, white text,
  weight 600, padding 12px 28px; a violet-to-blue gradient fades in on hover beneath the
  label.
- **Hover / Focus:** Primary brightens (`brightness(1.15)`) and lifts (`translateY(-2px)`);
  glass reveals its gradient fill. Focus-visible is a `2px` aurora ring (`#a855f7`,
  offset 3px).
- **Layered gradient variant** (`.gradient-btn`, `GradientButton.tsx`): Clip-path gradient
  planes that shift on hover; a custom signature control.

### Cards / Containers
- **Corner Style:** 14px radius (`{rounded.xl}`), 18px to 22px on large bento cells.
- **Background:** Glass token (`rgba(255,255,255,0.04)`) over the dark ground, with
  `backdrop-filter: blur(20px) saturate(180%)`.
- **Shadow Strategy:** Glass glow at rest, Lifted on hover (see Elevation).
- **Border:** 1px translucent white (`rgba(255,255,255,0.08)`), or 1px aurora on accented
  cards. No heavy borders, no colored side-stripes.
- **Internal Padding:** 24px (`{spacing.lg}`).
- **Signature:** `.bento-card` adds an 18px dot-texture overlay; bento grids use a featured
  2x2 cell rather than a uniform grid.

### Navigation
- **Style** (`.glass-nav`): Sticky glass bar, `rgba(8,8,16,0.7)`, `blur(24px) saturate(200%)`,
  1px aurora border, ambient nav shadow.
- **Typography:** Label/mono and Plus Jakarta Sans; logo uses the aurora sweep gradient.
- **States:** Links shift toward aurora on hover; mega-menu panel is a larger glass surface.

> **Known issue.** The `.dark` token block in `globals.css` is never applied, so shadcn
> primitives (`button.tsx`, `accordion.tsx`) that use semantic tokens resolve to LIGHT
> `:root` values on the dark surface. Prefer the custom aurora/glass components above, or
> set explicit dark styles, until the theming is fixed. See CLAUDE.md Known Issues.

### Signature: Terminal & Code Chips
- Terminal surfaces share one chrome language: `rgba(8,8,16,0.7–0.95)` panel, 1px aurora
  border, a row of traffic-light dots (12px on `.terminal-card` / `.about-terminal-window`,
  7px `.svc-dot-*` inside the featured service code window), mono 0.875rem body, and a
  blinking cursor (`.hero-cursor` 2px, `.about-cursor` 8px; `blink 1s step-end`). The hero
  uses a floating glass badge variant (`.hero-terminal-badge`, `heroFloat 6s`).
- **Preheading chip family** (mono label, 1px tinted border, gradient-text fill, glow
  `text-shadow`):
  - `.preheading-code` wraps the label in `<` and `/>`, rose to pink
    (`rgb(244,63,94)` to `rgb(236,72,153)`).
  - `.preheading-terminal` prefixes `$ `, pink to fuchsia (`rgb(236,72,153)` to
    `rgb(219,39,119)`).
  - `.preheading-comment` prefixes `// `, orange to rose (`rgb(251,146,60)` to
    `rgb(251,113,133)`).
  All three are on the Gradient-Text Allow-List; the bracket/prefix glyphs are pseudo-element
  content, not typed text.

### Signature: Aurora Motion & Accent Patterns
The components above are static glass; these carry the system's choreography. Each is a
reusable pattern, not a one-off.

- **Process number watermark** (`.process-num`): a large glyph painted with a 200%-tall
  gradient (faint white `rgba(255,255,255,0.10)` top half, cyan-to-violet bottom half) that
  wipes upward as `background-position` slides on `.group:hover`, plus a violet drop-shadow.
  The number fills with aurora light as you hover its card.
- **Spinning aurora border** (`.aurora-border`, `.aurora-ring`, `.team-card-glow`,
  `.aurora-ring-avatar`): a conic gradient rotated through the `--border-angle`
  `@property` (`borderSpin 4s linear`), masked to a 2px ring and faded `opacity 0 to 1` on
  hover / focus-within. Used for team cards, avatars, and accent outlines. Animation off
  under reduced-motion.
- **Accent-variable cards** (`.bento-card`, `.value-card`, `.tech-card`, `.cat-tab`): one
  CSS-var contract drives per-card theming. A parent sets `--tech-accent` / `--cat-accent`
  (or `--accent-border` / `--accent-glow` / `--accent-icon` / `--accent-tag`), and the card
  derives its hover fill, border, and glow with `color-mix(in srgb, var(--accent) N%,
  …)`. This keeps every card on the aurora palette without bespoke CSS per color.
- **Asymmetric bento grids** (`.services-bento` 4-col, `.values-bento` 3-col): explicit
  `grid-column` / `grid-row` placement (a featured 2x2 cell, a tall cell, wide cells), not a
  uniform grid; both collapse to a single column at 640–768px. Gotcha: `.bento-card` placement
  is keyed by global `nth-child`, so when reused outside `.services-bento` reset
  `grid-column/row: auto`.
- **Featured code window** (`.code-window`, `.code-titlebar`, `.code-body`): a mini editor
  pane docked in the featured service cell, with `.svc-dot-*` traffic lights and a dimmed mono
  code body, reinforcing the code-as-language motif inside a marketing card.
- **Two-pane FAQ and story timeline** (`.faq-layout`, `.answer-panel`, `.story-panel`):
  desktop is a question list beside an animated answer pane (`panelEnter 520ms` /
  `panelExit 200ms`, both `cubic-bezier(0.16,1,0.3,1)`-family); mobile collapses to a
  grid-rows `0fr to 1fr` accordion (`.mobile-answer`). The About story timeline reuses the
  same panel keyframes.
- **Partners marquee** (`.marquee-viewport`, `.marquee-inner`, `.partner-card`):
  `marquee-scroll 32s linear` with an edge mask-fade and pause-on-hover; logos sit grayscale
  at 45% opacity and colorize on hover. Reduced-motion drops the scroll and wraps the cards
  into a static centered flex row.

## 6. Do's and Don'ts

### Do:
- **Do** keep the ground violet-tinted near-black (`#080810`); float everything on it.
- **Do** spend the full aurora gradient on roughly one element per viewport (Reserved
  Aurora Rule), then let dark space breathe.
- **Do** use monospace only for genuinely code-like content (CTAs, signatures, terminals).
- **Do** convey depth with colored glow and tonal layering, not hard black drop-shadows.
- **Do** show a `2px` aurora focus ring on every interactive element, and honor
  `prefers-reduced-motion` (the stylesheet already collapses animation to ~0ms).
- **Do** audit gradient and glass text for WCAG 2.2 AA contrast against the dark ground.

### Don't:
- **Don't** ship generic template-agency layouts: stock-photo heroes, lorem filler, or
  endless identical icon-heading-text card grids.
- **Don't** tip the aurora palette into crypto/neon hype: no glow overload, no neon-on-black
  swagger, no web3 buzzword energy.
- **Don't** read as stiff corporate sterility (navy-suit, IBM/Accenture) or as a cluttered,
  ad-heavy marketplace.
- **Don't** use `background-clip: text` gradients as decoration outside the Gradient-Text
  Allow-List (headline/logo sweep, code/preheading chips, stat and impact numbers, the
  `.process-num` hover fill); never on running body text, and never a colored
  `border-left`/`border-right` stripe as an accent.
- **Don't** use pure `#000` or `#fff`, and don't introduce a light mode or theme toggle.
- **Don't** let glass blur and glow become a default texture on every element; it is
  purposeful, or it is absent.
