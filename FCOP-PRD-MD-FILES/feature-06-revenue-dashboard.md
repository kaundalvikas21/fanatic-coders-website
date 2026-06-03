<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 06 — Admin Revenue & Business Dashboard
  PRD SECTION : 4.6 (Module 6)   |   PRD PAGES : 17-18   |   ORIGINAL LINES : 561-616
  RELATED     : Data model: Invoice, Expense, Client, Project, TimeEntry (see shared-02-data-model.md). Read-only invoice view surfaces in feature-05-client-portal.md. Margins need feature-02 time tracking.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 17
## 4.6 Module 6: Admin Revenue & Business Dashboard
Gives the agency owner a comprehensive financial and operational overview in a single pane.

## Feature Priority Description
Revenue tracking P0 Dashboard widgets: total revenue (MTD, QTD, YTD), revenue
per client, revenue per service type, revenue per month (12-
month trend chart).
Invoice management P0 Create invoices (line items, tax, discount, currency), send via
email, mark as paid, overdue tracking. Overdue invoices auto-
flagged at configurable thresholds (e.g., 7, 14, 30 days).
Pipeline view P0 Kanban-style pipeline: Lead → Proposal Sent → Onboarding →
Active → Completed → Churned. Each card shows client name,
service type, estimated value.
Expense tracking P1 Log expenses per project (third-party tools, ad spend pass-
through, contractor costs). Links to project for margin
calculation.
Profit margin per project P1 Calculated as: (Revenue – Expenses – (Logged Hours ×
Internal Hourly Rate)) / Revenue. Requires time tracking and
expense tracking to be active.
Client retention metrics P1 Client retention rate (rolling 12 months), average client lifetime,
churn rate, revenue per retained client.
Team utilization rate P1 Aggregate and per-member: billable hours / available hours.
Filterable by date range and service type.
Export and reporting P1 Export dashboard data as CSV or PDF. Scheduled email
reports (weekly/monthly) to Admin.

## User Stories — Module 6
As a Admin, I want to see this month’s revenue broken down by service type, so that I can identify which
service lines are growing and which need attention.
## Acceptance Criteria:
– Revenue widget shows a bar chart with MTD revenue per service type
– Hovering shows exact amount and % of total
– Clicking a service type drills down to client-level revenue

As a Admin, I want to create and send an invoice to a client, so that billing is handled within the platform
without switching to a separate tool.
## Acceptance Criteria:
– Invoice creation form includes: client (dropdown), line items, tax configuration, due
date, notes
– Preview before sending
– Send triggers an email to the client’s billing contact with PDF attachment and a portal
link


Fanatic Coders Operations Platform — PRD v1.0
## Page 18
As a Admin, I want to view the client pipeline from lead to active, so that I can forecast revenue and
identify bottlenecks in the sales-to-delivery handoff.
## Acceptance Criteria:
– Pipeline shows card count and total estimated value per stage
– Drag-and-drop to move clients between stages
– Moving to Onboarding stage triggers onboarding invitation email


