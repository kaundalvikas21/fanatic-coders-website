<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 05 — Client Portal
  PRD SECTION : 4.5 (Module 5)   |   PRD PAGES : 15-16   |   ORIGINAL LINES : 493-560
  RELATED     : Data model: ClientUser, Project, Comment(is_client_visible), FileAttachment, Invoice (see shared-02-data-model.md). Invoice data from feature-06; emails from feature-07. WCAG AA required (shared-01).
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 15
## 4.5 Module 5: Client Portal
A branded, secure portal where clients can monitor their projects, receive updates,
communicate with the team, and view billing status.

## Feature Priority Description
Client authentication P0 Email + password with email verification. Magic link login as
alternative. Password reset flow. Optional: MFA (TOTP) for
security-conscious clients.
Client dashboard P0 Shows: active projects with current status, recent updates feed,
upcoming milestones, and unread messages count.
Project status view P0 Per-project view showing: current phase/status, milestone
progress bar, recent task updates marked as client-visible.
Update feed with email
notifications
P0 When a team member posts a project update (marked client-
visible), the client sees it in the portal feed AND receives an
email notification with a summary and link.
Client comment/reply on
updates
P0 Client can reply to updates with text and file attachments. Reply
is visible to the assigned team and triggers an in-app
notification.
File sharing /
deliverables
P0 Dedicated files section per project. Team uploads deliverables;
client can download. Client can also upload files (revision
requests, assets).
Invoice/billing visibility P1 Read-only view of: invoices (amount, date, status:
paid/due/overdue), payment history. Client cannot edit or pay
through the portal in V1 (payment link included in invoice email).
Branded portal (white-
label)
P1 Portal displays Fanatic Coders branding: logo, colors, favicon.
No third-party branding visible to the client.
Multi-project support P1 Clients with multiple engagements see all projects in one
dashboard, with per-project drill-down.
Client satisfaction survey P2 Periodic automated survey (CSAT/NPS) triggered after
milestone completion. Results visible to Admin.

## User Stories — Module 5
As a Client, I want to see the current status of all my projects on one dashboard, so that I don’t need to
email the agency to check on progress.
## Acceptance Criteria:
– Dashboard shows each project with: name, status badge, progress %, last update
date
– Clicking a project opens its detailed status view
– Data refreshes on page load (no stale cache beyond 60 seconds)

As a Client, I want to receive an email when the team posts a project update, so that I stay informed
without having to log in daily.
## Acceptance Criteria:

Fanatic Coders Operations Platform — PRD v1.0
## Page 16
– Email is sent within 2 minutes of the update being posted
– Email includes: project name, update summary (first 200 characters), and a link to
view full update
– Client can reply to the update directly from the portal (not from the email)

As a Client, I want to view and download my invoices, so that I can track what I owe and what I’ve paid.
## Acceptance Criteria:
– Invoices section shows a list with: invoice number, date, amount, status
– Clicking an invoice shows the full invoice detail (line items, taxes, total)
– Download as PDF button available


