<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Content & copy writing (MANDATORY)

All user-facing copy MUST read as plain, human writing with no AI signatures. See CLAUDE.md
section 12 for the full rule. In short:

- No em dashes (—) or en dashes (–) as punctuation. Use a period, comma, colon, or parentheses.
- No AI-marketing vocabulary (seamless, robust, leverage, elevate, unlock, empower, bespoke,
  harness, cutting-edge, "crafting exceptional", "innovative solutions", and similar).
- No AI sentence tells (rule-of-three flourishes, "not just X but Y", "it's not X, it's Y",
  "whether you … or just …", false "from X to Y" ranges, inflated superlatives).
- Write specific, concrete, short. Self-check copy with the `humanizer` skill.
- Scope: JSX text, data strings, placeholders, aria-labels, `.subheading-code` comments.
  Source-code comments are exempt.
