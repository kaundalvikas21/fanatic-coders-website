<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Shared — Data Model Overview
  PRD SECTION : 6   |   PRD PAGES : 23   |   ORIGINAL LINES : 757-801
  RELATED     : CROSS-CUTTING: the entity reference for every feature. Each feature file lists the entities it touches; full definitions live here.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 23
## 6. Data Model Overview
This section outlines the key entities and their relationships. This is not a full schema but
provides enough detail for an architect to begin database design.

## Entity Key Fields & Relationships
User id (UUID PK), email, password_hash, first_name, last_name, role (enum:
admin/manager/member), avatar_url, timezone, weekly_hours, skills (JSON), is_active,
created_at, updated_at
Client id (UUID PK), company_name, website, industry, primary_contact_name,
primary_contact_email, primary_contact_phone, billing_contact_email, status (enum:
lead/onboarding/active/completed/churned), pipeline_stage, source, created_at
ClientUser id (UUID PK), client_id (FK → Client), email, password_hash, magic_link_token, mfa_secret,
last_login, is_active
Project id (UUID PK), client_id (FK → Client), name, service_type (enum[]), status, start_date,
end_date, budget, chat_space_id, template_id (FK → ProjectTemplate, nullable), created_by
(FK → User)
ProjectMember project_id (FK → Project), user_id (FK → User), role (enum: lead/member) — join table
Task id (UUID PK), project_id (FK → Project), title, description (rich text), status (FK → TaskStatus),
priority (enum), assignee_ids (FK[] → User), due_date, estimated_hours, parent_task_id (FK
→ Task, nullable for subtasks), sort_order, created_by, created_at
TaskStatus id, project_id (FK → Project), name, sort_order, is_default, is_done
TaskDependency task_id (FK), depends_on_task_id (FK) — blocking relationship
TimeEntry id, task_id (FK → Task), user_id (FK → User), started_at, ended_at, duration_minutes, note
Comment id, task_id (FK → Task), user_id (FK → User), body (rich text), is_client_visible,
parent_comment_id (nullable), created_at
FileAttachment id, entity_type (task/comment/onboarding/project), entity_id, filename, storage_path,
size_bytes, mime_type, uploaded_by, uploaded_at
OnboardingSubmission id, client_id (FK → Client), service_types (enum[]), status (enum:
invited/in_progress/submitted/reviewed), data (JSONB), completion_pct, invited_at,
submitted_at, reviewed_by
Invoice id, client_id (FK → Client), project_id (FK → Project, nullable), number, line_items (JSONB),
subtotal, tax, discount, total, currency, status (enum: draft/sent/paid/overdue/void), due_date,
paid_at, sent_at
Expense id, project_id (FK → Project), category, description, amount, currency, date, receipt_file_id (FK
→ FileAttachment, nullable), logged_by
Notification id, user_id (FK), type (enum), title, body, link, is_read, channel (enum: in_app/email/chat),
created_at
AuditLog id, user_id (FK), action (enum), resource_type, resource_id, old_value (JSONB), new_value
(JSONB), ip_address, timestamp
ProjectTemplate id, name, service_type, task_templates (JSONB)
NotificationPreference user_id (FK), notification_type, channel, enabled (bool)


