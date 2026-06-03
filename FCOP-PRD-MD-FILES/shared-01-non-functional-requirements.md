<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Shared — Non-Functional Requirements
  PRD SECTION : 5   |   PRD PAGES : 21-22   |   ORIGINAL LINES : 683-756
  RELATED     : CROSS-CUTTING: applies to every feature. Security, performance, scalability, accessibility, reliability. Reference from all feature builds.
  INTEGRITY   : Content copied verbatim from the source PRD, with ONE correction
                to match the source PDF: the section heading was restored from
                "- Non-Functional Requirements" (a defect in the MD extraction)
                to "## 5. Non-Functional Requirements". No other changes.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 21
## 5. Non-Functional Requirements
## 5.1 Security
## Authentication
- Internal users: email + password with bcrypt hashing (min 12 rounds). Enforce minimum
password complexity. Support MFA (TOTP) for Admin and Manager roles (mandatory
for Admin, optional for others).
- Clients: email + password or magic link (time-limited, single-use token sent via email).
Optional MFA (TOTP).
- Session management: short-lived JWTs (15-minute access tokens) with server-side
refresh tokens (rotated on each use). Secure, HttpOnly, SameSite=Strict cookies.

## Authorization
- RBAC with deny-by-default. Every API endpoint validates role and scope.
- Client data isolation: every database query scoped by client_id. Implement Row-Level
Security (RLS) at the database layer if using PostgreSQL, as defense-in-depth in
addition to application-layer checks (per OWASP Multi-Tenant Security Cheat Sheet).
- Never trust client-supplied tenant/client IDs; derive from authenticated session.
- Use non-sequential, non-guessable UUIDs for all resource identifiers.

## Data Isolation Between Clients
- Shared database with mandatory client_id column on all client-scoped tables (single-
tenant data model within a shared database).
- Application middleware enforces tenant context on every request (per OWASP
recommendation).
- Automated cross-tenant access tests in the CI/CD pipeline.

## Audit Logging
- Log all create, update, delete operations with: user ID, timestamp, resource type,
resource ID, action, old value (for updates), IP address.
- Logs stored separately (append-only) and retained for minimum 12 months.
- Admin can search and export audit logs.

## Other Security Measures
- HTTPS everywhere (TLS 1.2+ enforced)
- CSRF protection on all state-changing endpoints
- Rate limiting on authentication endpoints (e.g., 5 failed attempts = 15-minute lockout)
- Input validation and parameterized queries (prevent SQL injection)
- Content Security Policy headers
- File upload validation: check MIME type, enforce size limits, scan for malware (ClamAV
or equivalent)
- Encrypted storage for sensitive data at rest (client credentials references, API keys)
- Regular dependency vulnerability scanning (Dependabot / Snyk)

## 5.2 Performance

Fanatic Coders Operations Platform — PRD v1.0
## Page 22
- Page load time: < 2 seconds on standard broadband (for all dashboard and list views)
- API response time: p95 < 500ms for CRUD operations; p95 < 2s for dashboard
aggregation queries
- Google Chat notification delivery: < 5 seconds from trigger event
- Email notification delivery: < 2 minutes from trigger event
- Support concurrent use by 50 internal users and 200 client users without degradation

## 5.3 Scalability
- V1 target: < 50 team members, < 200 active clients, < 1,000 active tasks
- Database schema and API design should support 10x growth without architectural
changes
- File storage: use object storage (S3-compatible) with per-project prefixes. Plan for 500
GB in year one.

## 5.4 Accessibility
- WCAG 2.1 Level AA compliance for the Client Portal (since it’s external-facing)
- Keyboard navigable; screen reader compatible; sufficient color contrast
- Internal admin UI: best-effort WCAG compliance (full compliance in V2)

## 5.5 Reliability & Availability
- Target uptime: 99.5% (allows ~3.6 hours downtime per month for maintenance)
- Automated database backups: daily full backup, hourly incremental. Retention: 30 days.
- Disaster recovery: documented restore procedure tested quarterly


