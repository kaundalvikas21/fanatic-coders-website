<!-- ======================================================================
  Fanatic Coders Operations Platform — PRD v1.0
  This INDEX is a navigation aid added during the feature-wise split.
  The 14 files it lists together contain the ENTIRE original PRD, copied
  verbatim. Verified by reconstruction: concatenating all files reproduces
  fcop-prd-v1.md byte-for-byte.
  ====================================================================== -->

# FCOP PRD v1.0 — Feature-Wise File Index

The original `fcop-prd-v1.md` has been split into the files below for easier
feature development, management, and traceability. **No content was lost** —
the union of these files is byte-for-byte identical to the source PRD. Each
file begins with an HTML-comment header recording its source section, PRD
pages, original line range, and related files (the header does not render).

## Verification status
The union of these files is byte-for-byte identical to the source MD, and the
content has been verified word-for-word against the source PDF (`fcop-prd-v1.pdf`).
Two PDF-accurate corrections were applied to fix defects introduced by the original
MD extraction (each is documented in that file's header comment):
- `shared-01-non-functional-requirements.md` — heading restored to `## 5. Non-Functional Requirements` (was a stray `-` bullet in the MD).
- `ref-02-open-questions.md` — IDs rejoined to `OQ-1`…`OQ-10` (the MD broke each across two lines).

All other 12 files remain byte-for-byte faithful to the original MD.

## How the split is organized
- **`01-overview-context.md`** — read first; shared product context for every feature.
- **`feature-0X-*.md`** — the seven buildable feature modules (PRD §4.1–4.7). Build unit = one file.
- **`shared-0X-*.md`** — cross-cutting specs (non-functional requirements, data model) referenced by all features.
- **`ref-0X-*.md`** — planning references (gap analysis, open questions, rollout plan, sources).

## File map

| File | PRD § | PRD Pages | Original Lines | Purpose |
|---|---|---|---|---|
| `01-overview-context.md` | Cover,1,2,3 | 1–4 | 1–101 | Exec summary, problem, goals, personas |
| `feature-01-team-role-management.md` | 4.1 | 5–6 | 102–163 | Roles, permissions, profiles, workload |
| `feature-02-project-management.md` | 4.2 | 7–8 | 164–235 | Projects, tasks, statuses, time, files |
| `feature-03-google-workspace-integration.md` | 4.3 | 9–10 | 236–316 | Google Chat / Calendar notifications |
| `feature-04-client-onboarding.md` | 4.4 | 11–14 | 317–492 | Dynamic onboarding wizard + field specs |
| `feature-05-client-portal.md` | 4.5 | 15–16 | 493–560 | Client-facing portal |
| `feature-06-revenue-dashboard.md` | 4.6 | 17–18 | 561–616 | Revenue, invoicing, pipeline |
| `feature-07-notifications-communication.md` | 4.7 | 19–20 | 617–682 | In-app / email / Chat notifications |
| `shared-01-non-functional-requirements.md` | 5 | 21–22 | 683–756 | Security, performance, scalability, etc. |
| `shared-02-data-model.md` | 6 | 23 | 757–801 | Entity/relationship reference |
| `ref-01-competitive-gap-analysis.md` | 7 | 24 | 802–877 | Out-of-scope feature considerations |
| `ref-02-open-questions.md` | 8 | 25 | 878–939 | Decisions needed before build (OQ-1..10) |
| `ref-03-phased-rollout.md` | 9 | 26 | 940–978 | V1 / V1.1 / V2 sequencing |
| `ref-04-research-sources.md` | 10 | 27 | 979–1013 | Citations & references |

## Phased rollout cross-reference (from `ref-03-phased-rollout.md`)
- **V1 (MVP):** P0 of features 01–07 + core of 06 + non-functional baseline.
- **V1.1 (fast follow):** time tracking, Calendar, portal invoices, payments, prefs, reminders, workload dashboards.
- **V2 (expansion):** dependencies/Gantt, daily digest, expenses/margins, recurring tasks, surveys, webhooks, plus selected gap-analysis items.

## Dependency notes for builders
- Every feature depends on `shared-01` (NFRs) and `shared-02` (data model).
- `feature-03` (Google Workspace) and `feature-07` (Notifications) are coupled — Chat is one channel of the notification layer.
- `feature-04` (Onboarding) hands off to `feature-06` pipeline; `feature-05` (Portal) surfaces read-only invoices from `feature-06`.
- Resolve `ref-02` open questions (esp. OQ-1 payments, OQ-2 stack, OQ-4 Workspace edition) before locking scope.
