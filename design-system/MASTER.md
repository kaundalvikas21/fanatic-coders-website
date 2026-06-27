# fanaticCoders — MASTER design system

Single source of truth for the UI/UX Pro Max skill. Every new page reuses this exact visual
language. Do not invent colors, fonts, or styles. Values below are verbatim from
`src/app/globals.css` and `typography-reference.html`.

- **Product category:** Agency / B2B Service
- **UI style:** Aurora UI, dark-first base
- **Theme:** dark only (no toggle). `body` background is hardcoded `#080810`.

---

## 1 · Color tokens

### Backgrounds (OLED dark tiers)

| Token                | Value     | Use                      |
| -------------------- | --------- | ------------------------ |
| `--dark-0`           | `#000000` | deepest                  |
| `--dark-1` / base bg | `#080810` | page background (`body`) |
| `--dark-2`           | `#0d0d1f` | raised surface           |
| `--dark-3`           | `#12122a` | card / panel             |
| `--dark-4`           | `#1a1a3a` | hover / elevated         |
| alt base             | `#0a0a0a` | secondary dark surface   |

### Aurora accent palette

| Token  | Value     | Light variant                       |
| ------ | --------- | ----------------------------------- |
| violet | `#7c3aed` | `#a855f7` (`--aurora-violet-light`) |
| blue   | `#2563eb` | `#60a5fa` (`--aurora-blue-light`)   |
| cyan   | `#06b6d4` | `#22d3ee` (`--aurora-cyan-light`)   |
| green  | `#10b981` | `#34d399` (`--aurora-green-light`)  |
| indigo | `#4f46e5` | (gradient/border anchor)            |

Tailwind theme names: `dark-0..4`, `aurora-violet`, `aurora-violet-light`, `aurora-blue`,
`aurora-blue-light`, `aurora-cyan`, `aurora-cyan-light`, `aurora-green`, `aurora-green-light`.

### Text & surface

| Role                  | Value                                       | Notes                                                  |
| --------------------- | ------------------------------------------- | ------------------------------------------------------ |
| ink (headings/strong) | `#e8ecff`                                   | spec ink; `body` base is `--color-text-base` `#f4f6ff` |
| body prose            | `blue-100/72` = `rgba(191,219,254,0.72)`    | default paragraph color                                |
| body variants         | `/.85` quotes, `/.65`, `/.6`, `/.5`, `/.45` | softer per context                                     |
| muted (UI chrome)     | `rgba(199,210,254,0.55)`                    | `--muted` in reference; distinct from body             |
| line / border         | `rgba(255,255,255,0.08)`                    | hairlines, card borders                                |
| card surface          | `rgba(255,255,255,0.025)`                   | faint glass fill                                       |

> Keep the two "muted" values distinct: chrome `rgba(199,210,254,.55)` vs body
> `rgba(191,219,254,.72)`. Do not collapse them.

### Key gradients

- Logo / animated text: `linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed)`, `background-size:300% 300%`, 5s loop.
- Heading gradient: `linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb, #4f46e5)`, animated 5s.
- CTA heading: `linear-gradient(135deg, #ffffff, #c4b5fd, #93c5fd)`.
- Aurora text: `linear-gradient(135deg, #7c3aed, #22d3ee)`; sweep adds `#2563eb` mid-stop + animation.

---

## 2 · Typography

Fonts via `@fontsource`, weights **400 / 600 / 700 only** (no 300/500/800).

- **Sans (`--font-sans`):** `'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif` — body, headings, nav.
- **Mono (`--font-mono`):** `'JetBrains Mono', ui-monospace, monospace` — code, terminal badges, stat numbers, tech tags, metadata labels.

### Heading recipes (shown at largest breakpoint)

| Recipe                    | Class string                                                                                         | px scale          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| `.h-home` (hero)          | `text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight`                | 32 → 36 → 48 → 72 |
| `.h-section` (code-style) | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono`                                   | 24 → 30 → 36 → 48 |
| `.h-post`                 | `text-3xl md:text-5xl font-bold leading-[1.06] tracking-tight`                                       | 32 → 48           |
| `.h-service`              | `text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight`                                       | 36 → 48           |
| `.h-case`                 | `text-4xl md:text-6xl font-bold leading-[1.03] tracking-tight`                                       | 36 → 60           |
| `.h-cta`                  | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` + white→purple→blue gradient | 24 → 48           |
| `.h-stat`                 | `text-3xl md:text-4xl font-bold font-mono tabular-nums`                                              | 30 → 36           |

### Special heading classes

- `.heading-gradient` — `text-4xl md:text-5xl font-bold`, animated 4-stop gradient.
- `.heading-code` — `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono`; `.function` = indigo-400 `#818cf8`, `.params` = pink-400 `#f472b6`.
- `.subheading-code` — `text-sm sm:text-base md:text-lg lg:text-xl font-mono`, color `blue-100/60`.

### Eyebrow / preheading badges (`inline-flex px-4 py-1.5 rounded-full text-sm font-mono`)

- `.preheading-code` — gradient `#f43f5e→#ec4899`, pseudo `< … />`.
- `.preheading-terminal` — gradient `#ec4899→#db2777`, pseudo `$ `.
- `.preheading-comment` — gradient `#fb923c→#fb7185`, pseudo `// `.

### Aurora gradient text (accent words in headings, `font-bold`, 38px demo)

- `.text-aurora` — `135deg, #7c3aed → #22d3ee`.
- `.text-aurora-violet` — `135deg, #a78bfa → #c4b5fd`.
- `.text-aurora-sweep` — `135deg, #7c3aed → #2563eb → #22d3ee`, `300%/300%` animated 5s.

### Body & utility

| Recipe        | Class string                                    | px / detail                               |
| ------------- | ----------------------------------------------- | ----------------------------------------- |
| `.body-base`  | `text-base text-blue-100/72 leading-relaxed`    | 16px, line-height 1.625, `max-width:60ch` |
| `.sub-scale`  | `text-base sm:text-lg md:text-xl lg:text-2xl`   | 16 → 18 → 20 → 24                         |
| `.label-meta` | `text-xs font-mono uppercase tracking-[0.18em]` | 12px, color `blue-100/60`                 |

### Size scale (Tailwind v4 px)

`text-xs` 12 · `text-sm` 14 (most common) · `text-base` 16 · `text-lg` 18 · `text-xl` 20 ·
`text-2xl` 24 · `text-3xl` 30 · `text-4xl` 36 · `text-5xl` 48 · `text-6xl` 60 · `text-7xl` 72.

### Tracking & leading

`tracking-tight` -0.02em (all headings) · `tracking-[0.18em]` labels · `tracking-[0.14em]` ·
`leading-relaxed` 1.625 (prose) · `leading-snug` 1.375 (titles) · `leading-tight` 1.25 (hero) ·
`leading-none` 1 · `leading-[1.06]` post · `leading-[1.05]` service · `leading-[1.03]` case.

---

## 3 · Components

### GradientButton (`.gradient-btn`, `globals.css:880`) — the site CTA

- Surface: dark glass `rgba(15,15,26,.8)`, border `rgba(79,70,229,0.3)`, radius 8px, padding `12px 32px`.
- Text inherits Plus Jakarta Sans @ **400**, white. No mono / no uppercase / no tracking.
- Layers: `g1` base angled gradient + `g2`/`g3` clip-path layers (fade in on hover) + radial `glow` (blur 15px).
- Hover: `translateY(-2px)`, border `→ rgba(79,70,229,0.5)`, g1 shift, g2/g3 fade-in, glow on.
- Focus: `outline:2px solid rgba(165,180,252,.95)`, offset 2px.
- **Primary** wraps label in `{ }`. **Secondary** dims g1 to .2 and prefixes label with indigo-400 `./`.
- Sizes: `sm` 14px (`px-5 py-2`) · `md` 16px · `lg` 18px (`px-10 py-4`).
- Other buttons: shadcn `Button` (`text-sm font-medium`, rare); text link `text-sm font-mono text-blue-100/60`.

### Navigation & mega menu (`Header.tsx`, `globals.css:937+`)

- `.nav-link` — `0.875rem / 500`, color `white/75` → `#fff` + violet 10% bg on hover.
- `.logo-gradient` — animated 4-stop gradient `#7c3aed→#2563eb→#06b6d4→#7c3aed`, 300%/5s.
- Mega: `.col-head` `0.85rem/700 uppercase 0.09em` · `.item-name` `0.82rem/500` (→ `#fff` on hover) ·
  `.item-desc` `0.72rem` `white/55` · `.item-arrow` indigo `#a855f7`, reveals on hover.

### Cards

- `.card-title` `text-base font-bold leading-snug` → `group-hover:text-indigo-200`.
- `.card-title-feat` `text-xl md:text-2xl font-bold leading-snug`.
- `.card-desc` `text-sm text-blue-100/60 leading-relaxed`.
- `.card-meta` `text-xs font-mono text-blue-100/50`.
- `.view-link` `text-sm font-mono text-indigo-300`; hover widens gap + opacity .75→1.

### Chips / badges

- `.chip` `text-[11px] font-mono text-indigo-300`, `bg-indigo-500/12`, rounded-full.
- `.chip-tst` `text-xs font-mono`, violet pill `bg-violet/14` border `violet/30`.
- `.badge-aurora` (CTA eyebrow) `text-sm font-mono`, `text-#c4b5fd`, `bg-violet/12` border `violet/30`.

### FAQ

- `.faq-q-text` `0.9375rem / 500` white.
- `.answer-question` `1.25rem / 700`, violet-light `#c4b5fd`, line-height 1.4.
- `.answer-text` `1.0625rem`, `white/65`, line-height 1.8.

### Quotes

- `.quote-tst` `text-sm sm:text-base md:text-lg text-blue-100/85 leading-relaxed`, left border `violet/40`.
- `.quote-case` `text-xl md:text-2xl font-medium leading-snug` white.
- `.quote-mark` `text-7xl font-mono` color `violet/15`.

### Long-form prose (no Tailwind prose plugin — manual utilities)

- `.prose-h2` `text-xl md:text-2xl font-bold tracking-tight` white.
- `.prose-body` `text-base text-blue-100/72 leading-relaxed` `max-width:60ch`.
- `.kt-label` `text-xs font-mono uppercase tracking-[0.18em] text-blue-100/45`.
- `.kt-item` `text-sm text-blue-100/80 leading-relaxed`.

### Stats / numbers

- `.stat-num` `font-bold (800)` gradient `#a855f7→#06b6d4`.
- `.metric-num` `text-4xl lg:text-6xl font-bold font-mono tabular-nums` gradient white→cyan.
- `.portfolio-stat` `text-lg font-bold font-mono tabular-nums` white.
- `.process-num` `font-mono tabular-nums`, faint by default, fills cyan→violet bottom-up on parent hover + drop-shadow.

### Avatars

- Aurora-ring avatars: circular image inside a gradient ring (violet→cyan).

---

## 4 · Brand voice & code motif

Agency that codes. Lean on a programming motif, used sparingly:

- Wrap brand / CTA labels in braces: `{ fanaticCoders }`, `{ startProject }`.
- Object syntax for structured blurbs: `const project = { … }`.
- Eyebrows as comments or shell: `// note`, `$ whoami`, `<services />`.

**Copy rules (mandatory, CLAUDE.md §12):** plain human writing, no AI signatures.

- No em/en dashes as punctuation. Use period, comma, colon, or parentheses.
- No AI-marketing vocab (seamless, robust, leverage, elevate, unlock, empower, bespoke, harness,
  cutting-edge, "crafting exceptional", "innovative solutions", etc.).
- No AI sentence tells (rule-of-three, "not just X but Y", "it's not X, it's Y", false "from X to Y"
  ranges, inflated superlatives). Write specific, concrete, short. Vary rhythm.

---

## 5 · Layout: section rhythm & containers

- **Section vertical padding:** `py-24` base (most common). Variants `py-20` (tighter) and `py-28` (looser).
- **Hero spacing:** `pt-44 pb-22` (clears the floating header, equal visual gaps).
- **Page container:** `max-w-6xl` (dominant) with horizontal padding `px-6` / `px-4 sm:px-6 lg:px-8`.
- **Prose width:** `max-w-2xl` / `max-w-3xl`; inline prose caps at `60ch`.
- **Cards / glass:** border `rgba(255,255,255,.08)`, surface `rgba(255,255,255,.025)`, radius 14–16px.

New pages follow this rhythm by default. Layout and content are designed fresh per page; only the
tokens, type recipes, and components above are reused.
