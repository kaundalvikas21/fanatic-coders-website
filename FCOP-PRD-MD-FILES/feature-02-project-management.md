<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 02 — Project Management
  PRD SECTION : 4.2 (Module 2)   |   PRD PAGES : 7-8   |   ORIGINAL LINES : 164-235
  RELATED     : Data model: Project, ProjectMember, Task, TaskStatus, TaskDependency, TimeEntry, Comment, FileAttachment, ProjectTemplate (see shared-02-data-model.md). Notifications handled in feature-03 & feature-07.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 7
## 4.2 Module 2: Project Management
Core module for creating, tracking, and delivering projects and their constituent tasks.

## Feature Priority Description
Project CRUD P0 Create projects with: name, client, service type(s), status,
start/end dates, budget, assigned team members. Edit and
archive (soft-delete).
Task creation &
assignment
P0 Tasks belong to a project. Fields: title, description (rich text),
assignee(s), due date, priority (Low/Medium/High/Urgent),
estimated hours, tags.
Customizable task
statuses
P0 Default: To Do → In Progress → In Review → Done. Admin can
add/rename/reorder statuses per project template.
Task dependencies P1 Blocking and blocked-by relationships. A blocked task cannot
move to In Progress until its blocker is Done.
Subtasks and checklists P0 Tasks can have subtasks (each with assignee and status) and
simple checklists (checkbox items).
Time tracking per task P1 Team members can start/stop a timer or manually log hours.
Time entries are linked to task, project, and team member for
reporting.
File attachments per
task
P0 Upload files (up to 25 MB per file, any common format). Files
are stored per task and accessible to all assigned team
members and the client (if marked as client-visible).
Task comments &
mentions
P0 Threaded comments on tasks. @mention a team member to
notify them. Supports rich text and file attachments in
comments.
Kanban and list views P0 Kanban board (columns = statuses) and flat list view with
sort/filter. Both views per project.
Gantt/timeline view P2 Visual timeline showing task durations, dependencies, and
milestones. Read-only in V1; drag-to-reschedule in V2.
Recurring tasks P2 Template-based recurring task creation (daily/weekly/monthly).
Useful for SEO reporting, ad reviews, etc.
Project templates P1 Save a project’s task structure as a template. When creating a
new project of that service type, auto-populate tasks from the
template.

## User Stories — Module 2
As a Manager, I want to create a project from a template when onboarding a new SEO client, so that the
standard SEO deliverable tasks are pre-populated and I only need to assign team members and dates.
## Acceptance Criteria:
– Manager selects a service-type template during project creation
– All template tasks are cloned with default statuses, priorities, and descriptions
– Manager can edit, add, or remove tasks before finalizing


Fanatic Coders Operations Platform — PRD v1.0
## Page 8
As a Team Member, I want to log time against a task using a start/stop timer, so that my hours are
accurately tracked for billing and utilization reporting.
## Acceptance Criteria:
– Timer persists across page navigation (stored server-side)
– Only one timer can run per user at a time
– Time entries show in the task detail and in the team member’s activity log

As a Admin, I want to view all projects in a portfolio view with filters for status, service type, and client, so
that I can quickly assess the health of the agency’s project pipeline.
## Acceptance Criteria:
– Portfolio view shows project name, client, status, progress %, team lead, and budget
consumed
– Filterable by: service type, status, client, date range, assigned manager
– Sortable by any column


