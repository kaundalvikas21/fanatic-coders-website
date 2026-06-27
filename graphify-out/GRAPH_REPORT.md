# Graph Report - . (2026-06-03)

## Corpus Check

- Corpus is ~25,281 words - fits in a single context window. You may not need a graph.

## Summary

- 229 nodes · 258 edges · 36 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- [[_COMMUNITY_FCOP Data Model & Entities|FCOP Data Model & Entities]]
- [[_COMMUNITY_Project Guidelines & Aurora Design|Project Guidelines & Aurora Design]]
- [[_COMMUNITY_FCOP Modules & Personas|FCOP Modules & Personas]]
- [[_COMMUNITY_Non-Functional Requirements & Security|Non-Functional Requirements & Security]]
- [[_COMMUNITY_Open Questions & Rollout|Open Questions & Rollout]]
- [[_COMMUNITY_FCOP Vision & Goals|FCOP Vision & Goals]]
- [[_COMMUNITY_Header Navigation Logic|Header Navigation Logic]]
- [[_COMMUNITY_GSAP Animation Helpers|GSAP Animation Helpers]]
- [[_COMMUNITY_FCOP Overview & Personas|FCOP Overview & Personas]]
- [[_COMMUNITY_Footer Social Icons|Footer Social Icons]]
- [[_COMMUNITY_Accordion Component|Accordion Component]]
- [[_COMMUNITY_CTA Section|CTA Section]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Terminal About Section|Terminal About Section]]
- [[_COMMUNITY_Partner Logos (set A)|Partner Logos (set A)]]
- [[_COMMUNITY_Scroll Reveal Hook|Scroll Reveal Hook]]
- [[_COMMUNITY_Utils (cn helper)|Utils (cn helper)]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Home Route Entry|Home Route Entry]]
- [[_COMMUNITY_Testimonials Section|Testimonials Section]]
- [[_COMMUNITY_FAQ Section|FAQ Section]]
- [[_COMMUNITY_Portfolio Section|Portfolio Section]]
- [[_COMMUNITY_Partners Section|Partners Section]]
- [[_COMMUNITY_Tech Stack Section|Tech Stack Section]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Tech Logo Component|Tech Logo Component]]
- [[_COMMUNITY_Accessibility (WCAG)|Accessibility (WCAG)]]
- [[_COMMUNITY_UI Icons (fileglobewindow)|UI Icons (file/globe/window)]]
- [[_COMMUNITY_Known CSS Issues|Known CSS Issues]]
- [[_COMMUNITY_NextVercel Logos|Next/Vercel Logos]]
- [[_COMMUNITY_Partner Logos (set B)|Partner Logos (set B)]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]

## God Nodes (most connected - your core abstractions)

1. `Shared Data Model Overview` - 25 edges
2. `FCOP PRD Feature-Wise File Index` - 14 edges
3. `Feature 02: Project Management` - 14 edges
4. `Feature 06: Admin Revenue & Business Dashboard` - 12 edges
5. `Feature 04: Client Onboarding System` - 11 edges
6. `Feature 05: Client Portal` - 11 edges
7. `Feature 03: Google Workspace Integration` - 10 edges
8. `Feature 01: Team & Role Management` - 8 edges
9. `Feature 07: Notifications & Communication Layer` - 8 edges
10. `Aurora Terminal Design System` - 7 edges

## Surprising Connections (you probably didn't know these)

- `Fanatic Coders Operations Platform PRD v1.0` --semantically_similar_to--> `Product Purpose (convert technical buyers into project inquiries)` [INFERRED] [semantically similar]
  fcop-prd-v1.pdf → PRODUCT.md
- `Non-Functional: Accessibility (WCAG 2.1 AA Client Portal)` --semantically_similar_to--> `Accessibility & Inclusion (WCAG 2.2 AA)` [INFERRED] [semantically similar]
  fcop-prd-v1.pdf → PRODUCT.md
- `Design Principles (site is the proof, code as native language)` --rationale_for--> `Aurora Terminal Design System` [INFERRED]
  PRODUCT.md → DESIGN.md
- `fanaticCoders Project Guidelines (CLAUDE.md)` --references--> `AGENTS.md: This is NOT the Next.js you know` [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `Tech Stack (Next.js, React, TypeScript, Tailwind v4, shadcn/ui, GSAP)` --conceptually_related_to--> `README (create-next-app bootstrap)` [INFERRED]
  CLAUDE.md → README.md

## Hyperedges (group relationships)

- **FCOP Seven-Module Operations Platform** — fcop_prd_module1_team_role, fcop_prd_module2_project_management, fcop_prd_module3_google_workspace, fcop_prd_module4_client_onboarding, fcop_prd_module5_client_portal, fcop_prd_module6_admin_revenue_dashboard, fcop_prd_module7_notifications [EXTRACTED 0.95]
- **FCOP Four User Personas** — fcop_prd_persona_admin, fcop_prd_persona_manager, fcop_prd_persona_team_member, fcop_prd_persona_client [EXTRACTED 0.95]
- **Aurora Terminal Design Language** — design_color_system, design_typography, design_elevation, design_glass_components [EXTRACTED 0.90]
- **All seven feature modules depend on shared data model and NFRs** — feature_team_role_management, feature_project_management, feature_google_workspace_integration, feature_client_onboarding, feature_client_portal, feature_revenue_dashboard, feature_notifications_communication, shared_data_model, shared_non_functional_requirements [EXTRACTED 1.00]
- **V1 MVP rollout bundles P0 of all modules plus NFR baseline** — rollout_v1_mvp, feature_team_role_management, feature_project_management, feature_google_workspace_integration, feature_client_onboarding, feature_client_portal, feature_revenue_dashboard, feature_notifications_communication [EXTRACTED 1.00]
- **Onboarding hands off to revenue pipeline; portal surfaces read-only invoices** — feature_client_onboarding, feature_revenue_dashboard, feature_client_portal, entity_invoice [EXTRACTED 1.00]
- **Default Next.js Scaffold UI Icons** — window_icon, file_icon, globe_icon [INFERRED 0.85]
- **Next.js / Vercel Brand Logos** — next_logo, vercel_logo [INFERRED 0.80]
- **PartnersSection Partner Brand Logos** — logo_cloudscale, logo_techcorp, logo_codelabs, logo_dataflow, logo_byteworks, logo_devforce [INFERRED 0.85]

## Communities

### Community 0 - "FCOP Data Model & Entities"

Cohesion: 0.16
Nodes (32): Dynamic Service-Type Onboarding Wizard, Google Chat App Integration (service account), Client Pipeline View (Lead to Churned), Entity: AuditLog, Entity: Client, Entity: ClientUser, Entity: Comment, Entity: Expense (+24 more)

### Community 1 - "Project Guidelines & Aurora Design"

Cohesion: 0.1
Nodes (22): AGENTS.md: This is NOT the Next.js you know, AI Workflow Guidelines (Mandatory), Future Scalable Structure (route groups, auth, dashboard), File Line-Count Recommendations, fanaticCoders Project Guidelines (CLAUDE.md), Project Structure (src/app, components, lib, hooks, types), Tech Stack (Next.js, React, TypeScript, Tailwind v4, shadcn/ui, GSAP), Aurora Terminal Design System (+14 more)

### Community 2 - "FCOP Modules & Personas"

Cohesion: 0.12
Nodes (16): FCOP Data Model Overview (entities & relationships), Module 1: Team & Role Management, Module 2: Project Management, Module 4: Client Onboarding System, Module 5: Client Portal, Module 6: Admin Revenue & Business Dashboard, Non-Functional: Security (auth, RBAC, data isolation, audit), Onboarding Field Specifications by Service Type (+8 more)

### Community 3 - "Non-Functional Requirements & Security"

Cohesion: 0.14
Nodes (15): NFR: Accessibility (WCAG 2.1 AA for Client Portal), NFR: Audit Logging, Client Data Isolation (client_id scoping, RLS), NFR: Performance, RBAC Deny-by-Default Authorization, NFR: Reliability & Availability, NFR: Scalability, NFR: Security (Auth, RBAC, Data Isolation, Audit) (+7 more)

### Community 4 - "Open Questions & Rollout"

Cohesion: 0.18
Nodes (11): Profit Margin per Project Calculation, OQ-1: Payment Gateway Integration in V1, OQ-2: Tech Stack Selection, OQ-4: Google Workspace Edition / Admin Approval, OQ-5: Internal Hourly Rates for Margin Calculation, Reference: Competitive Feature Gap Analysis, Reference: Open Questions (OQ-1..OQ-10), Reference: Phased Rollout Recommendation (+3 more)

### Community 5 - "FCOP Vision & Goals"

Cohesion: 0.2
Nodes (10): Competitive Feature Gap Analysis, FCOP Executive Summary, FCOP Goals G1-G6 with Success Metrics, Module 3: Google Workspace Integration, Module 7: Notifications & Communication Layer, FCOP Open Questions (OQ-1 to OQ-10), Phased Rollout (V1 MVP, V1.1, V2), FCOP Problem Statement (fragmented tools) (+2 more)

### Community 6 - "Header Navigation Logic"

Cohesion: 0.39
Nodes (7): cancelClose(), closeMegaMenu(), closeMobileMenu(), onClick(), onEscape(), onScroll(), openMegaMenu()

### Community 7 - "GSAP Animation Helpers"

Cohesion: 0.48
Nodes (5): auroraEntrance(), fadeIn(), registerScrollTrigger(), staggerReveal(), wordReveal()

### Community 8 - "FCOP Overview & Personas"

Cohesion: 0.29
Nodes (7): FCOP Product Overview & Context, Fanatic Coders Operations Platform (FCOP), Admin (Agency Owner) Persona, Client Persona, Manager Persona, Team Member Persona, Problem: Fragmented Tooling Workflows

### Community 9 - "Footer Social Icons"

Cohesion: 0.53
Nodes (4): IconGithub(), IconInstagram(), IconLinkedin(), IconTwitter()

### Community 10 - "Accordion Component"

Cohesion: 0.53
Nodes (4): Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 11 - "CTA Section"

Cohesion: 0.67
Nodes (2): onMouseMove(), updateCodeElements()

### Community 12 - "Hero Section"

Cohesion: 0.67
Nodes (2): cycleTerminal(), onMouseMove()

### Community 13 - "Terminal About Section"

Cohesion: 0.67
Nodes (2): getLineColor(), run()

### Community 14 - "Partner Logos (set A)"

Cohesion: 0.5
Nodes (4): Byte::Works Partner Logo, CloudScale Partner Logo, CodeLabs Partner Logo, TechCorp Partner Logo

### Community 15 - "Scroll Reveal Hook"

Cohesion: 0.67
Nodes (1): useScrollReveal()

### Community 16 - "Utils (cn helper)"

Cohesion: 0.67
Nodes (1): cn()

### Community 17 - "Root Layout"

Cohesion: 0.67
Nodes (1): RootLayout()

### Community 18 - "Home Route Entry"

Cohesion: 0.67
Nodes (1): Home()

### Community 19 - "Testimonials Section"

Cohesion: 0.67
Nodes (1): toggleAutoplay()

### Community 20 - "FAQ Section"

Cohesion: 0.67
Nodes (1): selectFaq()

### Community 21 - "Portfolio Section"

Cohesion: 0.67
Nodes (1): PortfolioSection()

### Community 22 - "Partners Section"

Cohesion: 0.67
Nodes (1): PartnersSection()

### Community 23 - "Tech Stack Section"

Cohesion: 0.67
Nodes (1): switchCategory()

### Community 24 - "Button Component"

Cohesion: 0.67
Nodes (1): cn()

### Community 25 - "Tech Logo Component"

Cohesion: 0.67
Nodes (1): TechLogo()

### Community 26 - "Accessibility (WCAG)"

Cohesion: 0.67
Nodes (3): Accessibility WCAG 2.2 AA + prefers-reduced-motion, Non-Functional: Accessibility (WCAG 2.1 AA Client Portal), Accessibility & Inclusion (WCAG 2.2 AA)

### Community 27 - "UI Icons (file/globe/window)"

Cohesion: 1.0
Nodes (3): Document File Icon, Globe / World Icon, Window / Browser UI Icon

### Community 28 - "Known CSS Issues"

Cohesion: 1.0
Nodes (2): Known Issues (.dark dead block, circular --font-sans), Known Issue: .dark token block never applied

### Community 29 - "Next/Vercel Logos"

Cohesion: 1.0
Nodes (2): Next.js Wordmark Logo, Vercel Triangle Logo

### Community 30 - "Partner Logos (set B)"

Cohesion: 1.0
Nodes (2): DataFlow Partner Logo, DevForce.io Partner Logo

### Community 53 - "Community 53"

Cohesion: 1.0
Nodes (1): Non-Functional: Performance

### Community 54 - "Community 54"

Cohesion: 1.0
Nodes (1): Non-Functional: Scalability

### Community 55 - "Community 55"

Cohesion: 1.0
Nodes (1): Non-Functional: Reliability & Availability

### Community 56 - "Community 56"

Cohesion: 1.0
Nodes (1): Research Sources & References

### Community 57 - "Community 57"

Cohesion: 1.0
Nodes (1): Grid Border Background Pattern

## Knowledge Gaps

- **51 isolated node(s):** `AI Workflow Guidelines (Mandatory)`, `Future Scalable Structure (route groups, auth, dashboard)`, `Known Issues (.dark dead block, circular --font-sans)`, `File Line-Count Recommendations`, `AGENTS.md: This is NOT the Next.js you know` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `CTA Section`** (4 nodes): `onMouseMove()`, `updateCodeElements()`, `CtaSection.tsx`, `CtaSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Section`** (4 nodes): `cycleTerminal()`, `onMouseMove()`, `HeroSection.tsx`, `HeroSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Terminal About Section`** (4 nodes): `TerminalAboutSection.tsx`, `TerminalAboutSection.tsx`, `getLineColor()`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Reveal Hook`** (3 nodes): `useScrollReveal.ts`, `useScrollReveal.ts`, `useScrollReveal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utils (cn helper)`** (3 nodes): `utils.ts`, `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (3 nodes): `layout.tsx`, `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Route Entry`** (3 nodes): `page.tsx`, `Home()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Testimonials Section`** (3 nodes): `TestimonialsSection.tsx`, `TestimonialsSection.tsx`, `toggleAutoplay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FAQ Section`** (3 nodes): `selectFaq()`, `FAQSection.tsx`, `FAQSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Portfolio Section`** (3 nodes): `PortfolioSection.tsx`, `PortfolioSection()`, `PortfolioSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Partners Section`** (3 nodes): `PartnersSection.tsx`, `PartnersSection()`, `PartnersSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tech Stack Section`** (3 nodes): `TechStackSection.tsx`, `TechStackSection.tsx`, `switchCategory()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (3 nodes): `cn()`, `button.tsx`, `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tech Logo Component`** (3 nodes): `TechLogo.tsx`, `TechLogo.tsx`, `TechLogo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Known CSS Issues`** (2 nodes): `Known Issues (.dark dead block, circular --font-sans)`, `Known Issue: .dark token block never applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next/Vercel Logos`** (2 nodes): `Next.js Wordmark Logo`, `Vercel Triangle Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Partner Logos (set B)`** (2 nodes): `DataFlow Partner Logo`, `DevForce.io Partner Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `Non-Functional: Performance`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `Non-Functional: Scalability`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `Non-Functional: Reliability & Availability`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `Research Sources & References`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `Grid Border Background Pattern`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `FCOP PRD Feature-Wise File Index` connect `FCOP Data Model & Entities` to `FCOP Overview & Personas`, `Non-Functional Requirements & Security`, `Open Questions & Rollout`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `FCOP Product Overview & Context` connect `FCOP Overview & Personas` to `FCOP Data Model & Entities`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `AI Workflow Guidelines (Mandatory)`, `Future Scalable Structure (route groups, auth, dashboard)`, `Known Issues (.dark dead block, circular --font-sans)` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Guidelines & Aurora Design` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `FCOP Modules & Personas` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Non-Functional Requirements & Security` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
