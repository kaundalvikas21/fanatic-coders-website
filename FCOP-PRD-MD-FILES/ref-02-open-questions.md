<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Reference — Open Questions
  PRD SECTION : 8   |   PRD PAGES : 25   |   ORIGINAL LINES : 878-939
  RELATED     : Decisions required before development begins (OQ-1..OQ-10). Affects scope of several features.
  INTEGRITY   : Content copied verbatim from the source PRD, with ONE formatting
                correction to match the source PDF: each open-question ID, which the
                MD extraction broke across two lines ("## OQ-" / "## N"), was rejoined
                into a single "OQ-N" (OQ-1..OQ-10). No wording changed.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 25
## 8. Open Questions
The following decisions need your input before development begins:

ID Question Context / Impact
OQ-1
Payment gateway
integration in V1?
Should clients be able to pay invoices directly via the portal (Stripe/PayPal),
or is the read-only invoice view sufficient for V1? This significantly affects
scope.
OQ-2
Tech stack selection What is the preferred backend framework (Node.js/Express, Laravel,
Django, Go)? What frontend framework (React, Next.js, Vue)? Database
(PostgreSQL recommended for RLS support)?
OQ-3
Hosting environment Self-hosted on a VPS (e.g., Hetzner, DigitalOcean), or on cloud
infrastructure (AWS, GCP)? This affects the deployment and DevOps
module.
OQ-4
Google Workspace edition Does Fanatic Coders use Google Workspace Business or Enterprise? The
Chat API’s app-specific scopes (chat.app.*) require Workspace admin
approval. Confirm admin access availability.
OQ-5
Internal hourly rates for
margin calculation
To calculate project profit margins, the system needs an internal cost rate
per team member (or per role). How should this be configured: per-
member, per-role, or a flat agency-wide rate?
OQ-6
Currency and tax handling Does the agency bill in a single currency (AED/USD) or multiple? Are there
tax requirements (UAE VAT)? This affects invoice module complexity.
OQ-7
Client portal branding scope Should the portal be fully white-labeled (custom domain like
portal.fanaticcoders.com, custom email sender), or is a branded subdomain
sufficient for V1?
OQ-8
Third-party file storage Store files on the same server, or use S3-compatible object storage (e.g.,
Cloudflare R2, AWS S3, MinIO)? Object storage recommended for
scalability and backup.
OQ-9
Multi-language support Is the platform English-only, or should V1 support Arabic (RTL) given the
Dubai client base?
OQ-10
Integration with existing
tools
Are there any tools currently in use (e.g., Slack, WhatsApp Business, Zoho,
QuickBooks) that need integration in V1, or is Google Workspace the only
integration target?


