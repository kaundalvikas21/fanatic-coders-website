<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Product Overview & Context
  PRD SECTION : Cover, 1, 2, 3   |   PRD PAGES : 1-4   |   ORIGINAL LINES : 1-101
  RELATED     : Shared context for ALL features: executive summary, problem statement, goals, and user personas (Admin, Manager, Team Member, Client). Read this first before building any feature.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->



Fanatic Coders Operations Platform — PRD v1.0
## Page 1
## FANATIC CODERS
## OPERATIONS PLATFORM
Product Requirements Document (PRD)
## Version 1.0  |  April 2026
Prepared for: Fanatic Coders (fanaticcoders.com)
## Classification: Internal — Confidential


Fanatic Coders Operations Platform — PRD v1.0
## Page 2
## 1. Executive Summary
The Fanatic Coders Operations Platform (FCOP) is an internal operations backend with a client-
facing portal, purpose-built for Fanatic Coders, a full-service digital agency based in Dubai
offering Google Ads management, SEO, web development, mobile app development, and
general marketing services.
The platform consolidates five currently fragmented workflows into a unified system: team and
task management, client onboarding, project delivery tracking, client communication, and
revenue operations. It integrates with Google Workspace (Chat and Calendar) to keep the team
notified in real time, and provides clients with a branded portal where they can track progress,
receive updates, share files, and view billing status.
V1 is scoped for fewer than 50 team members and 200 active clients. The platform is self-
hosted, mobile-responsive (no native app in V1), and tech-stack agnostic at the PRD level.

## Key Objectives
- Eliminate context-switching between 4+ separate tools (project management, CRM,
invoicing, chat)
- Reduce average client onboarding time from 7–14 days to under 5 days
- Give clients real-time project visibility to reduce status inquiry emails by 60%+
- Provide admin with a single-pane revenue and operations dashboard
- Automate task notifications to Google Chat spaces to keep the team aligned


Fanatic Coders Operations Platform — PRD v1.0
## Page 3
## 2. Problem Statement & Goals
## 2.1 Problem Statement
Fanatic Coders currently manages its operations across disconnected tools: project tasks in one
platform, client communication via email and WhatsApp, invoicing in spreadsheets or separate
billing software, and onboarding via ad-hoc Google Forms or documents. This fragmentation
causes:
- Missed task handoffs and duplicated work due to lack of centralized task tracking
- Delayed client onboarding because information is gathered piecemeal across emails and
calls
- Clients lack self-service visibility into project progress, generating repetitive status-check
emails
- No unified revenue view — the admin cannot see revenue per client, per service, or per
month without manual aggregation
- Internal notifications are informal (WhatsApp, verbal), leading to dropped tasks

## 2.2 Goals

## # Goal Success Metric
G1 Centralize all operations in one
platform
100% of active projects managed in FCOP within 90 days
of launch
G2 Automate client onboarding per
service type
Average onboarding completion < 5 business days
G3 Provide real-time client project
visibility
> 70% of clients log into portal at least 1x/week
G4 Automate internal notifications via
## Google Chat
100% of task assignments trigger a Chat notification
within 5 seconds
G5 Unified revenue and pipeline
dashboard for admin
Admin can view MTD revenue, pipeline, and utilization
without any manual data entry
G6 Reduce client status-inquiry emails > 50% reduction in inbound status emails within 60 days
of portal launch


Fanatic Coders Operations Platform — PRD v1.0
## Page 4
## 3. User Personas
3.1 Admin (Agency Owner)
The agency owner who manages the business end-to-end. Needs visibility into revenue, team
performance, client health, and pipeline. Has full permissions across all modules. Primary
concern: business growth, profitability, and client retention.
## 3.2 Manager
Leads a team or service vertical (e.g., SEO Manager, Ads Manager). Assigns tasks, monitors
team workload, communicates with clients, and oversees onboarding for their service line.
Needs workload dashboards and the ability to manage projects and tasks within their purview.
Cannot access revenue/billing data unless explicitly granted.
## 3.3 Team Member
Developers, marketers, SEO specialists, designers, and content writers. Executes tasks, logs
time, uploads deliverables, and posts project updates visible to clients. Needs a clean task
queue, clear priorities, and the ability to comment and attach files.
## 3.4 Client
External client who has engaged Fanatic Coders for one or more services. Interacts with the
platform via the Client Portal. Needs to see project status, receive update notifications, reply to
updates, download deliverables, and view billing status. Cannot see internal tasks, team
workload, or other clients’ data.


