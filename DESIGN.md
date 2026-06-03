# Design

Visual system for the fanaticCoders site. Captured from `src/app/globals.css` (the
"AURORA DESIGN SYSTEM" token block), `src/app/layout.tsx`, `src/components/ui/`, and
`package.json`. Token values below are the source of truth; line refs point at the live
definitions.

## Theme

Dark-first (OLED). The site presents on a near-black, violet-tinted ground. Light-mode
OKLCH tokens exist in `:root` but the experience is the dark surface.

Base dark tiers (`globals.css:115-121`):

| Token | Value |
|---|---|
| `--dark-0` | `#000000` |
| `--dark-1` | `#080810` |
| `--dark-2` | `#0d0d1f` |
| `--dark-3` | `#12122a` |
| `--dark-4` | `#1a1a3a` |

## Color

**Strategy:** Committed moving toward full-palette. The violet to blue to cyan aurora
carries the brand identity through mesh backgrounds and gradient sweeps; green is the
secondary accent. Keep it tasteful, never crypto-neon (see PRODUCT.md anti-references).

Aurora accent set (`globals.css:14-21, 123-130`):

| Role | Base | Light |
|---|---|---|
| Violet | `#7c3aed` | `#a855f7` |
| Blue | `#2563eb` | `#60a5fa` |
| Cyan | `#06b6d4` | `#22d3ee` |
| Green | `#10b981` | `#34d399` |

Semantic tokens are defined in OKLCH across the `:root` and `.dark` blocks
(`globals.css:73-107, 159-191`): `--background`, `--foreground`, `--primary`,
`--secondary`, `--border`, `--input`, `--ring`, `--destructive`
(`oklch(0.577 0.245 27.325)`).

Key gradients:
- `.heading-gradient`: `linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb, #4f46e5)` (`globals.css:369-375`)
- `.text-aurora-sweep`: violet to blue to cyan to violet sweep (`globals.css:489`)
- `.logo-gradient`: violet to blue to cyan (`globals.css:859`)

## Typography

| Use | Family | Weights |
|---|---|---|
| Body | Plus Jakarta Sans | 400 / 600 / 700 |
| Headings, UI | Inter | per scale |
| Mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono'` | load-bearing for the code/terminal motif |

Body stack: `globals.css:206`. Fonts wired in `layout.tsx` and `package.json`.

Type patterns: `.heading-gradient` (text-4xl to 5xl, bold, animated gradient),
`.heading-code` (responsive mono headline), `.subheading-code`, `.preheading-code`
(inline code-tag chip with `<` and `/>` pseudo-elements).

## Radius

Base `--radius: 0.625rem` (10px) (`globals.css:98`). Scale (`globals.css:61-67`):
sm `~6px`, md `~8px`, lg `10px`, xl `~14px`, 2xl `~18px`, 3xl `~22px`, 4xl `~26px`.

## Elevation and surfaces

Glassmorphism token set (`globals.css:132-142`):
- `--glass-bg` / `-md` / `-lg`: `rgba(255,255,255, 0.04 / 0.06 / 0.08)`
- `--glass-border`: `rgba(255,255,255,0.08)`; `--glass-border-aurora`: `rgba(124,58,237,0.25)`
- `--glass-blur`: `20px`; `--glass-blur-lg`: `28px`
- Aurora glow shadows (violet / cyan / green variants)

Surface components: `.glass-card` (translucent, `blur(20px) saturate(180%)`),
`.bento-card` (glass + 18px dot-texture overlay), `.card-lift` (hover `translateY(-4px)`
+ shadow). Heavy glassmorphism is intentional brand identity here, not the impeccable
default-ban case; see review note below.

## Motion

Easing (`globals.css:144-147`):
- `--ease-snappy`: `cubic-bezier(.16, 1, .3, 1)`
- `--ease-smooth`: `cubic-bezier(.4, 0, .2, 1)`

Durations (`globals.css:147-152`): micro 150ms, fast 200ms, base 300ms, slow 600ms,
reveal 800ms; `--stagger-base` 60ms.

Keyframes (`globals.css:765-796`): `gradient`, `auroraShift`, `borderSpin`
(via `@property --border-angle`), `wordEnter`, `pulse`. GSAP drives the complex
scroll-reveal and hero sequences.

## Layout

- Bento grids: `.services-bento` (4-col with a 2x2 featured cell, collapses to 2-col then
  1-col) and `.values-bento` (asymmetric 3-col Build / Maintain / Grow).
- Hero: multi-layer aurora system (radial mesh + noise overlay + masked dot-grid +
  floating code elements with mouse-repel physics).
- Standard background helpers: `.aurora-bg-hero`, `.aurora-bg-section`, `.aurora-bg-cta`.

## Review notes (for future impeccable passes, not init)

Heavy glassmorphism and gradient-text are impeccable default-bans, but they are
deliberate brand identity on this site. Flag for scrutiny in `critique` / `polish` /
`audit` (especially WCAG 2.2 AA contrast of gradient and glass text on the dark ground),
not during context bootstrap.
