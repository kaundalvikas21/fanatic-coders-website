<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 01 — Team & Role Management
  PRD SECTION : 4.1 (Module 1)   |   PRD PAGES : 5-6   |   ORIGINAL LINES : 102-163
  RELATED     : Data model: User, ProjectMember, NotificationPreference, AuditLog (see shared-02-data-model.md). Depends on RBAC + audit logging in shared-01-non-functional-requirements.md.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 5
## 4. Feature Requirements
## 4.1 Module 1: Team & Role Management
Manages the internal team hierarchy, permissions, profiles, and workload visibility.

## Feature Priority Description
Role hierarchy (Admin →
## Manager → Team
## Member)
P0 Three-tier role system with inheritance. Admin has full access;
Manager scoped to assigned projects/teams; Team Member
scoped to assigned tasks.
Permissions matrix P0 Configurable CRUD permissions per role per module. Deny-by-
default. Admin can customize Manager permissions.
Team member profiles P0 Name, email, role, skills/tags, assigned projects, avatar.
Editable by Admin and self (limited fields).
## Utilization/availability
tracking
P1 Shows each team member’s current task load as a percentage.
Based on assigned task hours vs. available hours per week
(configurable per member).
Manager workload
dashboard
P1 Aggregated view of team workload, task completion rates,
overdue tasks, and upcoming deadlines for the manager’s
team.
Skill-based task
suggestion
P2 When assigning a task, the system suggests team members
based on matching skills and current availability.
Activity log per team
member
P1 Chronological log of task completions, comments, and time
entries. Visible to Admin and the member’s Manager.

## User Stories — Module 1
As a Admin, I want to define and customize role permissions per module, so that I can control exactly
what Managers and Team Members can see and do, reducing security risk.
## Acceptance Criteria:
– Admin can toggle CRUD permissions per role for each module
– Changes take effect immediately on next page load
– A denied permission hides the corresponding UI element and returns 403 on API call

As a Manager, I want to view my team’s workload in a single dashboard, so that I can identify overloaded
or underutilized team members and redistribute work.
## Acceptance Criteria:
– Dashboard shows each team member’s utilization percentage
– Tasks are color-coded by status (overdue = red, at risk = yellow, on track = green)
– Manager can click into a member to see their full task list

As a Team Member, I want to update my own profile with skills and availability, so that managers can
assign me appropriate tasks.
## Acceptance Criteria:
– Team Member can edit: skills tags, weekly available hours, timezone

Fanatic Coders Operations Platform — PRD v1.0
## Page 6
– Team Member cannot edit: role, email, or assigned projects
– Changes are reflected in the skill-based suggestion engine within 1 minute


