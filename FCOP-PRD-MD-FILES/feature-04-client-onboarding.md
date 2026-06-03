<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 04 — Client Onboarding System
  PRD SECTION : 4.4 (Module 4)   |   PRD PAGES : 11-14   |   ORIGINAL LINES : 317-492
  RELATED     : Data model: Client, ClientUser, OnboardingSubmission, FileAttachment (see shared-02-data-model.md). Pipeline handoff in feature-06-revenue-dashboard.md; reminders in feature-07.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 11
## 4.4 Module 4: Client Onboarding System
A dynamic, multi-step onboarding workflow that adapts based on the service type(s) the client
has engaged for. Industry research (ALM Corp, AgencyAnalytics, DesignRush, Leadsie) shows
that agencies with structured onboarding achieve 70% higher retention and 31% faster time-to-
revenue versus ad-hoc approaches.

## Feature Priority Description
Dynamic service-type
forms
P0 Onboarding form fields change based on selected service(s). A
client engaging for both SEO and Google Ads sees combined
relevant fields, not two separate forms.
Multi-step wizard UI P0 Onboarding broken into logical steps: Company Info → Service-
Specific Details → Access & Credentials → Goals & KPIs →
## Review & Submit.
Onboarding completion
tracker
P0 Visual progress bar showing completion %. Admin/Manager can
see which clients have incomplete onboarding and what’s
missing.
Save & resume P0 Client can save partial progress and return later. Data persists
across sessions.
Automated reminders P1 If onboarding is incomplete after 48 hours, send an email
reminder. Escalate to assigned Manager after 5 days.
Client account creation P0 Upon onboarding initiation, the client receives an email invitation
to create their portal login (email + password or magic link).
Onboarding data
editable by
Admin/Manager
P0 Internal team can view and edit all onboarding responses. Client
can view but not edit after submission (can request changes).
File upload during
onboarding
P0 Client can upload brand assets, design references, wireframes,
existing reports, etc. during onboarding.
Secure credentials
handling
P1 For third-party account access (Google Ads, GA4, GSC, social
media), use permission-based access delegation (e.g., granting
viewer/editor access) instead of sharing passwords. Include
guidance text in the form.


Fanatic Coders Operations Platform — PRD v1.0
## Page 12
4.4.1 Onboarding Field Specifications by Service Type

Common Fields (All Service Types)
- Company name, website URL, industry/vertical
- Primary contact: name, email, phone, timezone, preferred communication channel
- Secondary/billing contact (if different)
- Company size (employees), annual revenue range (optional)
- How did you hear about us? (attribution)
- Existing marketing tools/platforms in use
- Primary business goals (free text + structured checkboxes: brand awareness, lead gen,
e-commerce sales, local traffic, etc.)
- Budget range for this engagement
- Timeline expectations (when do you need to see results?)
- Competitor URLs (up to 5)
- Brand guidelines upload (logo, color palette, fonts, tone of voice doc)

Google Ads — Service-Specific Fields
- Existing Google Ads account ID (or indicate new account needed)
- Current monthly ad spend
- Historical monthly ad spend (past 6 months if available)
- Target CPA / target ROAS
- Conversion actions currently tracked (list)
- Conversion tracking method (Google tag, GTM, offline import, etc.)
- Landing page URLs for current/planned campaigns
- Geographic targeting (countries, regions, cities, radius)
- Language targeting
- Negative keyword lists (upload or paste)
- Existing audiences/remarketing lists (Y/N, describe)
- Google Merchant Center ID (if Shopping campaigns)
- Product feed URL (if applicable)
- Previous agency/consultant? What worked/didn’t work?
- MCC access delegation: provide admin email to grant access to Fanatic Coders MCC

SEO — Service-Specific Fields
- Primary domain (and any secondary/subdomain properties)
- CMS platform (WordPress, Shopify, custom, etc.)
- CMS admin access level available to the agency
- Google Search Console access (grant via email delegation)
- Google Analytics 4 property ID and access delegation
- Current organic traffic (monthly sessions, if known)
- Target keywords (if any; upload or paste list)
- Existing content inventory (blog posts, landing pages count)
- Content creation capability in-house (Y/N, capacity)
- Backlink profile: any past link-building or disavow activity?
- Known technical issues (site speed, indexing problems, manual actions)
- Local SEO needs (Google Business Profile access, NAP consistency)

Fanatic Coders Operations Platform — PRD v1.0
## Page 13
- International SEO needs (hreflang, multi-language, multi-country)
- Previous SEO agency/consultant work (what was done, results)

Web Development — Service-Specific Fields
- Project type: new build, redesign, migration, feature addition
- Current website URL (if redesign/migration)
- Current hosting provider and plan
- Preferred tech stack (if any; e.g., React, WordPress, Shopify, Laravel)
- Domain registrar and DNS management access
- Design references / mood board URLs (up to 10)
- Sitemap or wireframes (upload)
- Number of pages/templates needed
- E-commerce requirements (product count, payment gateways, shipping)
- Third-party integrations needed (CRM, ERP, payment, analytics, chat)
- Content: who provides copy? (client, agency, or collaborative)
- Photography/media assets available (Y/N, upload)
- Accessibility requirements (WCAG level)
- Performance requirements (target load time, Core Web Vitals)
- SSL certificate status
- Post-launch support/maintenance expectations

Mobile App Development — Service-Specific Fields
- Target platforms: iOS, Android, or cross-platform
- Preferred framework (if any: React Native, Flutter, native Swift/Kotlin)
- Feature list / user stories (upload document or fill in)
- Design references / competitor app references
- Wireframes or prototypes (Figma/Sketch/Adobe XD links or uploads)
- Backend requirements: existing API, new backend needed, BaaS (Firebase, Supabase)
- Third-party API integrations (maps, payments, social login, push notifications)
- Apple Developer account (Team ID) and/or Google Play Console access
- Push notification requirements (provider preference)
- Offline functionality requirements
- User authentication method (email/password, social, SSO, biometrics)
- Expected user base size (DAU/MAU estimates)
- App Store Optimization (ASO) needs
- Analytics/crash reporting preferences (Firebase, Sentry, Mixpanel)

General Marketing — Service-Specific Fields
- Marketing channels currently active (social, email, content, PR, influencer, events)
- Social media account handles and admin access delegation
- Email marketing platform (Mailchimp, Klaviyo, HubSpot, etc.) and access
- Current email list size
- Target audience personas (upload or describe: demographics, psychographics, pain
points)
- Campaign goals (awareness, engagement, conversions, retention)
- Seasonal/event-based marketing calendar (key dates)
- Existing brand assets (photo library, video library, templates)

Fanatic Coders Operations Platform — PRD v1.0
## Page 14
- Content approval workflow (who approves, turnaround time)
- Influencer/partnership history
- PR contacts or agency (if separate)
- Regulatory/compliance constraints (industry-specific: healthcare, finance, etc.)

## User Stories — Module 4
As a Client, I want to complete my onboarding by filling out a service-specific questionnaire online, so that
the agency has everything they need to start working immediately.
## Acceptance Criteria:
– Client receives an email invitation with a link to the onboarding wizard
– The form dynamically shows only the fields relevant to my engaged service(s)
– I can save progress and resume later from any device
– Upon submission, I see a confirmation and my assigned Manager is notified

As a Manager, I want to see which onboarded clients have incomplete submissions, so that I can follow
up proactively and prevent onboarding delays.
## Acceptance Criteria:
– Dashboard shows onboarding completion % per client
– Filterable by: service type, assigned manager, days since invitation
– One-click to send a reminder email to the client

As a Admin, I want to view onboarding analytics: average completion time, drop-off step, completion rate,
so that I can identify and fix friction points in the onboarding flow.
## Acceptance Criteria:
– Analytics show: average days to complete, % completed within 5 days, most-skipped
fields
– Data is available per service type
– Exportable as CSV


